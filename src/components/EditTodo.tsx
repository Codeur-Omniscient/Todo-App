import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TodoContext } from "../context/TodoContext";

const EditTodo = () => {
  const { activeTodo, onSaveEdit, onCloseEdit } = useContext(TodoContext);
  const [edit, setEdit] = useState(activeTodo?.description ?? "");
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, []);

  useEffect(() => {
    setEdit(activeTodo?.description ?? "");
  }, [activeTodo]);

  const handleSave = () => {
    if (!edit) return;
    onSaveEdit(edit);
  };
  return (
    <div className="bg-black fixed inset-0 flex items-center justify-center rounded bg-opacity-25 shadow-md backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 70 }}
        className="bg-white w-80 space-y-4 rounded p-4 shadow-md"
      >
        <h2 className="mb-2 text-xl">Edit Task</h2>
        <input
          type="text"
          value={edit}
          onChange={(e) => setEdit(e.target.value)}
          ref={editRef}
          className="Input w-full px-1 py-2"
        />
        <div className="grid grid-cols-2 gap-10">
          <button
            className="bg-red-500 text-black rounded px-4 py-2"
            onClick={onCloseEdit}
          >
            Close
          </button>
          <button
            className="bg-green-600 text-black rounded px-4 py-2"
            onClick={handleSave}
          >
            Update
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditTodo;
