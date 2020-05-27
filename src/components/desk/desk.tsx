import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

import { CardsDataType } from "../../types/types";
import Column from "../column/column";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
    },
    paper: {
      height: 500,
      width: 240,
    },
  })
);

type PropsType = {
  cardsData: Array<CardsDataType>;
  sortByAlpha: () => void;
  sortByDate: () => void;
  sortByPriority: () => void;
};

export default function Desk(props: PropsType) {
  const classes = useStyles();
  const [value, setValue] = React.useState("name");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case "name":
        props.sortByAlpha();
        break;
      case "new":
        props.sortByDate();
        break;
      case "important":
        props.sortByPriority();
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        {props.cardsData.map((card) => (
          <Grid key={card.label} item>
            <Paper className={classes.paper}>
              <Column card={card} />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="По имени"
          value="name"
          icon={<SortByAlphaIcon />}
        />
        <BottomNavigationAction
          label="Сначала новые"
          value="new"
          icon={<ScheduleIcon />}
        />
        <BottomNavigationAction
          label="Сначала важные"
          value="important"
          icon={<PriorityHighIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
