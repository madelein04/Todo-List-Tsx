import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { TodoTitle } from "./types"
import { FilterValue, type TodoId, type Todo as TodoType } from "./types";
import { TODO_FILTERS } from "./consts";

const LOCAL_STORAGE_KEY = "todos"; // Clave para el almacenamiento local

const App = (): JSX.Element => {
  // Cargar las historias desde el almacenamiento local al iniciar la aplicación
  const initialTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  //<TodoType[]> significa que todos será un array de objetos que cumplen con la estructura definida por el tipo TodoType. 
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  //Esta funcion maneja la eliminancion de una tarea  
  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }
  //Esta funcion maneja el cambio de estado de una tarea ( completado o no completado)
  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    // Se utiliza el metodo map para crear una NUEVA lista de tareas  
    // donde la tarea correspondiente al id proporcionado se actualiza 
    // con el nuevo valor de completed. 
    const newTodo = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodo)
  }
  // Función para cambiar el filtro de tareas activas, completadas, o todas
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }
  // Función para eliminar TODAS las tareas completadas
  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  // Contar tareas activas y completadas
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  // Filtrar las tareas según el filtro seleccionado (activas, completadas o todas)
  const filteredTodos = todos.filter(todo => {
    if (filterSelected == TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected == TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })
  // Función para agregar una nueva tarea
  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  // Guardar las historias en el almacenamiento local cada vez que se actualizan
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      {/* Encabezado que permite agregar nuevas tareas */}
      <Header onAddTodos={handleAddTodo} />

      <Todos
        onTogglecompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos} />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}


export default App
