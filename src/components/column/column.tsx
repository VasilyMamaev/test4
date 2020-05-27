import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { ItemType, LabelType } from "../../types/types";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import { green, yellow, red, grey } from "@material-ui/core/colors";
import { format } from "date-fns";

type PropTypes = {
  card: {
    label: LabelType;
    items: Array<ItemType>;
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Column = (props: PropTypes) => {
  const classes = useStyles();

  return (
    <List
      component="nav"
      className={classes.root}
      aria-label={props.card.label}
    >
      <ListItem>
        <ListItemText primary={props.card.label} />
      </ListItem>
      <Divider />
      {props.card.items.map((item: ItemType) => (
        <ListItem button key={item.id}>
          <ListItemText
            primary={item.text}
            secondary={format(item.createDate, "yyyy-MM-dd")}
          />
          <AvTimerIcon
            style={{
              color:
                item.priority === 1
                  ? green[500]
                  : item.priority === 2
                  ? yellow[500]
                  : item.priority === 3
                  ? red[500]
                  : grey[900],
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Column;
