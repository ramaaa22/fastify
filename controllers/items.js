import Item from '../models/item.js'

const existsItem = async (name) => {
	const item = await Item.findOne({ name })
	return item
}

export const getItems = async (req, reply) => {
	const items = await Item.find().populate('product', 'name')
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
	const data = req.body
	if (await existsItem(data.name)) {
		reply.code(500).send({})
		return
	}
	if (!data.price) {
		data.price = 0
	}
	const item = new Item(data);
	item.save(function (err) {
		if (err) return handleError(err);
	});
	reply.code(201).send(item)
}

export const updateItem = async (req, reply) => {
	const { id } = req.params
	const data = req.body
	let item

	try {
		item = await Item.findByIdAndUpdate(id, data, { new: true })
	} catch (error) {
		item = {}
		console.error(error)
	}

	reply.send(item)

}

export const getTotal = async (req, reply) => {
	const items = await Item.find()
	let total = 0
	items.map(it => total += it.price)
	reply.send({ total })
}
