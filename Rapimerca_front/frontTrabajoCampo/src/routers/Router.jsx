import React from "react";
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Agregar } from "../pages/Agregar";
import Login from "../Componentes/Login";
import { ModificarPage } from "../pages/ModificarPage";
import { Error404 } from "../pages/Error404";
import { EliminarPage } from "../pages/EliminarPage";
import { ConsultarPage } from "../pages/ConsultarPage";
import { RotacionPage } from "../pages/RotacionPage";
import { GananciasPage } from "../pages/GananciasPage";
import { GenerarPage } from "../pages/GenerarPage";
import { VisualizarPage } from "../pages/VisualizarPage";

export const Router = () => {
  // eslint-disable-next-line
  const token = JSON.parse(localStorage.getItem("login"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/agregar" element={<Agregar/>} />
        <Route path="/modificar" element={<ModificarPage/>} />
        <Route path="/eliminar" element={<EliminarPage/>} />
        <Route path="/consultar" element={<ConsultarPage/>} />
        <Route path="/rotacion" element={<RotacionPage/>} />
        <Route path="/ganancias" element={<GananciasPage/>}/>
        <Route path="/generarFactura" element={ <GenerarPage/>}/>
        <Route path="/visualizarFactura" element={<VisualizarPage/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  );
};
