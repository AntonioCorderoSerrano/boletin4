import React, { useReducer } from 'react';

const initialState = {
  nombre: '',
  email: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CAMBIAR_NOMBRE':
      return { ...state, nombre: action.payload };
    case 'CAMBIAR_EMAIL':
      return { ...state, email: action.payload };
    case 'RESETEAR':
      return initialState;
    default:
      return state;
  }
};

export default function Formulario () {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNombreChange = (e) => {
    dispatch({ type: 'CAMBIAR_NOMBRE', payload: e.target.value });
  };

  const handleEmailChange = (e) => {
    dispatch({ type: 'CAMBIAR_EMAIL', payload: e.target.value });
  };

  const handleReset = () => {
    dispatch({ type: 'RESETEAR' });
  };

  return (
    <div>
      <h1>Formulario</h1>
      <form>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              value={state.nombre}
              onChange={handleNombreChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={state.email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <button type="button" onClick={handleReset}>Resetear</button>
      </form>
      <h2>Valores actuales:</h2>
      <p>Nombre: {state.nombre}</p>
      <p>Email: {state.email}</p>
    </div>
  );
};