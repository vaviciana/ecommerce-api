const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const manager = new CartManager();

// POST /api/carts → crear nuevo carrito
router.post('/', async (req, res) => {
    const cart = await manager.createCart();
    res.status(201).json(cart);
});

// GET /api/carts/:cid → productos del carrito
router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await manager.getCartById(cid);
    cart ? res.json(cart.products) : res.status(404).json({ error: 'Carrito no encontrado' });
});

// POST /api/carts/:cid/product/:pid → agregar producto
router.post('/:cid/product/:pid', async (req, res) => {
    console.log('🧪 Llamada recibida en POST /:cid/product/:pid');
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updated = await manager.addProductToCart(cid, pid);
    updated ? res.json(updated) : res.status(404).json({ error: 'Carrito no encontrado' });
});

module.exports = router;

