import { Reducer } from "redux";
import {
  GET_TODOS_REQUEST,
  getTodosRequest,
  GET_TODOS_SUCCESS,
  getTodosSuccess,
  GET_TODOS_FAILURE,
  getTodosFailure,
  ADD_TODO,
  addTodo,
  TODO_COMPLETED_CHANGE,
  todoCompletedChange,
  DELETE_TODO,
  deleteTodo,
  PRIORITY_CHANGE,
  priorityChange,
  DELETE_ALL_TODOS_COMPLETED,
  deleteAllTodosCompleted,
} from "./action";
import { InitialState, Loading, Todo } from "../types";
import { currentTime } from "../date";
import { initialState } from "./initialState";

type Actions = ReturnType<
  | typeof getTodosRequest
  | typeof getTodosSuccess
  | typeof getTodosFailure
  | typeof addTodo
  | typeof deleteTodo
  | typeof todoCompletedChange
  | typeof deleteAllTodosCompleted
>;

export const todosReducer: Reducer<InitialState & Loading, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_TODOS_REQUEST: {
      return action.payload.url;
    }

    case GET_TODOS_SUCCESS: {
      return action.response;
    }

    case GET_TODOS_FAILURE: {
      return action.payload.error;
    }

    case ADD_TODO: {
      const newTodos = {
        id: state.length,
        title: action.payload.title,
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
        createDate: currentTime,
        closingDate: action.payload.closingDate,
      };
      return [...state, newTodos];
    }

    case DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    case TODO_COMPLETED_CHANGE: {
      const todoCompletedChange: any = state.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          //   todo.completed = !action.payload.completed;
        }
      });
      return [...state, todoCompletedChange];
    }

    case DELETE_ALL_TODOS_COMPLETED: {
      //   return state.filter((todo: Todo): boolean => todo.completed === false);
    }

    default: {
      return state;
    }
  }
};

// case PRIORITY_CHANGE: {
//   const priorityChange = state.map((todo) => todo);
//   priorityChange.sort((desc: any, asce: any) => {
//     if (desc.priority > asce.priority) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }
