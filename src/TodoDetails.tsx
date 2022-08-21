import { Box, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  todoEditCompleted,
  todoTextEdit,
  todoTitleEdit,
} from "./redux-toolkit/slice";
import { useAppDispatch } from "./redux-toolkit/store";
import { State, TodoId } from "./types";

export const TodoDetails = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { todos } = useSelector((state: State) => state.todos);
  let { todoId } = useParams<TodoId>();
  let todoTitle = todos[Number(todoId)].title;
  let todoText = todos[Number(todoId)].text;

  const handleTitleChange = (id: number, text: string) => {
    dispatch(todoTitleEdit({ id, text }));
  };

  const handleTextChange = (id: number, text: string) => {
    dispatch(todoTextEdit({ id, text }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(todoEditCompleted({ todoId, todoTitle, todoText }));
    alert("Todoを編集しました");
  };

  return (
    <>
      <h2 className="text-center">詳細画面</h2>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <div className="mb-10">
            <Link to="/" className="no-underline">
              <Button variant="contained" className="h-12" fullWidth>
                戻る
              </Button>
            </Link>
          </div>
          <div>
            <TextField
              type="text"
              placeholder="タイトル"
              value={todoTitle}
              onChange={(e) =>
                handleTitleChange(Number(todoId), e.target.value)
              }
              fullWidth
            />
          </div>
          <TextField
            type="text"
            placeholder="内容"
            value={todoText}
            onChange={(e) => handleTextChange(Number(todoId), e.target.value)}
            fullWidth
            multiline
            rows={5}
          />
          <span>
            <Button
              type="submit"
              variant="contained"
              className="h-12"
              fullWidth
            >
              <span className="text-base">編集</span>
            </Button>
          </span>
        </Box>
      </form>
    </>
  );
};
