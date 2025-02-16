import { useState } from "react";

function App() {
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareas, setTareas] = useState([])

  const handleInputChange = (e) => {
    setNuevaTarea(e.target.value);    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTareas([...tareas, nuevaTarea]);
    setNuevaTarea("");
   //console.log(nuevaTarea);
  };
  
  return (
    <div>
       <h1>My first React App</h1>
       <form onSubmit={handleSubmit}>
        <input  type="text" onChange={handleInputChange} placeholder="Agregue la tarea" value={nuevaTarea}/>
        <button type="submit" >Agregar Tarea</button>
        <ol>
          {tareas.map((tarea, index) => (
            <li key={index}>{tarea}</li>
          ))}
        </ol>
       </form>
    
    </div>
  )
}

export default App
