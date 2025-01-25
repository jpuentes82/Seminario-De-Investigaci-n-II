const { pool } = require("../db");

// Insertar un producto con el campo 'id_marca'
exports.setProduct = async (req, res) => {
  try {
    const { nombre, compra, venta, cantidad, unidad_medida, marca } = req.body;

    // Validación de datos requeridos, incluyendo 'id_marca'
    console.log(req.body);
    console.log(nombre, venta, cantidad, unidad_medida, marca);
    if (!nombre || !compra || !venta || !cantidad || !unidad_medida || !marca) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    console.log("entro");
    const [rows1] = await pool.query(
      "INSERT INTO Marca (nombre_marca) VALUES (?)",
      [marca]
    );
    console.log(rows1.insertId);
    // Insertar el producto en la base de datos con la marca
    const [rows] = await pool.query(
      "INSERT INTO Producto (nombre_producto, cantidad_inicial, precio_compra, precio_venta, unidad_medida, marca_id) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, cantidad, compra, venta, unidad_medida, rows1.insertId]
    );

    res.status(201).json({
      id: rows.insertId,
      nombre,
      compra,
      venta,
      cantidad,
      unidad_medida,
      marca,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al insertar el producto: " + error.message });
  }
};

// Actualizar un producto con 'id_marca'
exports.fetchProduct = async (req, res) => {
  try {
    const { idFromLabelProduct } = req.params;
    const { nombre, compra, venta, cantidad, marca } = req.body;

    // Validación de parámetros
    if (!idFromLabelProduct) {
      return res.status(400).json({ message: "El ID del producto es requerido" });
    }

    // Actualizar el producto, incluyendo la marca si se proporciona
    const [result1] = await pool.query(
      "UPDATE Producto SET nombre_producto = IFNULL(?, nombre_producto), precio_compra = IFNULL(?, precio_compra), precio_venta = IFNULL(?, precio_venta), id_marca = IFNULL(?, id_marca) WHERE id_producto = ?",
      [nombre, compra, venta, marca, idFromLabelProduct]
    );

    // Insertar movimiento de stock si se especifica la cantidad
    if (cantidad) {
      await pool.query(
        "INSERT INTO StockMovimiento (product_id, quantity_stock, date_of_movement, movement_type) VALUES (?, ?, NOW(), 'entrada')",
        [idFromLabelProduct, cantidad]
      );
    }

    if (result1.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Obtener el producto actualizado
    const [rows] = await pool.query(
      "SELECT * FROM StockMovimiento INNER JOIN Producto ON StockMovimiento.product_id = Producto.id_producto WHERE product_id = ?",
      [idFromLabelProduct]
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el producto: " + error.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const { idborrar } = req.params;

    if (!idborrar) {
      return res.status(400).json({ message: "El ID del producto es requerido" });
    }

    const [rows] = await pool.query("DELETE FROM Producto WHERE id_producto = ?", [idborrar]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.send("Producto eliminado");
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el producto: " + error.message });
  }
};

// Obtener un producto por ID, incluyendo la marca
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "El ID del producto es requerido" });
    }

    // Consulta del producto junto con la marca
    const [rows] = await pool.query(
      "SELECT Producto.*, Marca.nombre_marca FROM Producto LEFT JOIN Marca ON Producto.id_marca = Marca.id_marca WHERE id_producto = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto: " + error.message });
  }
};

// Obtener todos los productos, incluyendo la marca
exports.getIdProducts = async (req, res) => {
  try {
    // Consulta de todos los productos junto con sus marcas
    const [rows] = await pool.query(
      "SELECT * FROM Producto INNER JOIN Marca ON id_marca = marca_id"
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los productos: " + error.message });
  }
};
