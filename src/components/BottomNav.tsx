import React from "react";
import { makeStyles, BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import { Home, Event, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
});
  
export default function BottomNav(props: any) {
    const classes = useStyles({});
    const [value, setValue] = React.useState("now");
  
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          newValue != "settings" && setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction value="now" label="Сейчас" icon={<Home />} component={Link} to="/"/>
        <BottomNavigationAction value="days" label="Прогноз" icon={<Event />} component={Link} to="/days"/>
        <BottomNavigationAction value="settings" label="Настройки" icon={<Settings />} onClick={props.open}/>
      </BottomNavigation>
    );
  }