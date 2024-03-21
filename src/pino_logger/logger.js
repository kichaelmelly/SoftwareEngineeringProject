import pino from "pino"

const pinoConfig = {
    browser: {
        asObject: true
    },
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
            colorize: false,
            destination: "./pino-logger.log"
        },
    }
}

const logger = pino(pinoConfig)

export const log = msg => logger.info(msg)

export default logger;
