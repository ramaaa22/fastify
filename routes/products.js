import { addProduct, getProducts, deleteProduct } from '../controllers/products.js'

const ProductSchema = {
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' },
		item: {
			type: 'object',
			properties: {
				name: { type: 'string' }
			}
		}
	}
}

const getProductsOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: ProductSchema
			}
		}
	},
	handler: getProducts
}

const postProductOptions = {
	schema: {
		body: {
			type: 'object',
			required: ['name', 'item'],
			properties: {
				name: { type: 'string' },
				item: { type: 'string' }
			}
		},
		response: {
			201: ProductSchema
		}
	},
	handler: addProduct
}

const deleteProductOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					deleted: { type: 'boolean' }
				}
			}
		}
	},
	handler: deleteProduct
}



export default function productRoutes(fastify, options, done) {
	fastify.get('/products', getProductsOptions)

	fastify.post('/products', postProductOptions)

	fastify.delete('/products/:id', deleteProductOptions)


	done()
}

