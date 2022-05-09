import { FeedDataType } from "./state";

export enum ActionType {
  AddQuestion,
  FilterQuestions,
  UpdateLabels,
}
export interface AddQuestion {
  type: ActionType.AddQuestion;
  payload: FeedDataType;
}
export interface FilterQuestions {
  type: ActionType.FilterQuestions;
  payload: FeedDataType[];
}
export interface UpdateLabels {
  type: ActionType.UpdateLabels;
  payload: string[];
}
export type Actions = AddQuestion | FilterQuestions | UpdateLabels;
