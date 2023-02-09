import { getItem, getItems, updateItem, deleteItem, addItem, getTotal } from '../controllers/items.js'

const ItemSchema = {
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' },
		price: { type: 'integer' }
	}
}

const getItemsOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: ItemSchema
			}
		}
	},
	handler: getItems
}


const getTotalOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					total: { type: 'integer' }
				}
			}
		}
	},
	handler: getTotal
}

const getItemOptions = {
	schema: {
		response: {
			200: ItemSchema
		}
	},
	handler: getItem
}

const postItemOptions = {
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: { type: 'string' }
			}
		},
		response: {
			201: ItemSchema
		}
	},
	handler: addItem
}

const deleteItemOptions = {
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
	handler: deleteItem
}

const updateItemOptions = {
	schema: {
		body: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				price: { type: 'integer' }
			}
		},
		response: {
			200: ItemSchema
		}
	},
	handler: updateItem
}

export default function itemRoutes(fastify, options, done) {
	fastify.get('/items', getItemsOptions)

	fastify.get('/items/:id', getItemOptions)

	fastify.get('/items/total', getTotalOptions)

	fastify.post('/items', postItemOptions)

	fastify.delete('/items/:id', deleteItemOptions)

	fastify.put('/items/:id', updateItemOptions)

	done()
}

