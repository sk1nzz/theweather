import React from "react";
import { Card, Typography, CardContent, Grid, createMuiTheme } from "@material-ui/core"
import { getBackgroundFromId, WeatherIcon } from "../utils/weatherid";

const theme = createMuiTheme();

export class DayForecastView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="subtitle2" style={{ marginBottom: theme.spacing(1)}}>{this.props.date}</Typography>
                    {this.props.children}
                </CardContent>
            </Card>
        );
    }
}

export class HourForecastView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card variant="outlined" style={{ background: getBackgroundFromId(this.props.id), color: createMuiTheme().palette.text.primary }}>
                <CardContent>
                    <Grid container direction="column" alignItems="center">
                        <Typography variant="subtitle2">{this.props.time}</Typography>
                        <WeatherIcon id={this.props.id} />
                        <Typography variant="body1">{Math.floor(this.props.temp)}°C</Typography>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}