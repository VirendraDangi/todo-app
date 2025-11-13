import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    sortBy: "",
    order: "",
    priority: "",
  });

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        API_URL,
        { withCredentials: true },
        { params: filters }
      );
      setTodos(res.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const createTodo = async () => {
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    try {
      await axios.post(API_URL, { title }, { withCredentials: true });
      setTitle("");
      fetchTodos();
      alert("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Error creating todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      fetchTodos();
      alert("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.patch(
        `${API_URL}/${todo._id}`,
        { completed: !todo.completed },
        { withCredentials: true }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  const editTodo = async () => {
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    try {
      await axios.patch(
        `${API_URL}/${editingId}`,
        { title },
        { withCredentials: true }
      );
      setEditingId(null);
      setTitle("");
      fetchTodos();
      alert("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 Todo Manager</h1>

      {/* Create / Update Form */}
      <div className="flex gap-2 w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Enter todo..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={editingId ? editTodo : createTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className="border px-3 py-2 rounded-md"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          className="border px-3 py-2 rounded-md"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="">Sort by</option>
          <option value="createdAt">Created Date</option>
          <option value="updatedAt">Updated Date</option>
        </select>

        <select
          className="border px-3 py-2 rounded-md"
          value={filters.order}
          onChange={(e) => setFilters({ ...filters, order: e.target.value })}
        >
          <option value="">Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>

              <div className="flex gap-3 text-gray-600">
                <FaEdit
                  onClick={() => {
                    setEditingId(todo._id);
                    setTitle(todo.title);
                  }}
                  className="cursor-pointer hover:text-blue-500"
                />
                <FaTrash
                  onClick={() => deleteTodo(todo._id)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
