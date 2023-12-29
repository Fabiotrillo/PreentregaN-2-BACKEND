import productModel from "../db/models/products.model.js";


class ProductManager {
    // Obtener todos los productos paginados y filtrados
    getProducts = async (options) => {

        try {
           

            const products = await productModel.paginate({}, {...options, lean: true});
            return {
                status: "Success",
                msg: products
            };
        } catch (error) {
            console.error('Error al intentar obtener productos:', error.message);
            return {
                status: "Error",
                msg: error.message,
            };
        }
    }

    // Obtener un producto por ID
    getProductByID = async (pid) => {
        try {
            const product = await productModel.findOne({ _id: pid });
            return {
                status: "Success",
                msg: product,
            };
        } catch (error) {
            console.error('Error al intentar obtener un producto por ID:', error.message);
            return {
                status: "Error",
                msg: error.message,
            };
        }
    }

    // Crear un nuevo producto
    createProduct = async (title, description, price, code, stock, category, thumbnail) => {
        try {
            const newProduct = await productModel.create({
                title,
                description,
                price,
                code,
                stock,
                category,
                thumbnail,
            });

            return {
                status: "Success",
                msg: newProduct,
            };
        } catch (error) {
            console.error('Error al intentar crear un producto:', error.message);
            return {
                status: "Error",
                msg: error.message,
            };
        }
    }

    // Eliminar un producto por ID
    deleteProductByID = async (id) => {
        try {
            await productModel.findByIdAndDelete(id);
            return {
                status: "Success",
                msg: `Producto con ID ${id} eliminado correctamente.`,
            };
        } catch (error) {
            console.error('Error al intentar eliminar un producto por ID:', error.message);
            return {
                status: "Error",
                msg: error.message,
            };
        }
    }

    // Actualizar un producto por ID
    upgradeProduct = async ({ id, ...productData }) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, productData, { new: true });
            return {
                status: "Success",
                msg: updatedProduct,
            };
        } catch (error) {
            console.error('Error al intentar actualizar un producto por ID:', error.message);
            return {
                status: "Error",
                msg: error.message,
            };
        }
    }
}

export default ProductManager;

