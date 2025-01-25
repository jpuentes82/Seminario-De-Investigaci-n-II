import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export const VistaTabla = ({products,setProducts}) => {
    const [totalValueSold, setTotalValueSold] = useState(0);
    const URL = "http://localhost:4000";

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("login"));
        const config = {
            headers:{
                Authorization: token
            }
          };
        axios.get(URL+'/api/ventas/visualizar', config)
    .then((res) => {
      setProducts(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
    // eslint-disable-next-line
  }, []);
      

    // Calcular la sumatoria total de la columna "value_sold"
    useEffect(() => {
        const total = products.reduce((acc, item) => acc + item.value_sold, 0);
        setTotalValueSold(total);
    }, [products]);

    return (
        <div className="cardTableView">
            <DataTable value={products} tableStyle={{ minWidth: '40rem' }}>
                <Column field="id_invoice" header="Id Factura"></Column>
                <Column field="name_product" header="producto"></Column>
                <Column field="date_of_sell" header="fecha de venta"></Column>
                <Column field='selling_price' header="precio base"></Column>
                <Column field='quantity_sell' header='cantidad'></Column>
                <Column field="value_sold" header="valor de venta"></Column>
            </DataTable>
            <label >Total: {totalValueSold.toLocaleString('es-ES')}</label>
        </div>
    );
}