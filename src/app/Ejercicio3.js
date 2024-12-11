"use client"; // Asegúrate de añadir esta línea si estás usando Next.js

import React, { useReducer, useState } from 'react';

// Estado inicial
const initialState = [];

// Reducer para manejar el estado de las tareas
const reducer = (state, action) => {
  switch (action.type) {
    case 'AÑADIR_TAREA':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'MARCAR_COMPLETADA':
      return state.map(tarea =>
        tarea.id === action.payload ? { ...tarea, completed: !tarea.completed } : tarea
      );
    case 'ELIMINAR_TAREA':
      return state.filter(tarea => tarea.id !== action.payload);
    default:
      return state;
  }
};

export default function ListaDeTareas () {
  const [tareas, dispatch] = useReducer(reducer, initialState);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const handleAgregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      dispatch({ type: 'AÑADIR_TAREA', payload: nuevaTarea });
      setNuevaTarea('');
    }
  };

  const handleMarcarCompletada = (id) => {
    dispatch({ type: 'MARCAR_COMPLETADA', payload: id });
  };

  const handleEliminarTarea = (id) => {
    dispatch({ type: 'ELIMINAR_TAREA', payload: id });
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <button onClick={handleAgregarTarea}>Agregar Tarea</button>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id} style={{ textDecoration: tarea.completed ? 'line-through' : 'none' }}>
            {tarea.text}
            <button onClick={() => handleMarcarCompletada(tarea.id)}>
              {tarea.completed ? 'Desmarcar' : 'Completar'}
            </button>
            <button onClick={() => handleEliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};