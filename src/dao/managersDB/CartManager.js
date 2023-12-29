import cartModel from "../db/models/carts.model.js";
import productModel from "../db/models/products.model.js";


class CartManager {

    getCarts = async () => {
        const carts = await cartModel.find();
        return carts;
    }

    getCartByID = async (cid) => {
        const cart = await cartModel.find({_id:cid})
        return cart;
    }

    newCart = async () =>{
        const cart = {
            user,
            products,
            total
          };
      
          const result = await cartModel.create(cart);
    }
    addProductInCart = async (cid, pid, quantity = 1) => {
        const cart = await cartModel.findOne({_id:cid})
        if(!cart){
            return {
                status:error,
                msg:`El carrito con el id ${cid} no existe`
            }
        };

        const product = await productModel.findOne({_id:pid});

        if(!product){
            return {
                status:"error",
                msg: `El producto con el id ${pid} no existe`
            }
        };

        let productsinCart = cart.product;

        const indexProduct = productsinCart.findIndex((product)=>product.product==pid);
        if(indexProduct == -1){
        const newProduct ={
            product: pid,
            quantity :quantity
        }
        productsinCart.push(newProduct);
        }else{
            productsinCart[indexProduct].quantity + quantity;
        }
        await cart.save();
        return {
            status:"Success",
            msg: `El producto agregado correctamente`
        }

    }}
    //removeProductFromCart = async (cid,pid)=>
export default CartManager;