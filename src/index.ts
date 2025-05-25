import "dotenv/config";
import express from "express";
import rutas from "./interfaces/rutas/empresas.routes";
import { conexionDB } from "./infrastructura/db/mongodb";
import "reflect-metadata";
import { configurarSwagger } from "./infrastructura/config/swagger";
const app = express();
const puerto = process.env.PORT || 8088;
app.use(express.json());
configurarSwagger(app);
app.use(rutas);
conexionDB()
  .then(() => {
    app.listen(puerto, () => {
      console.log(`Servidor corriendo en http://localhost:${puerto}`);
      console.log(
        `Documentación Swagger disponible en http://localhost:${puerto}/api-docs`
      );
    });
  })
  .catch((error) => {
    console.log("Error ", error);
  });
