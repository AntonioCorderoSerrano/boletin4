import React, { useReducer, useState } from 'react';

const initialState = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@gmail.com' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@gmail.com' },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'AÑADIR_USUARIO':
      return [...state, { ...action.payload, id: Date.now() }];
    case 'ACTUALIZAR_USUARIO':
      return state.map(usuario =>
        usuario.id === action.payload.id ? { ...usuario, ...action.payload.data } : usuario
      );
    case 'ELIMINAR_USUARIO':
      return state.filter(usuario => usuario.id !== action.payload);
    case 'RESETEAR':
      return initialState;
    default:
      return state;
  }
};

export default function ManejoListaUsuarios () {
  const [usuarios, dispatch] = useReducer(reducer, initialState);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '' });
  const [usuarioActualizado, setUsuarioActualizado] = useState({ id: '', nombre: '', email: '' });

  const handleAgregarUsuario = () => {
    if (nuevoUsuario.nombre && nuevoUsuario.email) {
      dispatch({ type: 'AÑADIR_USUARIO', payload: nuevoUsuario });
      setNuevoUsuario({ nombre: '', email: '' });
    }
  };

  const handleActualizarUsuario = () => {
    if (usuarioActualizado.id && usuarioActualizado.nombre && usuarioActualizado.email) {
      dispatch({ type: 'ACTUALIZAR_USUARIO', payload: { id: usuarioActualizado.id, data: usuarioActualizado } });
      setUsuarioActualizado({ id: '', nombre: '', email: '' });
    }
  };

  const handleEliminarUsuario = (id) => {
    dispatch({ type: 'ELIMINAR_USUARIO', payload: id });
  };

  const handleResetearLista = () => {
    dispatch({ type: 'RESETEAR' });
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>

      <h2>Añadir Usuario</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoUsuario.nombre}
        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={nuevoUsuario.email}
        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
      />
      <button onClick={handleAgregarUsuario}>Agregar Usuario</button>

      <h2>Actualizar Usuario</h2>
      <input
        type="text"
        placeholder="ID del Usuario"
        value={usuarioActualizado.id}
        onChange={(e) => setUsuarioActualizado({ ...usuarioActualizado, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nuevo Nombre"
        value={usuarioActualizado.nombre}
        onChange={(e) => setUsuarioActualizado({ ...usuarioActualizado, nombre: e.target.value })}
      />
      <input
        type="email"
        placeholder="Nuevo Email"
        value={usuarioActualizado.email}
        onChange={(e) => setUsuarioActualizado({ ...usuarioActualizado, email: e.target.value })}
      />
      <button onClick={handleActualizarUsuario}>Actualizar Usuario</button>

      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.email}
            <button onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button onClick={handleResetearLista}>Resetear Lista</button>
    </div>
  );
};