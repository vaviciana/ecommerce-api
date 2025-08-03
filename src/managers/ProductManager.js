const fs = require('fs').promises;
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

class ProductManager {
    async getProducts() {
        const data = await fs.readFile(productsPath, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    async addProduct(productData) {
        const products = await this.getProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
        id: newId,
        status: true,
        thumbnails: [],
        ...productData
        };

        products.push(newProduct);
        await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updateData) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        products[index] = {
        ...products[index],
        ...updateData,
        id: products[index].id // aseguramos que el id no cambie
        };

        await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filtered = products.filter(p => p.id !== id);
        await fs.writeFile(productsPath, JSON.stringify(filtered, null, 2));
    }
}

module.exports = ProductManager;
