import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral"
import { RotacionProducto } from '../Componentes/RotacionProducto'

export const RotacionPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <RotacionProducto/>
      </div>
    </div>
  )
}
