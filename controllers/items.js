import Item from '../models/item.js'

const existsItem = async (name) => {
	const item = await Item.findOne({ name })
	return item
}

export const getItems = async (req, reply) => {
	console.log('entro aca')
	try {
		const items = await Item.find().populate('product', 'name')
		reply.send(items)
	} catch (error) {
		console.log('aca')
		reply.send(error)
	}
}

export const getItem = async (req, reply) => {
	const { id } = req.params
	try {
		const item = await Item.findById(id) || {}
		reply.send(item)
	} catch (error) {
		reply.send(error)
	}

}

export const deleteItem = async (req, reply) => {
	const { id } = req.params
	let item = {}
	try {
		item = await Item.deleteOne({ _id: id })
	} catch (error) {
		reply.status(404).send(error)
	}
	reply.send({ deleted: Boolean(item.deletedCount) })
}

export const addItem = async (req, reply) => {
	const data = req.body
	if (await existsItem(data.name)) {
		const error = new Error('The name exists')
		return reply.code(500).send(error)
	}

	if (!data.price) {
		data.price = 0
	}

	const item = new Item(data);

	try {
		item.save()
	} catch (error) {
		return reply.code(400).send(error)
	}

	reply.code(201).send(item)
}

export const updateItem = async (req, reply) => {
	const { id } = req.params
	const data = req.body
	let item

	try {
		item = await Item.findByIdAndUpdate(id, data, { new: true })
	} catch (error) {
		return reply.send(error)
	}

	reply.send(item)

}

const test = () => {
	throw new Error('errorete')
}

export const getTotal = async (req, reply) => {
	let total = 0
	try {
		const items = await Item.find()
		items.map(it => total += it.price)
	} catch (error) {
		return reply.send(error)
	}

	reply.send({ total })
}
