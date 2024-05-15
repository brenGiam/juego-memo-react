import React from "react";
import ArregloCartas from "@/componentes/arreglocartas.jsx"
import "@/estilos/globals.css"

export default function InicioPagina() {

  return (
    <div className="contenedor-principal">
      <div className="contenedor-cartas">
        <ArregloCartas />
      </div>
    </div>
  );
}
