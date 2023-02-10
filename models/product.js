import { Schema, model, mongoose } from 'mongoose'

const productSchema = new Schema(
    {
        name: String,
        item: { type: mongoose.Types.ObjectId, ref: "Item" }
    },
    {
        timestamps: true,
        versionkey: false
    }
)

const Product = model('Product', productSchema)
export default Product

