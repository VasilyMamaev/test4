import { dateSort, prioritySort } from "./../utils/sorting";
import {
  ItemType,
  LabelType,
  BaseThunkType,
  InferActionsTypes,
} from "../types/types";
import mockData from "../mock/mock-cards.json";
import { nameSort } from "../utils/sorting";

const TO_DO = "TO_DO";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";

const initialState = {
  cardsData: [
    {
      label: TO_DO as LabelType,
      items: [] as Array<ItemType> | [],
    },
    {
      label: IN_PROGRESS as LabelType,
      items: [] as Array<ItemType> | [],
    },
    {
      label: DONE as LabelType,
      items: [] as Array<ItemType> | [],
    },
  ],
  isDataLoaded: false,
};

export type InitialStateType = typeof initialState;
export type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;

export default (
  state: InitialStateType = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case "GET_ITEMS":
      return {
        ...state,
        cardsData: [
          {
            label: TO_DO,
            items: [...action.items.filter((item) => item.label === TO_DO)],
          },
          {
            label: IN_PROGRESS,
            items: [
              ...action.items.filter((item) => item.label === IN_PROGRESS),
            ],
          },
          {
            label: DONE,
            items: [...action.items.filter((item) => item.label === DONE)],
          },
        ],
      };
    case "SET_DATA_LOADED":
      return {
        ...state,
        isDataLoaded: action.loadStatus,
      };
    case "SORT_ALPHA":
      return {
        ...state,
        cardsData: [
          ...state.cardsData.map((card) => ({
            ...card,
            items: [...card.items.sort((a, b) => nameSort(a, b))],
          })),
        ],
      };
    case "SORT_DATE":
      return {
        ...state,
        cardsData: [
          ...state.cardsData.map((card) => ({
            ...card,
            items: [...card.items.sort((a, b) => dateSort(a, b))],
          })),
        ],
      };
    case "SORT_PRIORITY":
      return {
        ...state,
        cardsData: [
          ...state.cardsData.map((card) => ({
            ...card,
            items: [...card.items.sort((a, b) => prioritySort(a, b))],
          })),
        ],
      };
    default:
      return state;
  }
};

export const actions = {
  setItems: (items: Array<ItemType>) =>
    ({
      type: "GET_ITEMS",
      items,
    } as const),
  setDataLoaded: (loadStatus: boolean) =>
    ({
      type: "SET_DATA_LOADED",
      loadStatus,
    } as const),
  sortByAlpha: () => ({ type: "SORT_ALPHA" } as const),
  sortByDate: () => ({ type: "SORT_DATE" } as const),
  sortByPriority: () => ({ type: "SORT_PRIORITY" } as const),
};

export const getItems = (): ThunkType => async (dispatch) => {
  // TODO: здесь будет асинхронный запрос
  let data: any = mockData.map((item) => ({
    ...item,
    createDate: new Date(`${item.createDate}`),
  }));
  dispatch(actions.setItems(data));
  dispatch(actions.setDataLoaded(true));
};
