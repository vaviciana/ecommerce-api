const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const manager = new ProductManager();

// GET /api/products/
router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.json(products);
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await manager.getProductById(id);
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

// POST /api/products/
router.post('/', async (req, res) => {
    const newProduct = await manager.addProduct(req.body);
    res.status(201).json(newProduct);
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const updated = await manager.updateProduct(id, req.body);
    updated ? res.json(updated) : res.status(404).json({ error: 'Producto no encontrado' });
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    await manager.deleteProduct(id);
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;
