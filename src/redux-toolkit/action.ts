import axios from "axios";
import { Todo } from "../types";

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const getTodosRequest = (url: string) => {
  return {
    type: GET_TODOS_REQUEST,
    payload: {
      url,
    },
  } as const;
};

export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const getTodosSuccess = (response: any) => {
  return {
    type: GET_TODOS_SUCCESS,
    response,
  } as const;
};

export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";
export const getTodosFailure = (error: any) => {
  return {
    type: GET_TODOS_FAILURE,
    error: true,
    payload: error,
  } as const;
};

export const getTodos = () => {
  return () => {
    axios
      .get("http://127.0.0.1:5173/src/todos.json")
      .then((response) => {
        const todosData = response.data;
        // dispatch(getTodosSuccess(todosData));
      })
      .catch((error) => {
        const errorMessage = error.message;
        // dispatch(getTodosFailure(errorMessage));
      });
  };
};

export const ADD_TODO = "ADD_TODO";
export const addTodo = ({ title, text, priority, closingDate }: Todo) => {
  return {
    type: ADD_TODO,
    payload: {
      title,
      text,
      priority,
      closingDate,
    },
  } as const;
};

export const DELETE_TODO = "DELETE_TODO";
export const deleteTodo = (id: number) => {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  } as const;
};

export const PRIORITY_CHANGE = "PRIORITY_CHANGE";
export const priorityChange = (priority: string) => {
  return {
    type: PRIORITY_CHANGE,
    payload: {
      priority,
    },
  } as const;
};

export const TODO_COMPLETED_CHANGE = "TODO_COMPLETED_CHANGE";
export const todoCompletedChange = (id: number, completed: boolean) => {
  return {
    type: TODO_COMPLETED_CHANGE,
    payload: {
      id,
      completed,
    },
  } as const;
};

export const DELETE_ALL_TODOS_COMPLETED = "DELETE_ALL_TODOS_COMPLETED";
export const deleteAllTodosCompleted = () => {
  return {
    type: DELETE_ALL_TODOS_COMPLETED,
  } as const;
};
