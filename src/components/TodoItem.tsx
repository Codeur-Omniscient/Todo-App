import { useContext, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import { motion, useAnimate, usePresence } from "framer-motion";

import Todo from "../types/types";
import { TodoContext } from "../context/TodoContext";

interface TodoProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoProps) => {
  const { onDeleteTodo, onCompleteTodo, onOpenEdit } = useContext(TodoContext);
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          },
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: -25,
          },
          {
            delay: 0.75,
          },
        );

        safeToRemove();
      };

      exitAnimation();
    }
  }, [animate, isPresent, safeToRemove, scope]);

  return (
    <motion.li
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
      layout
      ref={scope}
      className="flex items-center gap-2 rounded bg-darkBg px-4 py-4"
    >
      <button
        onClick={() => onCompleteTodo(todo.id)}
        className="flex items-center"
      >
        <input
          type="checkbox"
          value={Number(todo.complete)}
          className="checkbox-success checkbox"
        />
      </button>
      <div className="grow">
        <span
          className={`${todo.complete ? "italic line-through opacity-20" : ""} block text-textColor`}
        >
          {todo.description}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => onOpenEdit(todo)}>
          <Pencil className="size-6" />
        </button>
        <button onClick={() => onDeleteTodo(todo.id)}>
          <Trash className="text-red-500 size-6" />
        </button>
      </div>
    </motion.li>
  );
};

export default TodoItem;
