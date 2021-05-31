import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },

    description: {
        type: String
    },

    mark: {
        type: String,
        required: [true, 'El módelo del producto es obligatorio']
    },

    image: {
        type: String
    },

    stock_minimum: {
        type: Number,
        required: [true, 'El stock minimo es obligatorio']
    },

    stock: {
        type: Number,
        required: [true, 'El stock del producto es obligatorio']
    }
});

export default model('Product', productSchema);