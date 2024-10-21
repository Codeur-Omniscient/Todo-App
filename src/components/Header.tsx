import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Header = () => {
  const { todos } = useContext(TodoContext);

  const numTodo = todos.length;
  const numComplete = todos.filter((todo) => todo.complete).length;

  const isTask = numTodo === numComplete && numTodo > 0;
  return (
    <header>
      {isTask ? (
        <p>Congratulation you have done all your tasks 🥳🎉</p>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-textColor">Hey there👋</p>
            <span>Start tracking your day by adding a new task</span>
          </div>
          <p>
            {numComplete}/{numTodo} Tasks
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
