import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario si es necesario
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', // Referencia al modelo de producto
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  // Otros campos relacionados con el carrito pueden ser agregados aquí
});

cartSchema.pre('find', function(){
  this.populate('products.product');
})

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;