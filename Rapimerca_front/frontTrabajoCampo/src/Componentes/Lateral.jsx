import React from "react";
import { NavLink } from "react-router-dom";

export const Lateral = () => {
  return (
    <aside className="lateral">
      <div className="box-button">
        <h3>INVENTARIO</h3>
        <ul>
          <li>
            <NavLink
              to={"/agregar"}
              className={({ isActive }) =>
                isActive === true ? "active" : "inactive"
              }
            >
              <span className="pi pi-plus" />
              Agregar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/modificar"}
              className={({ isActive }) =>
                isActive === true ? "active" : "link"
              }
            >
              <span className="pi pi-pencil" />
              Modificar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/eliminar"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              <span className="pi pi-trash" />
              Eliminar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/consultar"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              <span className="pi pi-search" />
              Consultar
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="box-button">
        <h3>ESTADISTICAS</h3>
        <ul>
          <li>
            <NavLink
              to={"/rotacion"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              <span className="pi pi-chart-bar" />
              Rotacion
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/ganancias"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              <span className="pi pi-wallet" />
              Ganancias
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="box-button ventas">
        <h3>VENTAS</h3>
        <ul>
          <li>
            <NavLink
              to={"/generarFactura"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              <span className="pi pi-file" />
              Generar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/visualizarFactura"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              <span className="pi pi-eye" />
              Visualizar
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
