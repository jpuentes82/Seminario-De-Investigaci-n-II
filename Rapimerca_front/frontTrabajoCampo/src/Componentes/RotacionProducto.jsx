import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { ChartRotacion1 } from "./chart/ChartRotacion1";
import { Button } from "primereact/button";
import axios from "axios";

export const RotacionProducto = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [date1, setdate1] = useState(null);
  const [date2, setdate2] = useState(null);
  const [data, setData] = useState(null);
  const [cantInicio, setCantInicio] = useState(0);
  const [cantFin, setCantFin] = useState(0);
  const [cantSell, setCantSell] = useState(0);
  const [rotacion, setRotacion] = useState(0);
  const URL = "https://back-trabajo-campo.vercel.app";
  //logica del negocio
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("login"));
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(URL+"/api/inventario/obtenerid", config)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function convertirFecha(fechaOriginal) {
    // Parsear la fecha en formato original
    var fecha = new Date(fechaOriginal);
    // Extraer año, mes y día
    var year = fecha.getFullYear().toString().slice(-2);
    var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
    var day = ("0" + fecha.getDate()).slice(-2);
    // Crear la cadena en el nuevo formato YY-MM-DD
    var fechaFormateada = year + "-" + month + "-" + day;

    return fechaFormateada;
  }

  const aceptFunction = () => {
    //alert(convertirFecha(date1)+" "+date2.toLocaleDateString("en-US",options)+" "+selectedProduct.id)
    axios
      .get(
        URL+`/api/estadisticas/rotacion/${
          selectedProduct.id_producto
        }/${convertirFecha(date1)}/${convertirFecha(date2)}`
      )
      .then((res) => {
        setCantInicio(res.data.inicio);
        setCantFin(res.data.fin);
        setCantSell(res.data.cantidad);
        setRotacion(res.data.rotacion);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenido">
      <div className="cajaRotacion">
        <h3>ROTACION</h3>
        <div className="contentRotacion">
          <div className="rotacionDivNav">
            <div className="contentNav">
              <Dropdown
                value={selectedProduct}
                onChange={(e) => setSelectProduct(e.value)}
                options={data}
                optionLabel="name_product"
                placeholder="seleccione el producto"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="contentNav">
              <Calendar
                className="calen"
                value={date1}
                onChange={(e) => setdate1(e.value)}
                showIcon
                placeholder="DESDE"
              />
            </div>
            <div className="contentNav">
              <Calendar
                className="calen"
                value={date2}
                onChange={(e) => setdate2(e.value)}
                showIcon
                placeholder="HASTA"
              />
            </div>
            <Button
              label="Aceptar"
              severity="success"
              onClick={() => aceptFunction()}
            />
          </div>
          <div className="boxInputRotacion">
            <div className="boxDato fechas">
              <div className="infoBox">
                <label>Existencias en el periodo de inicio</label>
                <p>{cantInicio}</p>
              </div>
              <span
                className="pi pi-calendar"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
            </div>
            <div className="boxDato fechas">
              <div className="infoBox">
                <label>Existencias en el fin del periodo</label>
                <p>{cantFin}</p>
              </div>
              <span
                className="pi pi-calendar"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
            </div>
            <div className={cantSell < 1 ? "boxDato dataBad" : "boxDato cantidad"}>
              <div className="infoBox">
                <label>Cantidad vendida</label>
                <p>{cantSell}</p>
              </div>

              <span
                className="pi pi-calculator"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
            </div>
            <div className={rotacion < 1 ? "boxDato dataBad" : "boxDato rotacionGod"} >
              <div className="infoBox">
                <label>Rotacion</label>
                <p>{rotacion}</p>
              </div>

              <span
                className="pi pi-sort-alt"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
            </div>
            <div className="boxChart">
              <ChartRotacion1 tipo="bar" cantInicio={cantInicio} cantFin={cantFin} date1={date1} date2={date2}/> 
            </div>
            <div className="boxChart">
              <ChartRotacion1 tipo="line" cantInicio={cantInicio} cantFin={cantFin} date1={date1} date2={date2}/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
