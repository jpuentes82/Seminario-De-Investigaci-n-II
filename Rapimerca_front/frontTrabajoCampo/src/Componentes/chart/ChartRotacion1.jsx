import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export const ChartRotacion1 = ({tipo,cantInicio, cantFin, date1, date2}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const data = {
      labels: [convertirFecha(date1), convertirFecha(date2)],
      datasets: [
        {
          label: "cantidad en stock",
          data: [cantInicio,cantFin],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
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
  }, [cantFin]);

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
  );
};
