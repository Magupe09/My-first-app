import { useState,useEffect } from "react";

function App() {
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareas, setTareas] = useState([])
  
  // Eliminar todas las tareas
  const eliminarTodasLasTareas=()=>{
    setTareas([]);
    localStorage.removeItem("tareas")

  }


   // Cargar tareas almacenadas en localStorage al iniciar la app
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasGuardadas);
  }, []);

  // Guardar tareas en localStorage cuando haya cambios
  useEffect(() => {
    if (tareas.length === 0){
      localStorage.removeItem("tareas")
    }else{
     localStorage.setItem("tareas", JSON.stringify(tareas));
    }
  }, [tareas]);
  
    // Eliminar una tarea específica

  const eliminarTarea = (index) => {
    const nuevasTareas= tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };
   
   // Marcar o desmarcar tarea como completada
  const marcarComoHecha=(index)=>{
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  }

  // Manejar el cambio en el input de nueva tarea

  const handleInputChange = (e) => {
    setNuevaTarea(e.target.value);    
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if(nuevaTarea.trim() === "") return console.log("Por favor ingrese una tarea");
    setTareas([...tareas,{ texto: nuevaTarea, completada: false }])
  
    setNuevaTarea("");
  
  };
  
  return (
    <div>
       <h1>My first React App</h1>
       <form onSubmit={handleSubmit}>
        <input  type="text" onChange={handleInputChange} placeholder="Agregue la tarea" value={nuevaTarea}/>
        <button type="submit" >Agregar Tarea</button>
        <ol>
          {tareas.map((tarea, index) => (
            <li key={index}
            style={{ textDecoration: tarea.completada ? "line-through" : "none" }}
            >{tarea.texto}
            <button onClick={() => marcarComoHecha(index)}>
              {tarea.completada ? "❌" : "✅"}
            </button>
            <button onClick={() => eliminarTarea(index)}>❌</button>
            </li>
          ))}
          
        </ol>
       </form>
       <button onClick={eliminarTodasLasTareas}>Eliminar Todas las Tareas</button>
    
    </div>
  )
}

export default App
