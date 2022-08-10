import { InitialState, Loading } from "../types";

export const initialState: InitialState & Loading = {
  todos: [],
  loading: false,
  error: false,
};
