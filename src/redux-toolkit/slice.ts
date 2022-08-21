import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getTodo } from "./getApi";
import { InitialState, Todo } from "../types";

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: InitialState, action: PayloadAction<Todo>) => {
      const newTodos: Todo = {
        id: state.todos.length,
        title: action.payload.title,
        text: action.payload.text,
        priority: action.payload.priority,
        completed: action.payload.completed,
        deleted: action.payload.deleted,
        createDate: action.payload.createDate,
        closingDate: action.payload.closingDate,
      };
      state.todos = [...state.todos, newTodos];
    },
    deleteTodo: (state, action) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.deleted = true;
        }
      });
    },
    todoCompletedChange: (state, action) => {
      const i = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[i].completed = action.payload.completed;
    },
    deleteAllTodosCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.completed === false);
    },
    todoPrioritySort: (state) => {
      state.todos.sort((a, b) => a.priority - b.priority);
    },
    todoCreateDateSort: (state) => {
      state.todos.sort((a, b) => b.createDate - a.createDate);
    },
    todoClosingDateSort: (state) => {
      state.todos.sort((a, b) => Number(a.closingDate) - Number(b.closingDate));
    },
    todoTitleEdit: (state, action) => {
      const i = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[i].title = action.payload.text;
    },
    todoTextEdit: (state, action) => {
      const i = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[i].text = action.payload.text;
    },
    todoEditCompleted: (state, action) => {
      state.todos.findIndex((todo) => todo.id === action.payload.id);
      [state.todos, action.payload];
    },
  },
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
    builder.addDefaultCase((state) => state);
  },
});

export const {
  addTodo,
  deleteTodo,
  todoCompletedChange,
  deleteAllTodosCompleted,
  todoPrioritySort,
  todoCreateDateSort,
  todoClosingDateSort,
  todoTitleEdit,
  todoTextEdit,
  todoEditCompleted,
} = todoSlice.actions;
