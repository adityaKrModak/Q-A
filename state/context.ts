import React from "react";
import { Actions } from "./action";
import { initialState, QAState } from "./state";

export const AppContext = React.createContext<{
  state: QAState;
  dispatch: React.Dispatch<Actions>;
}>({ state: initialState, dispatch: () => undefined });

AppContext.displayName = "QAContext";
