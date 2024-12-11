import React, { useReducer, useState } from 'react';

const initialState = {
  usuarios: [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@gmail.com' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@gmail.com' },
    { id: 3, nombre: 'Luis Martínez', email: 'luis@gmail.com' },
  ],
  filtro: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CAMBIAR_FILTRO':
      return { ...state, filtro: action.payload };
    default:
      return state;
  }
};

export default function FiltroUsuarios () {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFiltroChange = (e) => {
    dispatch({ type: 'CAMBIAR_FILTRO', payload: e.target.value });
  };

  const usuariosFiltrados = state.usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(state.filtro.toLowerCase()) ||
    usuario.email.toLowerCase().includes(state.filtro.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={state.filtro}
        onChange={handleFiltroChange}
      />
      <ul>
        {usuariosFiltrados.map(usuario => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};