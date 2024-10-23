import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Header = () => {
  const { todos } = useContext(TodoContext);

  const numTodo = todos?.length;
  const numComplete = todos?.filter((todo) => todo.complete).length;

  if (!numTodo) {
    return (
      <div>
        <p className="text-textColor">Hey there👋</p>
        <span>Start tracking your day by adding a new task</span>
      </div>
    );
  }
  const isTask = numTodo === numComplete && numTodo > 0;
  return (
    <header>
      {isTask ? (
        <div>
          <p>Congratulation you have done all your tasks 🥳🎉</p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p>
              Keep it up sir !! It's just a few task before you finished 💪😊
            </p>
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
