let items = require('../Items')
const { v4: uuidv4 } = require('uuid')


const getItems = (req, reply) => {
	reply.send(items)
}

const getItem = (req, reply) => {
	const { id } = req.params
	const item = items.find(it => it.id === id) || {}
	reply.send(item)
}

const deleteItem = (req, reply) => {
	const { id } = req.params
	const count = items.length
	items = items.filter(it => it.id != id)
	reply.send({ deleted: count !== items.length })
}

const addItem = (req, reply) => {
	const { name } = req.body
	const item = {
		name,
		id: uuidv4()
	}
	items = [...items, item]
	reply.code(201).send(item)
}

const updateItem = (req, reply) => {
	console.log('here')
	const { id } = req.params
	const { name } = req.body
	let item = items.find(it => it.id === id)
	console.log('item', item)
	item = { ...item, name }
	console.log('item', item)
	console.log(items)
	items = items.filter(it => it.id !== id)
	items = [...items, item]
	reply.send(item)

}

module.exports = {
	addItem,
	deleteItem,
	getItem,
	getItems,
	updateItem
}