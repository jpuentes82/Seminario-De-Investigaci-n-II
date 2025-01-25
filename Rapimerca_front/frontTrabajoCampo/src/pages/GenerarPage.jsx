import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral"
import { GenerarFactura } from '../Componentes/GenerarFactura'

export const GenerarPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <GenerarFactura/>
      </div>
    </div>
  )
}
