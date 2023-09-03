import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, editTodo, shareTodo}) => {
  return (
    <div className='Todo' key={task.index}>
        <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>
        <div className='LogoContainer'>
          <FontAwesomeIcon className='icon-todo' icon={faPenToSquare} onClick={() => editTodo(task.id)} />
          <FontAwesomeIcon className='icon-todo' icon={faTrash} onClick={() => deleteTodo(task.id)}/>
        </div>
    </div>
  )
}
