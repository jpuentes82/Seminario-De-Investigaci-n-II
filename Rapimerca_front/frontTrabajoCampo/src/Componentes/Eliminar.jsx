import React, { useState,useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import axios from 'axios';
import { Message } from 'primereact/message';


export const Eliminar = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data,setData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const URL = "http://localhost:4000";
  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // Ocultar el mensaje después de 3 segundos
  };
  
  const funcionBorrar= () => {    
    const idborrar= parseInt(document.getElementById("idborr").innerText);

    axios.delete(URL+`/api/inventario/eliminar/${idborrar}`)
      .then((res) => {
        showMessageAlert(); 
      }).catch((error)=>console.error(error));
  };

  useEffect(()=>{ 
    axios.get(URL+'/api/inventario/obtenerid').then((res)=>{
      setData(res.data)
    }).catch((error)=>console.log(error))
},[]);


  const renderLabel = () => {
    if (selectedProduct !== null) {
      return (selectedProduct);
    } else {
      return (
        <label>No se ha seleccionado ningún producto</label>
      );
    }
    
  };
 
  return (
    <div className='content'>
        <div className='Modificar'>
          <h3>ELIMINAR</h3>
          < div className='boxBorrar'>
         <label>ID: </label>
         <Dropdown value={selectedProduct} onChange={(e) => setSelectProduct(e.value)} options={data} optionLabel="nombre_producto" 
                placeholder="seleccione el producto" className="w-full md:w-14rem" />
          </div> 
          {showMessage && (
              <Message
                severity="error"
                text="Eliminado"
                
                onClose={() => setShowMessage(false)}
              />
            )}
          <div className="boxInput">
          <div className="inputAdd">
            <label>ID: </label>
            <label id="idborr">{renderLabel().id_producto}</label>
            
          </div>
          <div className="inputAdd">
          
            <label>Nombre:</label>
            <label>{renderLabel().nombre_producto}</label>
          </div>
          
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label> Compra: </label>
            <label>{renderLabel().precio_compra}</label>
            
          </div>
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label> Venta: </label>
            <label>{renderLabel().precio_venta}</label>
          </div>
          
          
    <div className="imputBor">
            <Button label="Borrar" severity="danger"  onClick={()=>funcionBorrar()}/>
      </div>
      </div>
    </div>
    
    </div>
  )
}
