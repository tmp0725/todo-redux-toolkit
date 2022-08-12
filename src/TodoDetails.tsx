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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>TodoDetails</h2>
      <Link to="/">戻る</Link>
      <div>
        <input
          value={todoTitle}
          onChange={(e) => handleTitleChange(Number(todoId), e.target.value)}
        />
      </div>
      <textarea
        value={todoText}
        onChange={(e) => handleTextChange(Number(todoId), e.target.value)}
      ></textarea>
      <span>
        <input type="submit" value="編集" />
      </span>
    </form>
  );
};
