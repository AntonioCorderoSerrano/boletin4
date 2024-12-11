'use client'
import Contador from "./Ejercicio1";
import Formulario from "./Ejercicio2";
import ListaDeTareas from "./Ejercicio3";
import CarritoDeCompras from "./Ejercicio4";
import FiltroUsuarios from "./Ejercicio5";
import ManejoListaUsuarios from "./Ejercicio6";

export default function Home() {
  return (
    <div>
      <h1>Ejercicio 1</h1>
      <Contador></Contador>
      <br />
      <h1>Ejercicio 2</h1>
      <Formulario></Formulario>
      <br />
      <h1>Ejercicio 3</h1>
      <ListaDeTareas></ListaDeTareas>
      <br />
      <h1>Ejercicio 4</h1>
      <CarritoDeCompras></CarritoDeCompras>
      <br />
      <h1>Ejercicio 5</h1>
      <FiltroUsuarios></FiltroUsuarios>
      <br />
      <h1>Ejercicio 6</h1>
      <ManejoListaUsuarios></ManejoListaUsuarios>
    </div>
  );
}
