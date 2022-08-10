import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const getTodoAPI = (): Promise<AxiosResponse> => {
  const apiURL = "http://127.0.0.1:5173/todos.json";
  return api.get(apiURL);
};

export const getTodo = createAsyncThunk("todos/fetchByIdStatus", async () => {
  const response = await getTodoAPI();
  return response.data;
});
