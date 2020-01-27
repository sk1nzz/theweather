import React from "react";
import { Alert } from "@material-ui/lab";
import { Typography, Button } from "@material-ui/core";

export default class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render(){
        if(this.state.errorInfo) {
            return(
                <Alert severity="error">
                    <Typography variant="h6">Ошибка! Сообщите разработчику.</Typography>
                    <Typography variant="subtitle2">{this.state.error && this.state.error.toString()}</Typography>
                    <Typography variant="body1">{this.state.errorInfo.componentStack}</Typography>
                    <Button variant="outlined" color="inherit" onClick={() => window.location.reload()}>Перезагрузить приложение</Button>
                </Alert>
            );
        }
        return this.props.children;
    }
}