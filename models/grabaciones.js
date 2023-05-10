import { Schema, model, models } from "mongoose";

const GrabacionesSchema = new Schema({
  "Fecha de emisión": String,
  Hora: String,
  "Referencia audio": String,
  Audio: String,
  Duración: String,
  RUC: String,
  Advertiser: String,
  Orden: String,
  Estación: String,
  Canal: String,
  "Nombre del canal": String,
  RVC3: String,
  "Tipo de aviso": String,
  "Descripción del producto": String,
  Material: String,
  "RUC agencia": String,
  Agencia: String,
});

const Grabaciones =
  models.Grabaciones || model("Grabaciones", GrabacionesSchema);

export default Grabaciones;
