import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import CryptoJS from "crypto-js"

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const secretKey = 'a1b2c3d4'

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if(window.location.href.includes('trgt=')) {
      const toImport = window.location.href.split('trgt=')[1]
      const decrypedTodo = CryptoJS.AES.decrypt(toImport, secretKey);
      const task = decrypedTodo.toString(CryptoJS.enc.Utf8).split('|')[0];
      const subtask = decrypedTodo.toString(CryptoJS.enc.Utf8).split('|')[1];
      console.log(savedTodos)
      const alreadyExistsTask = savedTodos.filter(x => x.task === task && x.subtask === subtask)
      console.log(alreadyExistsTask)
      if(alreadyExistsTask.length === 0) {
        const todosWithImportedOne  = [
          ...savedTodos,
          { id: uuidv4(), task: task, subtask: subtask, completed: false, isEditing: false },
        ];
        localStorage.setItem('todos', JSON.stringify(todosWithImportedOne))
        setTodos(todosWithImportedOne);
      }
    }
    setTodos(savedTodos)    
}, []);

  const addTodo = todo => {
    const newTodos  = [
      ...todos,
      { id: uuidv4(), task: todo.value, subtask: todo.subvalue, completed: false, isEditing: false },
    ];
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
  };

  return (
  <div className="TodoContainer">
    <div className="TodoWrapperHolder">
      <h1>Que habia en casApp</h1>
      <TodoForm addTodo={addTodo} />
    </div>
    <div className="TodoWrapper">
    {todos.length !== 0 ? (<h1>Tareas</h1>) : (
       <div>
        <h1>Sin tareas</h1>
        <p className="todo-p">Agregue una tarea con sus detalles, y luego haga click en Agregar. Podra verla en esta misma caja, y editarla, borrarla o compartirla con otros usuarios.</p>
       </div>)}
    {todos.map(todo =>
      todo.isEditing ? (
        <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
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