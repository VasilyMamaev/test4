import React, { useEffect } from "react";
import { connect } from "react-redux";

import Desk from "./components/desk/desk";
import { AppStateType } from "./redux/store";
import { CardsDataType } from "./types/types";
import { getItems, actions } from "./redux/cards-reducer";

type PropsType = {
  initialized: boolean;
  cardsData: Array<CardsDataType>;
  initialize: () => void;
  sortByAlpha: () => void;
  sortByDate: () => void;
  sortByPriority: () => void;
};

const App = (props: PropsType) => {
  useEffect(() => {
    props.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {props.initialized ? (
        <Desk
          cardsData={props.cardsData}
          sortByAlpha={props.sortByAlpha}
          sortByDate={props.sortByDate}
          sortByPriority={props.sortByPriority}
        />
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.cards.isDataLoaded,
  cardsData: state.cards.cardsData,
});

export default connect(mapStateToProps, {
  initialize: getItems,
  sortByAlpha: actions.sortByAlpha,
  sortByDate: actions.sortByDate,
  sortByPriority: actions.sortByPriority,
})(App);
