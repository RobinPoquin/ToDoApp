import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'; // Importation des hooks React nécessaires
import todo_icon from '../assets/todo_icon.png'; // Importation de l'icône todo
import TodoItems from './TodoItems'; // Importation du composant TodoItems
import PropTypes from 'prop-types'; // Importation de PropTypes pour la validation des types de propriétés

// Composant principal Todo
const Todo = () => {

  const inputRef = useRef(); // Utilisation du hook useRef pour créer une référence vers l'élément input
  const [todoList, setTodoList] = useState(() => { // Utilisation du hook useState pour gérer la liste des tâches
    const savedTodos = localStorage.getItem("todos"); // Récupération des tâches sauvegardées dans le localStorage
    return savedTodos ? JSON.parse(savedTodos) : []; // Initialisation de l'état avec les tâches du localStorage ou une liste vide
  });

  const addTask = useCallback(() => { // Utilisation de useCallback pour mémoriser la fonction addTask
    const inputText = inputRef.current.value.trim(); // Récupération du texte de l'input et suppression des espaces
    if (inputText === "") return; // Si l'input est vide, on ne fait rien

    const newTodo = { // Création d'une nouvelle tâche
      id: Date.now(), // Utilisation de la date actuelle comme identifiant unique
      text: inputText, // Texte de la tâche
      isCompleted: false, // La tâche n'est pas complétée par défaut
    };

    setTodoList((prev) => [...prev, newTodo]); // Ajout de la nouvelle tâche à la liste des tâches
    inputRef.current.value = ""; // Réinitialisation de l'input
  }, []);

  const deleteTask = useCallback((id) => { // Utilisation de useCallback pour mémoriser la fonction deleteTask
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id)); // Suppression de la tâche avec l'identifiant correspondant
  }, []);

  const toggle = useCallback((id) => { // Utilisation de useCallback pour mémoriser la fonction toggle
    setTodoList((prevTodos) => prevTodos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo // Basculement de l'état de complétion de la tâche
    ));
  }, []);

  useEffect(() => { // Utilisation de useEffect pour sauvegarder les tâches dans le localStorage à chaque modification de la liste des tâches
    localStorage.setItem("todos", JSON.stringify(todoList)); // Sauvegarde de la liste des tâches dans le localStorage
  }, [todoList]); // Dépendance sur todoList

  return ( // Rendu du composant
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <Header /> {/* Inclusion du composant Header */}
      <InputBox inputRef={inputRef} addTask={addTask} /> {/* Inclusion du composant InputBox avec les propriétés inputRef et addTask */}
      <TodoList todoList={todoList} deleteTask={deleteTask} toggle={toggle} /> {/* Inclusion du composant TodoList avec les propriétés todoList, deleteTask et toggle */}
    </div>
  );
};

const Header = () => ( // Composant Header pour l'affichage du titre
  <div className='flex items-center mt-7 gap-2'>
    <img className='w-8' src={todo_icon} alt="Todo Icon" /> {/* Affichage de l'icône todo */}
    <h1 className='text-3xl font-semibold'>To-Do List</h1> {/* Affichage du titre */}
  </div>
);

const InputBox = ({ inputRef, addTask }) => ( // Composant InputBox pour l'entrée des nouvelles tâches
  <div className='flex items-center my-7 bg-gray-200 rounded-full'>
    <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Ajouter une tâche' /> {/* Champ de saisie */}
    <button onClick={addTask} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Ajouter +</button> {/* Bouton d'ajout */}
  </div>
);

InputBox.propTypes = { // Validation des types de propriétés pour InputBox
  inputRef: PropTypes.object.isRequired, // inputRef doit être un objet et est requis
  addTask: PropTypes.func.isRequired, // addTask doit être une fonction et est requise
};

const TodoList = ({ todoList, deleteTask, toggle }) => ( // Composant TodoList pour l'affichage de la liste des tâches
  <div>
    {todoList.map((item) => ( // Parcours de la liste des tâches et rendu du composant TodoItems pour chaque tâche
      <TodoItems 
        key={item.id} 
        text={item.text} 
        id={item.id} 
        isCompleted={item.isCompleted} 
        deleteTask={deleteTask}
        toggle={toggle} 
      />
    ))}
  </div>
);

TodoList.propTypes = { // Validation des types de propriétés pour TodoList
  todoList: PropTypes.arrayOf( // todoList doit être un tableau d'objets
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Chaque objet doit avoir une propriété id de type nombre et est requise
      text: PropTypes.string.isRequired, // Chaque objet doit avoir une propriété text de type string et est requise
      isCompleted: PropTypes.bool.isRequired, // Chaque objet doit avoir une propriété isCompleted de type booléen et est requise
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired, // deleteTask doit être une fonction et est requise
  toggle: PropTypes.func.isRequired, // toggle doit être une fonction et est requise
};

export default Todo; // Exportation du composant Todo comme exportation par défaut
