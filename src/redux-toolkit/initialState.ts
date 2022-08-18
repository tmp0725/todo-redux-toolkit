import { InitialState, Loading } from "../types";

// const getTodosLocalStorage = () => {
//   let localStorageData = localStorage.getItem("SaveTodosLocalStorage");
//   return localStorageData ? JSON.parse(localStorageData) : [];
// };

export const initialState: InitialState & Loading = {
  // todos: getTodosLocalStorage(),
  todos: [],
  loading: false,
  error: false,
};
