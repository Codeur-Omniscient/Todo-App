import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";
import { AnimatePresence } from "framer-motion";

const Todos = () => {
  const { todos } = useContext(TodoContext);
  const sorteTodos = todos
    ? todos.slice().sort((a, b) => Number(a.complete) - Number(b.complete))
    : [];
  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {sorteTodos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </AnimatePresence>
    </ul>
  );
};

export default Todos;
