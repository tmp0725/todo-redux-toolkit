import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { TodoDetails } from "../TodoDetails";

export const Routers = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:todoId/todo-detail" element={<TodoDetails />} />
    </Routes>
  </BrowserRouter>
);
