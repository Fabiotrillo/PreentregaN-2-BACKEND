import productModel from "../db/models/products.model.js";


class ProductManager {
    // Obtener todos los productos paginados y filtrados
    getProducts = async (limit, page, sort, category, availability, query) => {

        if (page && (isNaN(page) || page <= 0)) {
            return {
                status: "error",
                msg: "Page not found"
            };
        }

        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (availability) {
            filter.stock = { $gt: 0 };
        }

        if (query) {
            filter.$or = [
                { title: { $regex: new RegExp(query, 'i') } },
            ];
        }

        const options = {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: { price: sort === "asc" ? 1 : -1},
            lean: true
        }

        const products = await productModel.paginate(filter, options);

    
        const queryParams = {
            limit,
            sort,
            category,
            availability,
            query
        };
        
        Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);
        
        const baseLink = '/products';
        
        let prevLink = null
        let nextLink = null
        
        if (products.hasPrevPage) {
            queryParams.page = products.prevPage;
            prevLink = `${baseLink}?${new URLSearchParams(queryParams).toString()}`;
        }
        
        if (products.hasNextPage) {
            queryParams.page = products.nextPage;
            nextLink = `${baseLink}?${new URLSearchParams(queryParams).toString()}`;
        }
        
        products.prevLink = prevLink
        products.nextLink = nextLink
        return {
            status: "success",
            msg: products
        }
    };
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

