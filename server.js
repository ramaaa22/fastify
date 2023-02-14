import Fastify from 'fastify'
import itemRoutes from './routes/items.js'
import productRoutes from './routes/products.js'
const fastify = Fastify({ logger: true })
import { connection } from './utils/mongose.js'
import cors from '@fastify/cors'

fastify.register(itemRoutes)
fastify.register(productRoutes)
await fastify.register(cors, {
    origin: true
})

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