import express from 'express';
import __dirname from './utils.js';
import { ProductRouter } from './routes/products.router.js';
import { CartRouter } from './routes/carts.router.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import mongoose from 'mongoose';




const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO = "mongodb+srv://fabiotrillo:Eskakaroto10@cluster0.da2dilu.mongodb.net/Ecommerce";
const connection = mongoose.connect(MONGO);

const main = ()=>{
    const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    
}

app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/public"));

//app.use("/", viewsRouter);
app.use("/", viewsRouter)
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);



main();




