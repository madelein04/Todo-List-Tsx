import { useState } from "react";
import { TodoTitle } from "../types"

interface Props {
    saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    // Estado local para el valor del campo de entrada
    const [inputValue, setInputValue] = useState('')
    // Función para manejar el envío del formulario

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()// Evitar la recarga de la página al enviar el formulario
        saveTodo({ title: inputValue })// Llamar a la función saveTodo para guardar la nueva tarea
        setInputValue('')// Restablecer el valor del campo de entrada a vacío después de guardar
    }

    return (
        <form
            onSubmit={handleSubmit}> {/* Formulario para agregar nuevas tareas */}
            <input
                type="text"
                className="new-todo"
                value={inputValue}
                onChange={(evt) => { setInputValue(evt.target.value) }} // Manejar cambios en el campo de entrada
                placeholder="¿Qué quieres hacer?"
                autoFocus
            />
        </form>
    )
}