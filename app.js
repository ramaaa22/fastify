import Fastify from 'fastify'
// const fastify = Fastify({ logger: true })
import itemRoutes from './routes/items.js'
import productRoutes from './routes/products.js'


export default function build(opts = {}) {
    const app = Fastify(opts)
    app.register(itemRoutes)
    app.register(productRoutes)

    return app
}

