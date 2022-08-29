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
      <h2 className="text-center">Todoリスト</h2>
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
            placeholder="タイトル"
            value={todo.title}
            onChange={handleTitleChange}
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            type="text"
            placeholder="内容"
            value={todo.text}
            onChange={handleTextChange}
          />
          <div className=" flex">
            <FormControl fullWidth>
              <InputLabel>優先度</InputLabel>
              <Select onChange={handlePriorityChange}>
                <MenuItem value={1}>高</MenuItem>
                <MenuItem value={2}>中</MenuItem>
                <MenuItem value={3}>低</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              placeholder="締切日"
              onChange={handleDateChange}
            />
          </div>
          <Button variant="contained" type="submit" className="h-12" fullWidth>
            <span className="text-base">追加</span>
          </Button>
        </Box>
      </form>
      <span className="flex justify-center space-x-2 my-5">
        <Button className="w-40" onClick={prioritySort}>
          優先度
        </Button>
        <Button className="w-40" onClick={createDateSort}>
          作成日
        </Button>
        <Button className="w-40" onClick={closingDateSort}>
          締切日
        </Button>
      </span>
      <h3 className="text-center">
        未完了のTodoリスト
        {loading && <div>Loading...</div>}
        {error && <div>データの取得に失敗しました。</div>}
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
                      <span>優先度:</span>
                      {todo.priority === 1 && <span>高 </span>}
                      {todo.priority === 2 && <span>中 </span>}
                      {todo.priority === 3 && <span>低 </span>}
                      <span>作成日:{todo.createDate} </span>
                      <span>締切日:{todo.closingDate}</span>
                      <Button
                        color="error"
                        onClick={() => handleDelete(todo.id)}
                      >
                        削除
                      </Button>
                      <p></p>
                    </Alert>
                  </li>
                ))}
            </>
          )}
        </ul>
      </div>

      <h3 className="text-center">完了したTodoリスト</h3>
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
                    <span>優先度:</span>
                    {todo.priority === 1 && <span>高 </span>}
                    {todo.priority === 2 && <span>中 </span>}
                    {todo.priority === 3 && <span>低 </span>}
                    <span>作成日:{todo.createDate} </span>
                    <span>締切日:{todo.closingDate}</span>
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
          完了済みのTodoを全て削除
        </Button>
      </div>
    </>
  );
};
