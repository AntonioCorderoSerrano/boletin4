import React, { useReducer } from 'react';

const initialState = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'DECREMENTAR':
      return state - 1;
    case 'REINICIAR':
      return initialState;
    default:
      return state;
  }
};

export default function Contador () {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Contador: {state}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>Incrementar</button>
      <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>Decrementar</button>
      <button onClick={() => dispatch({ type: 'REINICIAR' })}>Reiniciar</button>
    </div>
  );
};