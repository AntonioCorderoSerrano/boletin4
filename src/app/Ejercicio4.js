import React, { useReducer, useState } from 'react';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_PRODUCTO':
      return [...state, { ...action.payload, quantity: 1 }];
    case 'INCREMENTAR_CANTIDAD':
      return state.map(producto =>
        producto.id === action.payload ? { ...producto, quantity: producto.quantity + 1 } : producto
      );
    case 'DECREMENTAR_CANTIDAD':
      return state.map(producto =>
        producto.id === action.payload
          ? { ...producto, quantity: Math.max(1, producto.quantity - 1) }
          : producto
      );
    case 'ELIMINAR_PRODUCTO':
      return state.filter(producto => producto.id !== action.payload);
    default:
      return state;
  }
};

export default function CarritoDeCompras () {
  const [carrito, dispatch] = useReducer(reducer, initialState);
  const [nuevoProducto, setNuevoProducto] = useState({ id: '', name: '', price: '' });

  const handleAgregarProducto = () => {
    if (nuevoProducto.id && nuevoProducto.name && nuevoProducto.price) {
      dispatch({ type: 'AGREGAR_PRODUCTO', payload: nuevoProducto });
      setNuevoProducto({ id: '', name: '', price: '' });
    }
  };

  const handleIncrementarCantidad = (id) => {
    dispatch({ type: 'INCREMENTAR_CANTIDAD', payload: id });
  };

  const handleDecrementarCantidad = (id) => {
    dispatch({ type: 'DECREMENTAR_CANTIDAD', payload: id });
  };

  const handleEliminarProducto = (id) => {
    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: id });
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <input
        type="text"
        placeholder="ID del producto"
        value={nuevoProducto.id}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nuevoProducto.name}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio del producto"
        value={nuevoProducto.price}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
      />
      <button onClick={handleAgregarProducto}>Agregar Producto</button>

      <ul>
        {carrito.map(producto => (
          <li key={producto.id}>
            {producto.name} - ${producto.price} x {producto.quantity}
            <button onClick={() => handleIncrementarCantidad(producto.id)}>+</button>
            <button onClick={() => handleDecrementarCantidad(producto.id)}>-</button>
            <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Total: ${carrito.reduce((total, producto) => total + producto.price * producto.quantity, 0).toFixed(2)}</h2>
    </div>
  );
};