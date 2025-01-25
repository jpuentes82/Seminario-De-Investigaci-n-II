import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral";
import { Eliminar } from '../Componentes/Eliminar';

export const EliminarPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <Eliminar/>
      </div>
    </div>
  )
}
