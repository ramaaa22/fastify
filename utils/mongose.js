import mongoose, { mongo } from "mongoose"

export const connection = mongoose
    .connect('mongodb://localhost/fastifycrud')
    .then(() => console.log('Mongo Db connected'))
    .catch(err => console.log(err))