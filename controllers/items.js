import Item from '../models/item.js'

const existsItem = async (name) => {
	const item = await Item.findOne({ name })
	return item
}

export const getItems = async (req, reply) => {
	const items = await Item.find()
	reply.send(items)
}

export const getItem = async (req, reply) => {
	const { id } = req.params
	let item
	try {
		item = await Item.findById(id)
	} catch (error) {
		item = {}
	}
	reply.send(item)
}

export const deleteItem = async (req, reply) => {
	const { id } = req.params
	const item = await Item.deleteOne({ _id: id })
	reply.send({ deleted: Boolean(item.deletedCount) })
}

export const addItem = async (req, reply) => {
	const { name } = req.body
	if (await existsItem(name)) {
		reply.code(500).send({})
		return
	}

	const item = new Item({ name });
	item.save(function (err) {
		if (err) return handleError(err);
	});
	reply.code(201).send(item)
}

export const updateItem = async (req, reply) => {
	const { id } = req.params
	const { name } = req.body
	let item

	try {
		item = await Item.findByIdAndUpdate(id, { name })
	} catch (error) {
		item = {}
		console.error(error)
	}

	reply.send(item)

}
