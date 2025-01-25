import React from "react";
import { BarraNav } from '../Componentes/BarraNav';
import { Lateral } from "../Componentes/Lateral";
import { AgregarItem } from "../Componentes/AgregarItem";

export const Agregar = () => {
  return (
    <div>
      {/**Navegation*/}
      <BarraNav />
      <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <AgregarItem />
      </div>
    </div>
  );
};
