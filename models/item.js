import { Schema, model } from 'mongoose'

const itemSchema = new Schema(
	{
		name: String,
	},
	{
		timestamps: true,
		versionkey: false
	}
)

const Item = model('Item', itemSchema)
export default Item

