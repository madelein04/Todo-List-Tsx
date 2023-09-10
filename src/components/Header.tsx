import { TodoTitle } from "../types"
import { CreateTodo } from "./CreateTodo";

interface Props {
    onAddTodos: ({ title }: TodoTitle) => void
}


export const Header: React.FC<Props> = ({ onAddTodos }) => {
    return (
        <header className="header">
            {/* Título y logotipo de la aplicación */}
            <h1>Todo
                <img style={{ width: "70px", height: "auto", rotate: '15deg' }} src="https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-checklist-and-tasks-clipboard-list-png-image_5203363.png" alt="" />
            </h1>
            {/* Componente CreateTodo para agregar nuevas tareas */}
            <CreateTodo
                saveTodo={onAddTodos}
            />
        </header>
    )
}