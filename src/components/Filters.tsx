import { FILTERS_BUTTONS } from "../consts"
import { type FilterValue } from "../types"

interface Props {
    onFilterChange: (filter: FilterValue) => void
    filterSelected: FilterValue
}

export const Filters: React.FC<Props> = (
    { filterSelected, onFilterChange }
) => {
    return (
        <ul className="filters">
            {
                /* Mapeo a través de los filtros disponibles */
                Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
                    // Comprobar si el filtro actual está seleccionado
                    const isSelected = key === filterSelected
                    // Aplicar una clase CSS "selected" si el filtro está seleccionado
                    const className = isSelected ? 'selected' : ''

                    return (
                        <li key={key}>
                            {/* Enlaces para cada filtro */}
                            <a
                                href={href}
                                className={className}
                                onClick={(event) => {
                                    event.preventDefault()
                                    onFilterChange(key as FilterValue) // Llamar a la función para cambiar el filtro
                                }}
                            >
                                {literal}{/* Texto del filtro */}
                            </a>
                        </li>
                    )
                })

            }
        </ul >
    )
}
