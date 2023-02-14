import { Schema, model, mongoose } from 'mongoose'

const itemSchema = new Schema(
	{
		name: String,
		price: Number,
		product: { type: mongoose.Types.ObjectId, ref: "Product" }
	},
	{
		timestamps: true,
		versionkey: false
	}
)

const Item = model('Item', itemSchema)
export default Item

