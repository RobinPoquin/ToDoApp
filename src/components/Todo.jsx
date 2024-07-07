import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

// Composant principal Todo
const Todo = () => {

  // Référence pour accéder directement à l'élément input
  const inputRef = useRef();
  
  // État pour stocker la liste des tâches, initialisé avec les tâches du localStorage si elles existent
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

  // Fonction pour ajouter une nouvelle tâche
  const addTask = () => {
    // Récupère le texte de l'input et retire les espaces en début et fin
    const inputText = inputRef.current.value.trim();

    // Vérifie si l'input est vide, si oui, ne fait rien
    if (inputText === "") {
      return null;
    }

    // Crée une nouvelle tâche avec un id unique, le texte de l'input, et une propriété de complétion
    const newTodo = {
      id: Date.now(), // Utilise la date actuelle comme identifiant unique
      text: inputText, // Texte de la tâche
      isCompleted: false, // Par défaut, la tâche n'est pas complétée
    }

    // Ajoute la nouvelle tâche à la liste des tâches
    setTodoList((prev) => [...prev, newTodo]);
    // Réinitialise l'input
    inputRef.current.value = "";
  }

  // Fonction pour supprimer une tâche par id
  const deleteTask = (id) => {
    setTodoList((prevTodo) => {
      // Filtre la liste des tâches pour enlever celle avec l'id correspondant
      return prevTodo.filter((todo) => todo.id !== id);
    });
  }

  // Fonction pour basculer l'état de complétion d'une tâche par id
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      // Parcourt la liste des tâches et modifie la propriété isCompleted de la tâche avec l'id correspondant
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted }; // Inverse l'état de complétion
        }
        return todo;
      });
    });
  }

  // Utilisation de useEffect pour mettre à jour le localStorage à chaque modification de la liste des tâches
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList)); // Sauvegarde la liste des tâches dans le localStorage
  }, [todoList]);

  // Rendu du composant
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

      {/*---------- Titre --------- */}
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="Todo Icon" />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      {/*---------- Input Box --------- */}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Ajouter une tâche' />
        <button onClick={addTask} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Ajouter +</button>
      </div>

      {/*---------- To Do List --------- */}
      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems 
              key={index} 
              text={item.text} 
              id={item.id} 
              isCompleted={item.isCompleted} 
              deleteTask={deleteTask}
              toggle={toggle} 
            />
          );
        })}
      </div>

    </div>
  )
}

export default Todo
