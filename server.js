'use strict'
import { connection } from './utils/mongose.js'
import server from './app.js'
const ser = server({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty'
        }
    }
})


ser.listen({ port: 5000 }, (err, address) => {
    if (err) {
        ser.log.error(err)
        process.exit(1)
    }
})