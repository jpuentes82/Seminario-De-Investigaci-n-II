import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import axios from "axios";
import { Message } from 'primereact/message';

export const GenerarFactura = () => {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [montoPagado, setMontoPagado] = useState(0);
  const [cambio, setCambio] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const URL = "https://back-trabajo-campo.vercel.app";
  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // Ocultar el mensaje después de 3 segundos
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("login"));
    const config = {
      headers:{
          Authorization: token
      }
    }
    axios.get(URL+'/api/ventas/getproductos', config)
    .then((res) => {
      setSource(res.data);
    })
    .catch((error) => {
      alert(error);
    });
  }, []);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);

    const selectedItemsTotal = event.target.reduce(
      (acc, item) => acc + item.selling_price * (quantities[item.id_producto] || 1),
      0
    );
    setTotal(selectedItemsTotal);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Imprimir el itemId y newQuantity en la consola
    console.log("Item ID:", itemId);
    console.log("New Quantity:", newQuantity);
  
    setQuantities((prevQuantities) => {
      // Aquí prevQuantities es la versión más reciente del estado
      const updatedQuantities = {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
  
      // Imprimir el objeto quantities actualizado en la consola
      console.log("Quantities:", updatedQuantities);
      console.log(quantities)
      return updatedQuantities; 
      
      // Devuelve el nuevo estado
    });
  };
  useEffect(() => {
    // Calcular el nuevo total basado en quantities
    const selectedItemsTotal = target.reduce(
      (acc, item) => acc + item.selling_price * (quantities[item.id_producto] || 1),
      0
    );
  
    // Actualizar el estado de total
    setTotal(selectedItemsTotal);
  }, [quantities, target]);
 

  const simularPago = ()=>{
    
    const ventas = target.map((item) => ({
      product_id: item.id_producto,
      quantity_sell: quantities[item.id_producto] || 0, // Aquí obtén la cantidad del objeto quantities
      selling_price: item.selling_price,
    }));
    axios.post(URL+`/api/ventas/addventa`,ventas).then((res) => {
        
        showMessageAlert();
       
      }).catch((error)=>alert("cantidad insuficiente de producto"+error));
  }

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name_product}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>comestibles</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.selling_price}</span>
        <InputNumber
          value={quantities[item.id_producto] || 0}
          onValueChange={(e) => handleQuantityChange(item.id_producto, e.value)}
          mode="decimal"
          showButtons
          min={0}
          max={100}
        />
      </div>
    );
  };
  

  return (
    <div className="content">
      <div className="cajaTablaVista">
        <h3>Generar Factura</h3>
        {showMessage && (
              <Message
                severity="success"
                summary='Success'
                text="Venta Generada"
                
                onClose={() => setShowMessage(false)}
              />
            )}
        <div className="contentVistaFactura">
          <div className="card">
            <PickList
              source={source}
              target={target}
              onChange={onChange}
              itemTemplate={itemTemplate}
              filter
              filterBy="name_product"
              breakpoint="1400px"
              sourceHeader="Available"
              targetHeader="Selected"
              sourceStyle={{ height: "30rem" }}
              targetStyle={{ height: "30rem" }}
              sourceFilterPlaceholder="Search by name"
              targetFilterPlaceholder="Search by name"
            />
          </div>
        </div>
        <div className="ImputsGenerar">
          <div className="inputWrapper">
            <label style={{ fontWeight: "bold" }}>Pago:</label>
            <InputNumber
  value={montoPagado}
  onValueChange={(e) => {
    setMontoPagado(e.value);
    // Calcular el cambio en tiempo real
    const cambioCalculado = e.value - total;
    setCambio(cambioCalculado);
  }}
  mode="decimal"
  showButtons
  min={0}
 // Ajusta este valor según tus necesidades
  placeholder="Monto pagado"
/>
            <label style={{ fontWeight: "bold" }}> Total: ${total}</label>
            <label style={{ fontWeight: "bold" }}>Cambio: ${cambio}</label>
          </div>
          <Button label="Pagar" severity="success" onClick={()=>simularPago()}/>
        </div>
      </div>
    </div>
  );
};