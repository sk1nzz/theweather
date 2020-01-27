import React from "react";
import ReactDOM from "react-dom";
import Store from "electron-store";
const settings = new Store();

import { HashRouter, Switch, Route } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary"
import BottomNav from "./components/BottomNav";

import NowScreen from "./routes/Now";
import DaysScreen from "./routes/Days";
import SettingsDrawer from "./routes/Settings";

import { ThemeProvider, createMuiTheme, CssBaseline, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { version } from "../package.json";
import app_cover from "./assets/app_cover.png";

export default function App() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [isDarkTheme, setDarkTheme] = React.useState(settings.get("isDarkTheme"));
    const [city, setCity] = React.useState(settings.get("currentCity"));
    const [firstStartSnackbarOpen, setFirstStartSnackbarOpen] = React.useState();
    const [aboutDialogOpen, setAboutDialogOpen] = React.useState(false);

    const theme = React.useMemo(
        () =>
          createMuiTheme({
            palette: {
              type: isDarkTheme ? 'dark' : 'light',
              primary: {
                main: "#1e88e5",
              },
            },
          }),
        [isDarkTheme],
    );

    React.useEffect(() => {
      if(!settings.get("currentCity") || settings.get("currentCity") == undefined) {
        setDrawerOpen(true);
        setFirstStartSnackbarOpen(true);
      }
    }, [])
    
    return(
        <ErrorBoundary>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Switch>
                        <Route exact path="/" render={() => <NowScreen city={city} />} />
                        <Route path="/days" render={() => <DaysScreen city={city} />} />
                    </Switch>
                    <BottomNav open={() => setDrawerOpen(true)}/>
                    <SettingsDrawer
                        isOpen={drawerOpen}
                        close={() => setDrawerOpen(false)}
                        isDarkThemeSet={isDarkTheme}
                        toggleDarkTheme={isChecked => {
                          settings.set("isDarkTheme", isChecked);
                          setDarkTheme(isChecked)
                        }}
                        editCity={city => {
                          settings.set("currentCity", city);
                          setCity(city);
                        }}
                        currentCity={city}
                        openAboutDialog={() => setAboutDialogOpen(true)}
                    />
                    <Snackbar open={firstStartSnackbarOpen} onClose={() => setFirstStartSnackbarOpen(false)}>
                      <Alert severity="info" onClose={() => setFirstStartSnackbarOpen(false)}>
                        Добро пожаловать! Пожалуйста, задайте город.
                      </Alert>
                    </Snackbar>
                    <Dialog open={aboutDialogOpen} onClose={() => setAboutDialogOpen(false)}>
                      <DialogTitle>О приложении</DialogTitle>
                      <img src={app_cover} />
                      <DialogContent>
                        <Grid container direction="column" justify="center" alignItems="center">
                          <Typography variant="h6">TheWeather</Typography>
                          <Typography variant="overline">by sk1nzz</Typography>
                          <Typography variant="subtitle2">Версия {version}</Typography>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setAboutDialogOpen(false)} color="primary">
                          Закрыть
                        </Button>
                      </DialogActions>
                    </Dialog>
                </ThemeProvider>
            </HashRouter>
        </ErrorBoundary>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));