import { useState } from "react"
import './../App.css';

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('')
    const [subvalue, setSubvalue] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        if (value) {
            const newTodo = { value, subvalue }
            addTodo(newTodo)
            setValue("")
            setSubvalue("")
        }
    }
    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="tarea..." className="todo-input" value={value} onChange={(e) => setValue(e.target.value)} />
            <textarea placeholder="detalles..."  className="todo-input" value={subvalue} onChange={(e) => setSubvalue(e.target.value)}></textarea>
            <button type="submit" className="todo-btn">Agregar</button>
        </form>
    )
}