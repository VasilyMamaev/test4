import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux/store";

export type ItemType = {
  id: number;
  label: LabelType;
  text: string;
  priority: number;
  createDate: Date;
};

export type LabelType = "TO_DO" | "IN_PROGRESS" | "DONE";

export type CardsDataType = {
  label: LabelType;
  items: Array<ItemType> | [];
};

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
