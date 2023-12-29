import { Router } from "express";
import ProductManager from "../dao/managersDB/ProductManager.js";

const router = Router()
const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const allProductsResult = await manager.getProducts();
        
        // Asegúrate de que docs es un array antes de asignarlo
        const allProducts = Array.isArray(allProductsResult.msg.docs) ? allProductsResult.msg.docs : [];
        
        res.render("products", { products: allProducts });
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error.message);
        res.status(500).render('error', { error: 'Error al obtener la lista de productos' });
    }
});


export default router;