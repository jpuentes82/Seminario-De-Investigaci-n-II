import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";


export const ChartGanancias1 = ({tipo,inversion,gananciaNeta,rentabilidadUnidad}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            datasets: [
                {
                    data: [ gananciaNeta,inversion,rentabilidadUnidad],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--blue-500')
                        

                    ],
                    label:gananciaNeta,inversion,rentabilidadUnidad
                }
            ],
            labels: ['ganancia', 'Costos','rentabilidad']
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
        // eslint-disable-next-line
    }, [inversion]);

    return (
        <div className="card flex justify-content-center">
            <Chart type={tipo} data={chartData} options={chartOptions}  />
        </div>
    )
}
         