import Fastify from 'fastify'
import itemRoutes from './routes/items.js'
const fastify = Fastify({ logger: true })

fastify.register(itemRoutes)

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