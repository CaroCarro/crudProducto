const express = require('express');
require('dotenv').config();

//Creamos el servidor
const app = express();
//Exposición del backend
const cors = require('cors');
app.use(cors());

//Capturamos el body de las peticiones
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configurar la conexión con Mongo Atlas
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zzx05.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority `;
const option = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(uri, option)
.then(() => console.log("Base de datos conectada correctamente."))//Si se conecta satisfactoriamente....
.catch((e) => console.log("Error en la conexion: " + e));//Si hay algun problema. Cogemos el error "e"

//Importemos las rutas
const {product_routes} = require('./routes');

//Uso de las rutas
app.use('/api/v1/product', product_routes);//Esta se hace aquí, en la parte grande del servidor. Va la función que acabamos de crear

//Nuestro servidor debe estar escuchando
app.listen(process.env.PORT, () => {console.log("Servidor a su servicio en el puerto " + process.env.PORT)});