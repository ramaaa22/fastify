const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/items'))

const PORT = 5000

const start = async () => {
    try {
        const options = {
            port: PORT
        }
        await fastify.listen(options)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()