import React from 'react'; // Importation de React
import tick from '../assets/tick.png'; // Importation de l'image tick pour les tâches complétées
import not_tick from '../assets/not_tick.png'; // Importation de l'image not_tick pour les tâches non complétées
import delete_icon from '../assets/delete.png'; // Importation de l'image delete pour la suppression des tâches
import PropTypes from 'prop-types'; // Importation de PropTypes pour la validation des types de propriétés

// Composant TodoItems pour représenter chaque élément de la liste des tâches
const TodoItems = ({ text, id, isCompleted, deleteTask, toggle }) => { // Déstructuration des propriétés passées au composant
  return ( // Rendu du composant
    <div className='flex items-center my-3 gap-2'> {/* Conteneur principal de l'élément de la liste */}
      <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer'> {/* Section gauche avec l'état de complétion et le texte de la tâche */}
        <img src={isCompleted ? tick : not_tick} alt="" className='w-7'/> {/* Image pour indiquer si la tâche est complétée ou non */}
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isCompleted ? "line-through" : ""}`}> {/* Texte de la tâche, avec un style barré si la tâche est complétée */}
          {text} {/* Affichage du texte de la tâche */}
        </p>
      </div>
      <img onClick={() => deleteTask(id)} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/> {/* Icône de suppression de la tâche */}
    </div>
  );
};

// Validation des types de propriétés pour le composant TodoItems
TodoItems.propTypes = {
  text: PropTypes.string.isRequired, // Le texte de la tâche doit être une chaîne de caractères et est requis
  id: PropTypes.number.isRequired, // L'identifiant de la tâche doit être un nombre et est requis
  isCompleted: PropTypes.bool.isRequired, // L'état de complétion de la tâche doit être un booléen et est requis
  deleteTask: PropTypes.func.isRequired, // La fonction deleteTask doit être une fonction et est requise
  toggle: PropTypes.func.isRequired, // La fonction toggle doit être une fonction et est requise
};

export default TodoItems; // Exportation du composant TodoItems comme exportation par défaut
