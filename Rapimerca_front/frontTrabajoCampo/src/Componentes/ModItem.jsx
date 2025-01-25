import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import axios from 'axios';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Message } from 'primereact/message';

export const ModItem = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [compra, setCompra] = useState(null);
  const [venta, setVenta] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const URL = "http://localhost:4000";

  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // Ocultar el mensaje después de 5 segundos
  };

  const actualizarFuncion = () => {
    if (!nombre || compra === null || venta === null || cantidad === null) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return;
    }

    const producto = {
      nombre: nombre,
      cantidad: cantidad,
      compra: compra,
      venta: venta,
    };

    const idFromLabelProduct = selectedProduct.id_producto; // Obtenemos el ID del producto seleccionado
    axios
      .patch(`${URL}/api/inventario/actualizar/${idFromLabelProduct}`, producto)
      .then((res) => {
        showMessageAlert();
        // Puedes agregar lógica adicional aquí si es necesario, como limpiar los campos
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
        alert("Ocurrió un error al actualizar el producto. Intenta nuevamente.");
      });
  };

  useEffect(() => {
    // Obtener la lista de productos
    axios.get(`${URL}/api/inventario/obtenerid`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  useEffect(() => {
    // Cuando se selecciona un producto, actualizar los campos de entrada
    if (selectedProduct) {
      setNombre(selectedProduct.nombre_producto);
      setCompra(selectedProduct.precio_compra);
      setVenta(selectedProduct.precio_venta);
      setCantidad(0); // Inicializa la cantidad como cero al seleccionar un producto
    }
  }, [selectedProduct]);

  return (
    <div className="content">
      <div className="Modificar">
        <h3>Modificar Producto</h3>
        {showMessage && (
          <Message
            severity="info"
            text="Producto actualizado exitosamente."
            onClose={() => setShowMessage(false)}
          />
        )}
        <div className="boxBorrar">
          <label>ID</label>
          <Dropdown
            value={selectedProduct}
            onChange={(e) => setSelectProduct(e.value)}
            options={data}
            optionLabel="nombre_producto"
            placeholder="Seleccione el producto"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="boxInput">
          <div className="inputAdd">
            <label>ID:</label>
            <label id="idLabel">{selectedProduct ? selectedProduct.id_producto : ""}</label>
          </div>
          <div className="inputAdd">
            <label>Nombre</label>
            <InputText
              type="text"
              value={nombre}
              className="p-inputtext-sm"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label>Compra: </label>
            <InputNumber
              inputId="integeronly"
              value={compra}
              onChange={(e) => setCompra(e.value)}
            />
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label>Venta: </label>
            <InputNumber
              inputId="integeronly"
              value={venta}
              onChange={(e) => setVenta(e.value)}
            />
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber
              inputId="integeronly"
              value={cantidad}
              placeholder="Cantidad de entrada"
              onChange={(e) => setCantidad(e.value)}
            />
          </div>
          <div className="inputAdd button">
            <Button label="Actualizar" severity="info" onClick={actualizarFuncion} />
          </div>
        </div>
      </div>
    </div>

    
  );
};
