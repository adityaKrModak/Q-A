import { Actions, ActionType } from "./action";
import { QAState } from "./state";

export const feedReducer = (state: QAState, action: Actions): QAState => {
  switch (action.type) {
    case ActionType.AddQuestion:
      return { ...state, FeedData: [action.payload, ...state.FeedData] };
    case ActionType.FilterQuestions:
      return { ...state, FeedData: action.payload };

    default:
      return state;
  }
};
