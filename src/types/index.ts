import { Action, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer, store } from "../redux-toolkit/store";

export type State = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type InitialState = {
  todos: Todo[];
};

export type Todo = {
  id: number;
  title: string;
  text: string;
  priority: number;
  completed: boolean;
  createDate: number;
  closingDate: string;
};

export type Loading = {
  loading?: boolean;
  error?: boolean;
};

export type TodoId = {
  todoId: string;
};
