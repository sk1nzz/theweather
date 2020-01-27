import React from "react";
import { Typography, Grid, CircularProgress, Button, createMuiTheme, styled } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import TitleBar from "../components/TitleBar";

import { DayForecastView, HourForecastView } from "../components/ForecastView";

const ForecastContainer = styled("div")({
    margin: createMuiTheme().spacing(2),
});

export default class DaysScreen extends React.Component<any, any> {
    constructor (props: any){
        super(props);
        this.state = {
            data: null,
            sortedData: null,
            error: null,
            errorCode: null,
            status: null,
        };
        this.fetchForecast = this.fetchForecast.bind(this);
    }

    controller = new AbortController();
    
    async fetchForecast() {
        this.setState({ status: "fetching", });
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&lang=ru&appid=b2e7926c2fe12f7560476f3d91cc9adf`, { signal: this.controller.signal });
        if (response.ok) {
            const json = await response.json()
            this.setState({
                data: json,
                sortedData: Object.values(json.list.reduce((acc, n) => {
                    const date = new Date(n.dt * 1000).toDateString();
                    (acc[date] = acc[date] || []).push(n);
                    return acc;
                }, {})),
                status: "fetched",
            });
        } else {
            this.setState({
                error: response.statusText,
                errorCode: response.status,
                status: "error",
            });
        }
    }

    componentDidMount() {
        this.fetchForecast();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.city != this.props.city) {
            this.fetchForecast();
        }
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        switch (this.state.status) {
            case "fetching":
                return (
                    <div>
                        <TitleBar title="Прогноз на 5 дней" />
                        <Grid container alignItems="center" direction="column" style={{ marginTop: createMuiTheme().spacing(20), }}>
                            <CircularProgress />
                        </Grid>
                    </div>
                );
            case "fetched":
                return (
                    <div style={{ marginBottom: "60px" }}>
                        <TitleBar title={"Прогноз на 5 дней - " + this.state.data.city.name} reload={this.fetchForecast}/>
                        {
                            this.state.sortedData.map(item => {
                                return (
                                    <ForecastContainer key={item[0].dt}>
                                        <DayForecastView date={new Date(item[0].dt * 1000).toLocaleDateString("ru", {weekday: "long", day: "numeric", month: "long"})}>
                                            <div style={{flexGrow: 1}}>
                                                <Grid container spacing={1} direction="row">
                                                    {
                                                        item.map(i => {
                                                            return (
                                                                <Grid item xs key={i.dt}>
                                                                    <HourForecastView 
                                                                        time={new Date(i.dt * 1000).toLocaleTimeString("ru", {hour: "numeric", minute: "2-digit"})}
                                                                        id={i.weather[0].id}
                                                                        temp={i.main.temp}
                                                                    />
                                                                </Grid>
                                                            );
                                                        })
                                                    }
                                                </Grid>
                                            </div>
                                        </DayForecastView>
                                    </ForecastContainer>
                                );
                            })
                        }
                        
                    </div>
                );
            case "error":
                return (
                    <div>
                        <TitleBar title="Прогноз на 5 дней" />
                        <Grid container alignItems="center" direction="column" style={{ marginTop: createMuiTheme().spacing(20), }}>
                            <Warning fontSize="large" color="primary"/>
                            <Typography variant="h6">{this.state.errorCode == 404 ? `Город ${this.props.city} не найден. Введите другой в настройках.` : "Проверьте заданный город и подключение к интернету."}</Typography>
                            <Typography variant="overline">Ошибка: {this.state.errorCode} - {this.state.error}</Typography>
                            <Button variant="contained" color="primary" onClick={this.fetchForecast}>Обновить</Button>
                        </Grid>
                    </div>
                );
            default:
                return null;
        }
    }
}