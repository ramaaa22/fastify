import Fastify from 'fastify'
import itemRoutes from './routes/items.js'
import productRoutes from './routes/products.js'
const fastify = Fastify({ logger: true })
import { connection } from './utils/mongose.js'

fastify.register(itemRoutes)
fastify.register(productRoutes)

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