import { type Todo as TodoType, TodoId, type ListOfTodos } from "../types"
import { Todo } from "./Todo"

//Definicion de Props Las propiedades que el componente Todos aceptará.
interface Props {
    todos: ListOfTodos
    onRemoveTodo: ({ id }: TodoId) => void
    onTogglecompleteTodo:({id, completed}:Pick<TodoType, 'id'| 'completed'>)=>void
}

//Componente
export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onTogglecompleteTodo }) => {
    return (
        <ul className="todo-list">
            {/* En esta parte del codigo se hace el mapeo de las tareas y tambien se renderiza el component Todo */}
            {/* Todo se encarga de mostrar la tarea y manejar eventos relacionados con esa tarea.  */}
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`${todo.completed ? 'completed' : ''}`}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemoveTodo={onRemoveTodo}
                        onTogglecompleteTodo={onTogglecompleteTodo}
                    />
                </li>
            ))
            }
        </ul >
    )
}

