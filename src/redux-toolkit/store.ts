import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../types";
import { todoSlice } from "./slice";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
