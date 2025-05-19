import 'dotenv/config';
import express from 'express';
import rutas from './interfaces/rutas/empresas.routes';
import { conexionDB } from './infrastructura/db/mongodb';
import 'reflect-metadata';
const app = express();
const puerto = process.env.PORT;
app.use(express.json());

app.use(rutas);
conexionDB().then(() => {
    app.listen(puerto, () => {
        console.log(`Servidor corriendo en http://localhost:${puerto}`);
    });
}).catch((error) => {
    console.log("Error ", error)
})


