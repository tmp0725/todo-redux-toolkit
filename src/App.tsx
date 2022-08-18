import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "./redux-toolkit/store";
import { getTodo } from "./redux-toolkit/getApi";
import { State, Todo } from "./types";
import {
  addTodo,
  // deleteTodo,
  // todoPrioritySort,
  // todoCreateDateSort,
  // todoClosingDateSort,
  todoCompletedChange,
  deleteAllTodosCompleted,
} from "./redux-toolkit/slice";
import { today } from "./date";

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

  // const handleDelete = (todoId: number) => {
  //   dispatch(deleteTodo({ todoId }));
  // };

  const handleDelete = (todoId: number) => {
    todos.map((todo) => {
      if (todo.id === todoId) {
        todo.deleted = true;
      }
    });
  };

  const prioritySort = () => {
    todos.sort((a, b) => a.priority - b.priority);
  };

  const createDateSort = () => {
    todos.sort((a, b) => b.createDate - a.createDate);
  };

  const closingDateSort = () => {
    todos.sort((a, b) => Number(a.closingDate) - Number(b.closingDate));
  };

  // const prioritySort = () => {
  //   dispatch(todoPrioritySort());
  // };

  // const createDateSort = () => {
  //   dispatch(todoCreateDateSort());
  // };

  // const closingDateSort = () => {
  //   dispatch(todoClosingDateSort());
  // };

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
            <select onChange={handlePriorityChange}>
              <option value={0}></option>
              <option value={1}>高</option>
              <option value={2}>中</option>
              <option value={3}>低</option>
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
        <button onClick={prioritySort}>優先度</button>
        <button onClick={createDateSort}>作成日</button>
        <button onClick={closingDateSort}>締切日</button>
      </span>
      {loading && <div>Loading...</div>}
      {error && <div>データの取得に失敗しました。</div>}
      <h3>未完了のTodoリスト</h3>
      <ul>
        {todos !== undefined && (
          <>
            {todos
              .filter(
                (todo: Todo) =>
                  todo.completed === false && todo.deleted === false
              )
              .map((todo: Todo) => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    onClick={() =>
                      handleCompletedChange(todo.id, todo.completed)
                    }
                  />
                  <Link to={todo.id + "/todo-detail"}>
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
                  {/* <button onClick={() => handleDelete(todo.id)}>削除</button> */}
                  <button onClick={() => handleDelete(todo.id)}>削除</button>
                  <p></p>
                </li>
              ))}
          </>
        )}
      </ul>
      <h3>完了したTodoリスト</h3>
      {todos !== undefined && (
        <>
          {todos
            .filter((todo: Todo) => todo.completed === true)
            .map((todo: Todo) => (
              <div key={todo.id}>
                <span>{todo.title}</span>
                <span> {todo.text} </span>
                <span>優先度:</span>
                {todo.priority === 1 && <span>高 </span>}
                {todo.priority === 2 && <span>中 </span>}
                {todo.priority === 3 && <span>低 </span>}
                <span>作成日:{todo.createDate} </span>
                <span>締切日:{todo.closingDate}</span>
              </div>
            ))}
        </>
      )}
      <button onClick={handleDeleteAllTodosCompleted}>
        完了済みのTodoを全て削除
      </button>
    </>
  );
};
