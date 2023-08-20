import userModel from "../daos/user.dao.mongoose.js";
import { userRepository } from "../repositories/user.repository.js";
import { winstonLogger as logger } from "../utils/logger.js";

class userService {
  constructor() {
    this.userDB = userModel
  }

  async delete() {
    const users = await userRepository.readMany()
    for (const user of users) {
      const fechaGuardadaString = user.last_connection;
      const partes = fechaGuardadaString.match(/(\w+), (\d+) de (\w+) de (\d+), (\d+):(\d+):(\d+)/);
      const [, diaSemana, dia, mes, anio, hora, minuto, segundo] = partes;
      const nombresMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const numeroMes = nombresMeses.findIndex(nombreMes => nombreMes === mes.toLowerCase()) + 1;
      const fechaConvertida = new Date(anio, numeroMes - 1, dia, hora, minuto, segundo);
      const fechaActual = new Date();
      const tiempoTranscurrido = fechaActual - fechaConvertida;
      const tiempoEnDias = tiempoTranscurrido / (1000 * 60 * 60 * 24);
      if (tiempoEnDias > 2) {
        logger.info(`Usuario ${user.first_name} eliminado al tener ${Math.round(tiempoEnDias)} dias sin conexion`)
        await userRepository.deleteOne({ idUser: user.idUser })
      }
    }
  }
}

export const usersService = new userService()