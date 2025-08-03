const fs = require('fs').promises;
const path = require('path');

const cartsPath = path.join(__dirname, '../data/carts.json');

class CartManager {
    async getCarts() {
        const data = await fs.readFile(cartsPath, 'utf-8');
        return JSON.parse(data);
    }

    async createCart() {
        const carts = await this.getCarts();
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

        const newCart = {
        id: newId,
        products: []
        };

        carts.push(newCart);
        await fs.writeFile(cartsPath, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === id);
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cid);
        if (!cart) return null;

        const existingProduct = cart.products.find(p => p.product === pid);
        if (existingProduct) {
        existingProduct.quantity += 1;
        } else {
        cart.products.push({ product: pid, quantity: 1 });
        }

        await fs.writeFile(cartsPath, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;
