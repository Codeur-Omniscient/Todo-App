import { FormEvent, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Search } from "lucide-react";

const SearchTodo = () => {
  const { onSearch } = useContext(TodoContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="Input"
        placeholder="Search task"
        onChange={(e) => onSearch(e.target.value)}
      />

      <button className="" type="button">
        <Search className="size-6" />
      </button>
    </form>
  );
};

export default SearchTodo;
