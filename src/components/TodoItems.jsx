import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

// Composant TodoItems pour représenter chaque élément de la liste des tâches
const TodoItems = ({text, id, isCompleted, deleteTask, toggle}) => {
  return (
    // Conteneur principal de l'élément de la liste
    <div onClick={()=>{toggle(id)}} className='flex items-center my-3 gap-2'>
        {/* Section gauche avec l'état de complétion et le texte de la tâche */}
        <div className='flex flex-1 items-center cursor-pointer'>
            {/* Image pour indiquer si la tâche est complétée ou non */}
            <img src={isCompleted ? tick : not_tick} alt="" className='w-7'/>
            {/* Texte de la tâche, avec un style barré si la tâche est complétée */}
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500
                          ${isCompleted ? "line-through" : ""}`}>
                {text}
            </p>
        </div>

        {/* Icône de suppression de la tâche */}
        <img onClick={() => {deleteTask(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
    </div>
  )
}

export default TodoItems
