import React from "react";
import { Card, Typography, styled, CardContent, Grid , createMuiTheme } from "@material-ui/core"
import { Speed, Opacity, CallMade } from "@material-ui/icons";
import { getBackgroundFromId, getConditionFromId, WeatherIcon } from "../utils/weatherid";

const theme = createMuiTheme();

const DataContainer = styled(Typography)({
    verticalAlign: "middle",
    display: "flex",
});

const CurrentContainer = styled("div")({
    display: "flex",
    alignItems: "center",
});

export default class WeatherView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card variant="outlined" style={{ background: getBackgroundFromId(this.props.weatherCondition), color: createMuiTheme().palette.text.primary, }}>
                <CardContent>
                    <Typography variant="subtitle2">{this.props.cityName}</Typography>
                    <Grid container direction="column" alignItems="center" style={{ paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2), }}>
                        <CurrentContainer>
                            <WeatherIcon id={this.props.weatherCondition} />
                            <Typography variant="h3">{Math.floor(this.props.temp)}°C</Typography>
                        </CurrentContainer>
                        <Typography variant="subtitle2">Ощущается как {Math.floor(this.props.feelsTemp)}°C</Typography>
                        <Typography variant="body1">{getConditionFromId(this.props.weatherCondition)}</Typography>
                    </Grid>
                    <DataContainer variant="body1">
                        <Speed />
                        {this.props.pressure} гПа
                    </DataContainer>
                    <DataContainer variant="body1">
                        <Opacity />
                        {this.props.humidity}%
                    </DataContainer>
                    <DataContainer variant="body1">
                        <CallMade />
                        {this.props.windSpeed} м/с
                    </DataContainer>
                </CardContent>
            </Card>
        );
    }
}