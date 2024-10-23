import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Todo from "../types/types";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface ContextProps {
  children: React.ReactNode;
}

type TodoContextObj = {
  todos: Todo[] | null;
  activeTodo: Todo | null;
  onAddTodo: (newTodo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onCompleteTodo: (id: string) => void;
  onSearch: (searchValue: string) => void;
  onSaveEdit: (description: string) => void;
  onOpenEdit: (todo: Todo) => void;
  onCloseEdit: () => void;
};

export const TodoContext = createContext<TodoContextObj>({
  todos: [],
  activeTodo: {
    id: "",
    description: undefined,
    complete: false,
  },
  onAddTodo: () => {},
  onDeleteTodo: () => {},
  onCompleteTodo: () => {},
  onSearch: () => {},
  onSaveEdit: () => {},
  onOpenEdit: () => {},
  onCloseEdit: () => {},
});

export const TodoContextProvider = ({ children }: ContextProps) => {
  const [todos, setTodos] = useState<Todo[] | null>(function () {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos);
      } catch (e) {
        console.error("Failed to parse todos from localStorage:", e);
        return null;
      }
    }
    return null;
  });
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState("");

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos],
  );

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((todos) => [...(todos as []), newTodo]);
    toast.success("Task added successfully");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((todos) => {
      if (todos) {
        return todos.filter((todo) => todo.id !== id);
      }
      return todos; // Si todos est null, on le renvoie tel quel
    });
    toast.success("Task deleted");
  };

  // const handleDeleteTodo = (id: string) => {
  //   setTodos((todos) => todos.filter((todo) => todo.id !== id));
  //   toast.success("Task deleted");
  // };

  const handleComplete = (id: string) => {
    setTodos((todos) => {
      if (todos) {
        return todos.map((todo) =>
          todo.id === id ? { ...todo, complete: !todo.complete } : todo,
        );
      }
      return todos;
    });
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleOpenEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleCloseEdit = () => {
    setEditTodo(null);
  };

  const handleSaveEdit = useCallback(
    (description: string) => {
      if (editTodo) {
        setTodos((todos) => {
          if (todos) {
            return todos.map((todo) =>
              todo.id === editTodo.id
                ? { ...todo, description: description }
                : todo,
            );
          }
          return todos;
        });
        handleCloseEdit();
        toast.info("Task was updated successfully");
      }
    },
    [editTodo],
  );

  const filteredTodo = todos?.length
    ? todos.filter((todo) =>
        todo.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  const contextValue: TodoContextObj = useMemo(() => {
    return {
      todos: filteredTodo,
      activeTodo: editTodo,
      onAddTodo: handleAddTodo,
      onDeleteTodo: handleDeleteTodo,
      onCompleteTodo: handleComplete,
      onSearch: handleSearch,
      onSaveEdit: handleSaveEdit,
      onOpenEdit: handleOpenEdit,
      onCloseEdit: handleCloseEdit,
    };
  }, [editTodo, filteredTodo, handleSaveEdit]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
