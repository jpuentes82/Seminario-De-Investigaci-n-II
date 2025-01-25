import React from 'react'
import { BarraNav } from '../Componentes/BarraNav'
import { Lateral } from "../Componentes/Lateral";
import { BuscarItem } from '../Componentes/BuscarItem';


export const ConsultarPage = () => {
  return (
    <div>
        {/**Navegation*/}
        <BarraNav/>
        <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <BuscarItem/>
      </div>
    </div>
  )
}
