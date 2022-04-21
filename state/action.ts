import { FeedDataType } from "./state";

export enum ActionType {
  AddQuestion,
  FilterQuestions,
}
export interface AddQuestion {
  type: ActionType.AddQuestion;
  payload: FeedDataType;
}
export interface FilterQuestions {
  type: ActionType.FilterQuestions;
  payload: FeedDataType[];
}
export type Actions = AddQuestion | FilterQuestions;
