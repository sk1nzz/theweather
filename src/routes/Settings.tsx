import React from "react";
import { Typography, Drawer, Divider, TextField, Button, Switch, styled, createMuiTheme, Grid, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { Brightness4, Info } from "@material-ui/icons";

const DrawerContainer = styled("div")({
    margin: createMuiTheme().spacing(2),
});

export default class SettingsDrawer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            city: this.props.currentCity,
            darkTheme: this.props.isDarkThemeSet,
        };
        this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    toggleDarkTheme(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            darkTheme: e.target.checked,
        });
        this.props.toggleDarkTheme(e.target.checked);
    }

    changeCity() {
        this.props.editCity(this.state.city);
    }

    render() {
        return (
            <Drawer anchor="bottom" open={this.props.isOpen} onClose={this.props.close}>
                <DrawerContainer>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h6">Настройки</Typography>
                        </Grid>
                        <Grid item>
                            <TextField value={this.state.city} onChange={e => this.setState({city: e.target.value})} label="Ваш город" variant="outlined" style={{display: "flex"}}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" style={{minWidth: "100%"}} onClick={this.changeCity}>Сохранить</Button>
                        </Grid>
                        <Grid item>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Brightness4 />
                                    </ListItemIcon>
                                    <ListItemText primary="Темная тема"/>
                                    <ListItemSecondaryAction>
                                        <Switch edge="end" onChange={this.toggleDarkTheme} checked={this.state.darkTheme} color="primary"/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem button onClick={this.props.openAboutDialog}>
                                    <ListItemIcon>
                                        <Info />
                                    </ListItemIcon>
                                    <ListItemText primary="О приложении" />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </DrawerContainer>
            </Drawer>
        );
    }
}