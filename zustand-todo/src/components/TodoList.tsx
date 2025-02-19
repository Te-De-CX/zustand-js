import React, { useState } from "react";
import useTodoStore from "../store/todoStore";

const TodoList: React.FC = () => {
  const { todos, filter, addTodo, toggleTodo, deleteTodo, setFilter } = useTodoStore();
  const [task, setTask] = useState("");

  // Filter the todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // Show all
  });

  const handleAddTodo = () => {
    if (task.trim()) {
      addTodo(task);
      setTask(""); // Clear input
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

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
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
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