import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "./redux-toolkit/store";
import { getTodo } from "./redux-toolkit/getApi";
import { State, Todo } from "./types";
import {
  addTodo,
  deleteTodo,
  todoPrioritySort,
  todoCreateDateSort,
  todoClosingDateSort,
  todoCompletedChange,
  deleteAllTodosCompleted,
} from "./redux-toolkit/slice";
import { today } from "./date";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./index.css";

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useSelector((state: State) => state.todos);

  const [todo, setTodo] = useState<Todo>({
    id: todos.length,
    title: "",
    text: "",
    priority: 0,
    completed: false,
    deleted: false,
    createDate: Number(today),
    closingDate: "",
  });

  let replaceClosingDate = todo.closingDate.replace(/-/g, "");

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("SaveTodosLocalStorage", JSON.stringify(todos));
  // }, [todos]);

  const handleTitleChange = (e: any) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleTextChange = (e: any) => {
    setTodo({ ...todo, text: e.target.value });
  };

  const handlePriorityChange = (e: any) => {
    setTodo({ ...todo, priority: Number(e.target.value) });
  };

  const handleDateChange = (e: any) => {
    setTodo({ ...todo, closingDate: e.target.value });
  };

  const handleDelete = (todoId: number) => dispatch(deleteTodo({ todoId }));
  const prioritySort = () => dispatch(todoPrioritySort());
  const createDateSort = () => dispatch(todoCreateDateSort());
  const closingDateSort = () => dispatch(todoClosingDateSort());

  const handleCompletedChange = (todoId: number, todoCompleted: boolean) => {
    dispatch(
      todoCompletedChange({
        id: todoId,
        completed: !todoCompleted,
      })
    );
  };

  const handleDeleteAllTodosCompleted = () => {
    dispatch(deleteAllTodosCompleted());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title) return;
    if (!todo.priority) return;
    if (!todo.closingDate) return;
    dispatch(
      addTodo({
        id: todo.id,
        title: todo.title,
        text: todo.text,
        priority: todo.priority,
        completed: todo.completed,
        deleted: todo.deleted,
        createDate: todo.createDate,
        closingDate: replaceClosingDate,
      })
    );
    setTodo({ ...todo, title: "", text: "" });
  };

  return (
    <>
      <h2 className="text-center">Todo?????????</h2>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            type="text"
            placeholder="????????????"
            value={todo.title}
            onChange={handleTitleChange}
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            type="text"
            placeholder="??????"
            value={todo.text}
            onChange={handleTextChange}
          />
          <div className=" flex">
            <FormControl fullWidth>
              <InputLabel>?????????</InputLabel>
              <Select onChange={handlePriorityChange}>
                <MenuItem value={1}>???</MenuItem>
                <MenuItem value={2}>???</MenuItem>
                <MenuItem value={3}>???</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              placeholder="?????????"
              onChange={handleDateChange}
            />
          </div>
          <Button variant="contained" type="submit" className="h-12" fullWidth>
            <span className="text-base">??????</span>
          </Button>
        </Box>
      </form>
      <span className="flex justify-center space-x-2 my-5">
        <Button className="w-40" onClick={prioritySort}>
          ?????????
        </Button>
        <Button className="w-40" onClick={createDateSort}>
          ?????????
        </Button>
        <Button className="w-40" onClick={closingDateSort}>
          ?????????
        </Button>
      </span>
      <h3 className="text-center">
        ????????????Todo?????????
        {loading && <div>Loading...</div>}
        {error && <div>??????????????????????????????????????????</div>}
      </h3>
      <div className="flex justify-center">
        <ul className="list-none">
          {todos !== undefined && (
            <>
              {todos
                .filter(
                  (todo: Todo) =>
                    todo.completed === false && todo.deleted === false
                )
                .map((todo: Todo) => (
                  <li key={todo.id}>
                    <Alert icon={false} severity="info">
                      <Checkbox
                        onClick={() =>
                          handleCompletedChange(todo.id, todo.completed)
                        }
                      />
                      <Link
                        to={todo.id + "/todo-detail"}
                        className="no-underline"
                      >
                        <span>{todo.title}</span>
                      </Link>
                      <span> {todo.text}</span>
                      <p></p>
                      <span>?????????:</span>
                      {todo.priority === 1 && <span>??? </span>}
                      {todo.priority === 2 && <span>??? </span>}
                      {todo.priority === 3 && <span>??? </span>}
                      <span>?????????:{todo.createDate} </span>
                      <span>?????????:{todo.closingDate}</span>
                      <Button
                        color="error"
                        onClick={() => handleDelete(todo.id)}
                      >
                        ??????
                      </Button>
                      <p></p>
                    </Alert>
                  </li>
                ))}
            </>
          )}
        </ul>
      </div>

      <h3 className="text-center">????????????Todo?????????</h3>
      <div className="flex justify-center">
        {todos !== undefined && (
          <div>
            {todos
              .filter((todo: Todo) => todo.completed === true)
              .map((todo: Todo) => (
                <div key={todo.id}>
                  <Alert icon={false} severity="info">
                    <span>{todo.title}</span>
                    <span> {todo.text} </span>
                    <span>?????????:</span>
                    {todo.priority === 1 && <span>??? </span>}
                    {todo.priority === 2 && <span>??? </span>}
                    {todo.priority === 3 && <span>??? </span>}
                    <span>?????????:{todo.createDate} </span>
                    <span>?????????:{todo.closingDate}</span>
                  </Alert>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAllTodosCompleted}
        >
          ???????????????Todo???????????????
        </Button>
      </div>
    </>
  );
};
