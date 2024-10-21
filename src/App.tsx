import TodosApp from "./components/TodosApp";
import { ToastContainer } from "react-toastify";
import { TodoContextProvider } from "./context/TodoContext";
import "./index.css";

function App() {
  return (
    <TodoContextProvider>
      <div className="container h-screen bg-veryDarBg py-10">
        <main className="mx-auto h-auto max-w-md bg-primaryColor px-4 py-3 shadow-2xl">
          <TodosApp />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          theme="dark"
        />
      </div>
    </TodoContextProvider>
  );
}

export default App;
