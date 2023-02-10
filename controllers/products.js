import Product from '../models/product.js'
import Item from '../models/item.js'


export const addProduct = async (req, reply) => {
	const { name, item: itemId } = req.body

	const item = await Item.findById(itemId)
	const data = {
		name,
		item
	}
	const product = new Product(data);
	product.save(function (err) {
		if (err) return handleError(err);
	});
	reply.code(201).send(product)
}


export const getProducts = async (req, reply) => {
	const products = await Product
		.find()
		.populate('item', 'name')
	console.log(products)
	reply.send(products)
}