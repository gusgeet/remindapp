import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
}, []);

  const addTodo = todo => {
    console.log(todo)
    const newTodos  = [
      ...todos,
      { id: uuidv4(), task: todo.value, subtask: todo.subvalue, completed: false, isEditing: false },
    ];
    console.log(newTodos)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }
  const toggleComplete = (id) => {
    const newTodos = 
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos)) 
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id, subtask) => {
    const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, task, subtask, isEditing: !todo.isEditing } : todo
      );
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    console.log(newTodos)
  };

  return (
  <div className="TodoContainer">
    <div className="TodoWrapperHolder">
      <h1>TareasApp</h1>
      <TodoForm addTodo={addTodo} />
    </div>
    <div className="TodoWrapper">
    {todos !== 'undefined' ? (<h1>Tareas</h1>) : (
       <div>
        <h1>Sin tareas</h1>
        <p className="todo-p">Agregue una tarea con sus detalles, y luego haga click en Agregar. Podra verla en esta misma caja, y editarla o borrarla.</p>
       </div>)}
    {todos.map(todo =>
      todo.isEditing ? (
        <EditTodoForm editTodo={editTask} task={todo} />
      ) : (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
        />
      )
    )}
      
    </div>
  </div>
    
  );
};