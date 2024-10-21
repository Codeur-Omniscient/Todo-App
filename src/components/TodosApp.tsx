import { useContext } from "react";
import Header from "./Header";
import NewTodo from "./NewTodo";
import Todos from "./Todos";
import { TodoContext } from "../context/TodoContext";
import EditTodo from "./EditTodo";
import SearchTodo from "./SearchTodo";
import { AnimatePresence } from "framer-motion";

const TodosApp = () => {
  const { activeTodo } = useContext(TodoContext);
  return (
    <div className="space-y-9">
      <Header />
      <NewTodo />
      <SearchTodo />
      <div>
        <Todos />
      </div>
      {<AnimatePresence>{activeTodo && <EditTodo />}</AnimatePresence>}
    </div>
  );
};

export default TodosApp;
