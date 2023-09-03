import { useState } from "react"
import './../App.css';
import CryptoJS from "crypto-js";

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task)
    const [subvalue, setSubvalue] = useState(task.subtask)

    const secretKey = 'a1b2c3d4'

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, task.id, subvalue)
    }

    const shareTodo = (e) => {
        e.preventDefault()
        const task = value
        const subtask = subvalue
        let encryptedTodo = CryptoJS.AES.encrypt(task + '|' + subtask, secretKey).toString()
        let shareable = window.location.href + "?trgt=" + encryptedTodo
        navigator.clipboard.writeText(shareable)
        const btn = document.getElementById('share-btn')
        btn.classList.remove('todo-btn')
        btn.classList.add('todo-btn-success')
      }

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="actualizar..." className="todo-input" value={value} onChange={(e) => setValue(e.target.value)} />
            <textarea placeholder="actualizar detalles..."  className="todo-input" value={subvalue} onChange={(e) => setSubvalue(e.target.value)}></textarea>
            <footer className="footer-edit">
                <button type="submit" className="todo-btn">Actualizar</button>
                <button id="share-btn" onClick={(e) => shareTodo(e)} type="submit" className="todo-btn">Compartir</button>
            </footer>
            
        </form>
    )
}