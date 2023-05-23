import { smsManager } from "../dao/DB/messages.manager.js";


export async function postMessages(req, res, next) {
  const mensaje = req.body;
  const result = await smsManager.guardar(mensaje);
  res.json(result);
}
