import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getTodo } from "./getApi";

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });

    builder.addCase(getTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
