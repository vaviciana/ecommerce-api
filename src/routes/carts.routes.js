const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const manager = new CartManager();

// POST /api/carts/ → crea un nuevo carrito
router.post('/', async (req, res) => {
    const cart = await manager.createCart();
    res.status(201).json(cart);
    });

    // GET /api/carts/:cid → devuelve los productos del carrito
    router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await manager.getCartById(cid);
    cart ? res.json(cart.products) : res.status(404).json({ error: 'Carrito no encontrado' });
    });

    // POST /api/carts/:cid/product/:pid → agrega producto al carrito
    router.post('/', async (req, res) => {
    console.log('🧪 Llamada recibida en POST /api/carts');
    const cart = await manager.createCart();
    res.status(201).json(cart);
});


module.exports = router;
