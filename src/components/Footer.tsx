import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
    activeCount: number,
    completedCount: number,
    filterSelected: FilterValue
    onClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onClearCompleted,
}) => {
    return (
        <footer className="footer">
            {/* Contador de tareas pendientes */}
            <span className="todo-count">
                <strong> {activeCount} </strong>{` tareas pendientes`}
            </span>
            {/* Componente Filters para gestionar los filtros */}
            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />

            {/* Botón para borrar tareas completadas (si hay tareas completadas) */}
            {
                completedCount > 0 && (
                    <button
                        className='clear-completed'
                        onClick={onClearCompleted}>
                        Borrar completadas
                    </button>
                )
            }
        </footer>
    )
}