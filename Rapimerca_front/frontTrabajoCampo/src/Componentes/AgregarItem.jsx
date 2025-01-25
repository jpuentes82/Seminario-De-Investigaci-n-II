import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";

export const AgregarItem = () => {
  const [name, setName] = useState("");
  const [compra, setCompra] = useState("");
  const [venta, setVenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [marca, setMarca] = useState("");
  const [value, setValue] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [productosAgregados, setProductosAgregados] = useState([]); // Inicializado como array vacío

  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const unidades = [
    { label: "Libra", value: "libra" },
    { label: "Kilo", value: "kilo" },
    { label: "Gramo", value: "gramo" },
    { label: "Unidad", value: "unidad" },
    { label: "Litro", value: "litro" },
  ];

  const validarCampos = () => {
    if (!name || !compra || !venta || !cantidad || !unidad || !marca) {
      alert("Por favor, complete todos los campos antes de enviar.");
      return false;
    }
    return true;
  };

  const aceptFunction = () => {
    if (!validarCampos()) {
      return;
    }

    const producto = {
      nombre: name,
      cantidad: Number(cantidad),
      compra: Number(compra),
      venta: Number(venta),
      unidad_medida: unidad,
      marca: marca,
    };
    
    const URL = "http://localhost:4000"
    axios
      .post(URL+"/api/inventario/ingreso", producto)
      .then((res) => {
        showMessageAlert();
        // Agregar el nuevo producto al array existente
        setProductosAgregados(prevProductos => [...prevProductos, producto]);
        
        // Limpiar los campos después de agregar
        setName("");
        setCompra("");
        setVenta("");
        setCantidad("");
        setUnidad("");
        setMarca("");
      })
      .catch((error) => console.log("falta login" + error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card flex justify-content-center">
        <InputText value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h3 className="text-2xl font-bold">AGREGAR PRODUCTO</h3>
        </div>
        <div className="p-6">
          {showMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p className="font-bold">Éxito</p>
              <p>Producto agregado exitosamente</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
                Marca
              </label>
              <input
                id="marca"
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="compra">
                Precio de Compra
              </label>
              <input
                id="compra"
                type="number"
                value={compra}
                onChange={(e) => setCompra(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venta">
                Precio de Venta
              </label>
              <input
                id="venta"
                type="number"
                value={venta}
                onChange={(e) => setVenta(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                Cantidad
              </label>
              <input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad">
                Unidad de Medida
              </label>
              <select
                id="unidad"
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-150 ease-in-out"
              >
                <option value="">Selecciona una unidad</option>
                {unidades.map((unidad) => (
                  <option key={unidad.value} value={unidad.value}>
                    {unidad.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={aceptFunction}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Agregar Producto
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 py-3 px-6 border-b">
          <h4 className="text-lg font-semibold">Últimos productos agregados</h4>
        </div>
        <ul className="divide-y divide-gray-200">
          {productosAgregados.map((producto, index) => (
            <li key={index} className="py-4 px-6 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {producto.nombre}
                  </p>
                  <p className="text-sm text-gray-500">
                    {producto.cantidad} {producto.unidad_medida} - Marca: {producto.marca}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  ${producto.venta}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};