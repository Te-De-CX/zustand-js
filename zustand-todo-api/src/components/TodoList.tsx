import React, { useEffect, useState } from "react";
import useTodoStore, { Todo, Filter } from "../store/todoStore";

const TodoList: React.FC = () => {
  const { todos, filter, loading, fetchTodos, addTodo, toggleTodo, deleteTodo, setFilter } = useTodoStore();
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos: Todo[] = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* Show loading state */}
      {loading && <p>Loading todos...</p>}

      {/* Add Todo Input */}
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div>
        {(["all", "completed", "pending"] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;