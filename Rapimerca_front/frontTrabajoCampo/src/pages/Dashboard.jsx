import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral";
import { Inicio } from '../Componentes/Inicio';

export const Dashboard = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <Inicio/>
      </div>


    </div>
  )
}
