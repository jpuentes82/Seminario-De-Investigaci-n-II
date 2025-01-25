import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral"
import { VisualizarFactura } from '../Componentes/VisualizarFactura'

export const VisualizarPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <VisualizarFactura/>
      </div>
    </div>
  )
}
