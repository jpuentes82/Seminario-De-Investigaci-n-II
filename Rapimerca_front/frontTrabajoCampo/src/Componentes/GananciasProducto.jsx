import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from 'axios';
import { ChartGanancias } from "./chart/ChartGanancias";
import { ChartGanancias1 } from "./chart/ChartGanancias1";


        


export const GananciasProducto = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [date1,setdate1] = useState(null);
  const [date2,setdate2] = useState(null);
  const [data, setData] = useState(null);
  const [rentabilidadUnidad, setRentabilidadUnidad] = useState(0);
  const [gananciaNeta, setGananciaNeta] = useState(0);
  const [inversion, setInversion] = useState(0);
  const [fechaMayor, setFechaMayor] = useState('0000-00-00');
  const URL = "http://localhost:4000";

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

  const  aceptFunction = ()=>{
    //alert(convertirFecha(date1)+" "+date2.toLocaleDateString("en-US",options)+" "+selectedProduct.id)
    axios.get(URL+`/api/estadisticas/ganancia/${selectedProduct.id_producto}/${convertirFecha(date1)}/${convertirFecha(date2)}`)
    .then((res)=>{

      setRentabilidadUnidad(res.data.rentabilidadUnidad)
      setGananciaNeta(res.data.gananciaNeta)
      setInversion(res.data.inversion)
      setFechaMayor(res.data.fechaMayor)
    })
    
    .catch(error=>console.log(error))
  };
  return (
    <div className="contenido">
      <div className="cajaRotacion">
        <h3>GANANCIAS</h3>
        <div className="contentRotacion">
          <div className="gananciasDivNav">
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
            <label>Fecha de mayor venta</label>
              <p>{fechaMayor}</p>
            
            </div>
            <span
                className="pi pi-calendar"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
              </div>
           
            <div className="boxDato fechas">
            <div className="infoBox">
            <label>Ganancia Neta</label>
              <p>{gananciaNeta}</p>
            </div>
            <span
                className="pi pi-dollar"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
               </div>
            <div className="boxDato fechas">
            <div className="infoBox">
            <label>Inversion</label>
              <p>{inversion}</p>
            </div>
            <span
                className="pi pi-calculator"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
               </div>
            
            <div className="boxChart" id="bigChart">
              <ChartGanancias1 tipo='polarArea' inversion={inversion} gananciaNeta={gananciaNeta} rentabilidadUnidad={rentabilidadUnidad}/>
            </div>
            <div className="boxChart">
              <ChartGanancias tipo='bar' inversion={inversion} gananciaNeta={gananciaNeta}  date1={date1} date2={date2}/>
            </div>
            <div className="boxDato fechas">
            <div className="infoBox">
            <label>Rentabilidad Por Unidad</label>
              <p>{rentabilidadUnidad}</p>
            </div>
            <span
                className="pi pi-dollar"
                style={{ fontSize: "30px", color: "white" }}
              ></span>
               </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
