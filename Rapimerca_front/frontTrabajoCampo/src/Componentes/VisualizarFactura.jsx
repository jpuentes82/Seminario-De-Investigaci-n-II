import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { VistaTabla } from "./Tables/VistaTabla";
import axios from "axios";

export const VisualizarFactura = () => {
  const [factura, setFactura] = useState(0);
  const [products, setProducts] = useState([]);
  const URL = "https://back-trabajo-campo.vercel.app";

  const searchFactura = () => {
    if (factura == null) {
      const token = JSON.parse(localStorage.getItem("login"));
      const config = {
        headers: {
          Authorization: token,
        },
      };
      console.log(token)
      axios
        .get(URL+"/api/ventas/visualizar", config)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      // eslint-disable-next-line
    } else {
      const token = JSON.parse(localStorage.getItem("login"));
      const config = {
        headers: {
          Authorization: token,
        },
      };
      axios
        .get(URL+`/api/ventas/visualizar/${factura}`, config)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="contenido">
      <div className="cajaTablaVista">
        <h3>VISUALIZAR FACTURA</h3>
        <div className="contentVistaFactura">
          <div className="vistaVentasDivNav">
            <InputNumber
              inputId="integeronly"
              placeholder="# Factura"
              onValueChange={(e) => setFactura(e.value)}
            />
            <Button label="Buscar" onClick={() => searchFactura()} />
          </div>
          <div className="boxTableView">
            <VistaTabla products={products} setProducts={setProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};
