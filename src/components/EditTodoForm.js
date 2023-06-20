import { useEffect, useState } from "react"
import './../App.css';

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task)
    const [subvalue, setSubvalue] = useState(task.subtask)

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, task.id, subvalue)
    }

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="actualizar..." className="todo-input" value={value} onChange={(e) => setValue(e.target.value)} />
            <textarea placeholder="actualizar detalles..."  className="todo-input" value={subvalue} onChange={(e) => setSubvalue(e.target.value)}></textarea>
            <button type="submit" className="todo-btn">Actualizar</button>
        </form>
    )
}