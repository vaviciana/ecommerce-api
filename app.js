const express = require('express');
const app = express();
const PORT = 8080;

console.log('📦 Cargando rutas...');
const productsRouter = require('./src/routes/products.routes');
const cartsRouter = require('./src/routes/carts.routes');
console.log('✅ Rutas cargadas');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

try {
  const cartsRouter = require('./src/routes/carts.routes');
  console.log('✅ Carts router cargado');
  app.use('/api/carts', cartsRouter);
} catch (err) {
  console.error('❌ Error cargando carts.routes:', err.message);
}
