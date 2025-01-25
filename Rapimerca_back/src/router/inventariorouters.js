const { Router } = require("express");
const { getProduct, getIdProducts, setProduct, fetchProduct, deleteProduct } = require("../controllers/inventariocontrollers");



const router = Router();
//consultar
router.get("/consultar/:id",getProduct);
//obtener ID
router.get("/obtenerid",getIdProducts);
//ingresar producto
router.post("/ingreso",setProduct);
//actualizar producto
router.patch("/actualizar/:idFromLabelProduct",fetchProduct);
//eliminar
router.delete("/eliminar/:idborrar",deleteProduct)

module.exports = router