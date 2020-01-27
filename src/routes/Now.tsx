import React from "react";
import { Typography, CircularProgress, Button, styled, createMuiTheme, Grid } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import TitleBar from "../components/TitleBar";
import WeatherView from "../components/WeatherView";

const WeatherContainer = styled("div")({
    margin: createMuiTheme().spacing(2),
});

export default class NowScreen extends React.Component<any, any> {
    constructor (props: any){
        super(props);
        this.state = {
            data: null,
            error: null,
            errorCode: null,
            status: null,
        };
        this.fetchWeather = this.fetchWeather.bind(this);
    }

    controller = new AbortController();

    async fetchWeather() {
        this.setState({ status: "fetching", });
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&units=metric&lang=ru&appid=b2e7926c2fe12f7560476f3d91cc9adf`, {signal: this.controller.signal});
        if (response.ok) {
            const json = await response.json()
            this.setState({
                data: json,
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
        this.fetchWeather();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.city != this.props.city) {
            this.fetchWeather();
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
                        <TitleBar title="Сейчас" />
                        <Grid container alignItems="center" direction="column" style={{ marginTop: createMuiTheme().spacing(20), }}>
                            <CircularProgress />
                        </Grid>
                    </div>
                );
            case "fetched":
                return (
                    <div style={{marginBottom: "60px"}}>
                        <TitleBar title="Сейчас" reload={this.fetchWeather}/>
                        <WeatherContainer>
                            <WeatherView 
                                temp={this.state.data.main.temp}
                                feelsTemp={this.state.data.main.feels_like}
                                pressure={this.state.data.main.pressure}
                                humidity={this.state.data.main.humidity}
                                windSpeed={this.state.data.wind.speed}
                                cityName={this.state.data.name}
                                weatherCondition={this.state.data.weather[0].id}
                            />
                        </WeatherContainer>
                    </div>
                );
            case "error":
                return (
                    <div>
                        <TitleBar title="Сейчас" />
                        <Grid container alignItems="center" direction="column" style={{ marginTop: createMuiTheme().spacing(20), }}>
                            <Warning fontSize="large" color="primary"/>
                            <Typography variant="h6">{this.state.errorCode == 404 ? `Город ${this.props.city} не найден. Введите другой в настройках.` : "Проверьте заданный город и подключение к интернету."}</Typography>
                            <Typography variant="overline">Ошибка: {this.state.errorCode} - {this.state.error}</Typography>
                            <Button variant="contained" color="primary" onClick={this.fetchWeather}>Обновить</Button>
                        </Grid>
                    </div>
                );
            default:
                return null;
        }
    }
}