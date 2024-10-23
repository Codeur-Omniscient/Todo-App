import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Search } from "lucide-react";

const SearchTodo = () => {
  const { onSearch } = useContext(TodoContext);

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="Input"
        placeholder="Search task"
        onChange={(e) => onSearch(e.target.value)}
      />

      <button className="" type="button">
        <Search className="size-6" />
      </button>
    </div>
  );
};

export default SearchTodo;
