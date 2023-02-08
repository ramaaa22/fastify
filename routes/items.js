const itemsController = require('../controllers/items')

const ItemSchema = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		name: { type: 'string' }
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
	handler: itemsController.getItems
}


const getItemOptions = {
	schema: {
		response: {
			200: ItemSchema
		}
	},
	handler: itemsController.getItem
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
	handler: itemsController.addItem
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
	handler: itemsController.deleteItem
}

const updateItemOptions = {
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: { type: 'string' }
			}
		},
		response: {
			200: ItemSchema
		}
	},
	handler: itemsController.updateItem
}

function itemRoutes(fastify, options, done) {
	fastify.get('/items', getItemsOptions)

	fastify.get('/items/:id', getItemOptions)

	fastify.post('/items', postItemOptions)

	fastify.delete('/items/:id', deleteItemOptions)

	fastify.put('/items/:id', updateItemOptions)

	done()
}

module.exports = itemRoutes