import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral";
import { ModItem } from '../Componentes/ModItem'
export const ModificarPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
          <ModItem/>
        </div>
    </div>
  )
}
