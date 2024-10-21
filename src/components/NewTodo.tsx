import { FormEvent, useContext, useState } from "react";
import { CirclePlus } from "lucide-react";

import { TodoContext } from "../context/TodoContext";
import Todo from "../types/types";

const NewTodo = () => {
  const [text, setText] = useState("");
  const { onAddTodo } = useContext(TodoContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (text?.trim().length === 0) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description: text,
      complete: false,
    };

    onAddTodo(newTodo);
    setText("");
  };

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="Input"
        placeholder="Add new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="">
        <CirclePlus className="size-6" />
      </button>
    </form>
  );
};

export default NewTodo;
