import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral"
import { GananciasProducto } from '../Componentes/GananciasProducto'

export const GananciasPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <GananciasProducto/>
      </div>
    </div>
  )
}
