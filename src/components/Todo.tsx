import { TodoId, type Todo as TodoType } from "../types";
// Definición de las propiedades del componente
interface Props extends TodoType {
    onTogglecompleteTodo: ({
        id,
        completed,
    }: Pick<TodoType, "id" | "completed">) => void;
    onRemoveTodo: ({ id }: TodoId) => void;
}
// Componente funcional Todo que representa una tarea individual
export const Todo: React.FC<Props> = ({
    id,
    title,
    completed,
    onRemoveTodo,
    onTogglecompleteTodo,
}) => {
    return (
        <div className="view">
            {/* Input de tipo checkbox para marcar/completar la tarea */}
            <input
                className="toggle"
                checked={completed}
                type="checkbox"
                // Evento onChange para manejar el cambio de estado/completado
                onChange={(event) => {
                    onTogglecompleteTodo({ id, completed: event.target.checked });
                }}
            />
            <label> {title}</label>
            {/* Botón para eliminar la tarea */}
            <button
                className="destroy"
                onClick={() => {
                    onRemoveTodo({ id });
                }}
            />
        </div>
    );
};
