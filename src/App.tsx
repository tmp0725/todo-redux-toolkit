import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addTodo,
  deleteTodo,
  priorityChange,
  deleteAllTodosCompleted,
} from "./redux-toolkit/action";
import { useAppDispatch } from "./redux-toolkit/store";
import { getTodo } from "./redux-toolkit/getApi";
import { State, Todo } from "./types";

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useSelector((state: State) => state.todos);
  console.log(todos);

  const [todo, setTodo] = useState<Todo>({
    id: 3,
    title: "",
    text: "",
    priority: "",
    closingDate: "",
  });

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  const handleTitleChange = (e: any) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleTextChange = (e: any) => {
    setTodo({ ...todo, text: e.target.value });
  };

  const handleSelectChange = (e: any) => {
    setTodo({ ...todo, priority: e.target.value });
  };

  const handleDateChange = (e: any) => {
    setTodo({ ...todo, closingDate: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title) return;
    dispatch(
      addTodo({
        id: 3,
        title: todo.title,
        text: todo.text,
        priority: todo.priority,
        closingDate: todo.closingDate,
      })
    );
    setTodo({ ...todo, title: "", text: "" });
  };

  return (
    <>
      <h2>Todoリスト</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タイトル"
          value={todo.title}
          onChange={handleTitleChange}
        />
        <div>
          <textarea
            placeholder="内容"
            cols={22}
            rows={10}
            value={todo.text}
            onChange={handleTextChange}
          ></textarea>
          <span>
            <span>優先度:</span>
            <select onChange={handleSelectChange}>
              <option value=""></option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </span>
          <span>
            <span>締切日:</span>
            <input type="date" onChange={handleDateChange}></input>
          </span>
          <input type="submit" value="追加" />
        </div>
      </form>
      <span>
        <button onClick={() => dispatch(priorityChange(todo.priority))}>
          優先度
        </button>
        <button>作成日</button>
        <button>締切日</button>
      </span>
      {loading && <div>Loading...</div>}
      {error && <div>データの取得に失敗しました。</div>}
      <h3>未完了のTodoリスト</h3>
      <ul>
        {todos
          // .filter((todo) => todo.completed === false)
          .map((todo: Todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                // onClick={() =>
                //   dispatch(todoCompletedChange(todo.id, todo.completed))
                // }
              />
              <Link to="/todo-detail">
                <span>{todo.title}</span>
              </Link>
              <span> {todo.text}</span>
              <p></p>
              <span>優先度:{todo.priority} </span>
              <span>作成日:{todo.createDate} </span>
              <span>締切日:{todo.closingDate}</span>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>
                削除
              </button>
              <p></p>
            </li>
          ))}
      </ul>
      <h3>完了したTodoリスト</h3>
      {todos
        .filter((todo: any) => todo.completed === true)
        .map((todo: any) => (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <span> {todo.text}</span>
          </div>
        ))}
      <button onClick={() => dispatch(deleteAllTodosCompleted())}>
        完了済みのTodoを全て削除
      </button>
    </>
  );
};
