import items from '../items.js'
import { v4 as uuidv4 } from 'uuid'


export const getItems = (req, reply) => {
	reply.send(items)
}

export const getItem = (req, reply) => {
	const { id } = req.params
	const item = items.find(it => it.id === id) || {}
	reply.send(item)
}

export const deleteItem = (req, reply) => {
	const { id } = req.params
	const count = items.length
	items = items.filter(it => it.id != id)
	reply.send({ deleted: count !== items.length })
}

export const addItem = (req, reply) => {
	const { name } = req.body
	const item = {
		name,
		id: uuidv4()
	}
	items = [...items, item]
	reply.code(201).send(item)
}

export const updateItem = (req, reply) => {
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
