import React from "react";
import { AppBar, Toolbar, Typography, IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function TitleBar(props: any) {
    const classes = useStyles({});

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        {props.title}
                    </Typography>
                    {props.reload &&
                        <IconButton color="inherit" onClick={props.reload}>
                            <Refresh />
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}