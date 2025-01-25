import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";


export const ChartGanancias = ({tipo,inversion,gananciaNeta,date1, date2}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
      const concatenatedDate ="inicio: "+ convertirFecha(date1) + " | " +
       " fin: "+convertirFecha(date2);
      const data = {
        labels: [concatenatedDate],
        datasets: [
          {
            label: "inversion",
            data: [inversion],
            
            backgroundColor: ["rgba(255, 0, 0, 0.2)"],// Color verde con opacidad
          borderColor: ["rgb(255, 0, 0))"], 
         
          },
          {
            label: "ganancia",
            data: [gananciaNeta],
            
            backgroundColor: ["rgba(0, 255, 0, 0.2)"], // Color rojo con opacidad
          borderColor: ["rgb(0, 255, 0)"], 
         
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
  
      setChartData(data);
      setChartOptions(options);
      // eslint-disable-next-line
    }, [inversion]);
  
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

  return (
    <div className="cardChart">
    <Chart type={tipo} data={chartData} options={chartOptions} />
  </div>
  )
}
