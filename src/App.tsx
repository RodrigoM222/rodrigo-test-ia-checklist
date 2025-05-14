import { useState } from 'react';
import './App.css'

function App() {

  const [tasks, setTasks] = useState([ 
    { id: 1, actividad: 'Aprender React', completada: false },
    { id: 2, actividad: 'Hacer ejercicio', completada: false },
  ]); // inicializo el estado con un array de tareas

  const [newTask, setNewTask] = useState(''); // inicializo el estado para la nueva tarea

  const addTask = () => {
    if (newTask.trim() === '') return; // Para no agregar tareas vacías
    
    const newTaskObj = {
      id: Date.now(), // uso de Date.now() para generar un id único
      actividad: newTask,
      completada: false
    };

    setTasks([...tasks, newTaskObj]); // agrega la nueva tarea al array de tareas
    setNewTask(''); // limpiar el input por si las dudas
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id)); // filtra aquellas tareas que corresponda con el id del elemento a eliminar
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completada: !task.completada } : task )); // cambia el estado de la tarea a completada o no
  };

  return (
    <>
      <div>
        <h2>Tareas:</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completada ? 'completada' : ''}>
              <input
                type="checkbox"
                checked={task.completada} // marca la tarea como completada
                onChange={() => toggleComplete(task.id)} // cambia el estado de la tarea a completada o no
              />
              <span className={task.completada ? 'completada' : ''}>
                {task.actividad}
              </span>
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
        </ul>
      </div>

      <div>
        <h3>Agregar tareas:</h3>
        <input
         type="text"
          placeholder='Nueva tarea'
          value={newTask} // valor del input
          onChange={(e) => setNewTask(e.target.value)}  // actualiza el estado de la nueva tarea
          onKeyPress={(e) => e.key === 'Enter' && addTask()} // permite agregar la tarea al presionar Enter
           /> 
        <button onClick={addTask}>Agregar</button> 
      </div>
    </>
  )
}

export default App