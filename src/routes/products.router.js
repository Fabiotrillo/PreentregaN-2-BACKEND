import express from 'express';
import ProductManager from '../dao/managersDB/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

// Obtener todos los productos paginados y filtrados
router.get('/', async (req, res) => {
    const { limit, page, sort, category, price } = req.query;
    const options = {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort === "asc" ? 1 : -1 },
        lean: true,
    };

    const result = await productManager.getProducts(options);
    
    res.json(result);
   
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const result = await productManager.getProductByID(productId);
    res.json(result);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, price, code, stock, category, thumbnail } = req.body;
    const result = await productManager.createProduct(title, description, price, code, stock, category, thumbnail);
    res.json(result);
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const result = await productManager.deleteProductByID(productId);
    res.json(result);
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const result = await productManager.upgradeProduct({ id: productId, ...updatedProductData });
    res.json(result);
});

export default router;



export { router as ProductRouter }