import { NODE_ENV } from '../config/server.config.js'
import fs from 'fs/promises'

import winston from 'winston'

// const levels = {
//     fatal: 0,
//     error: 1,
//     warning: 2,
//     info: 3,
//     debug: 4,
// }

const winstonLoggerDev = winston.createLogger({
  // levels,
  transports: [
    new winston.transports.Console({
      level: "debug"
    }),new winston.transports.File({
      level: "debug",
      filename: 'events.log'
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
})

const winstonLoggerProd = winston.createLogger({
  // levels
  transports: [
    new winston.transports.File({
      level: "info",
      filename: 'events.log'
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
})

export let winstonLogger
fs.writeFile('events.log', '')
fs.writeFile('error.log', '')
if (NODE_ENV === 'production') {
  winstonLogger = winstonLoggerProd
} else {
  winstonLogger = winstonLoggerDev
}