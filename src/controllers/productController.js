import Product from '../models/Product';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

// Función para subir imagenes
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        fs.mkdir('./uploads/', (error) => {
            cb(null, './uploads/');
        })
    },

    filename: function(req, res, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

// Exportando función para subir imagenes
export const uploadImage = multer({ storage: storage }).single('image');

// Método para crear nuevo productos
export const createProduct = async (req, res) => {
    // Desctructurando datos del producto
    const { name, description, mark, image, stock_minimum, stock } = req.body;

    try {
        const newProduct = new Product({
            name, 
            description,
            mark,
            image: req.file,
            stock_minimum,
            stock
        });

        const savedProduct = await newProduct.save();

        if(savedProduct) {
            return res.status(200).json({
                message: 'El producto se guardo correctamente!',
                data: {
                    savedProduct
                }
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'El producto no se pudo guardar',
            data: null
        });
    }
};

// Método para obtener todos los productos creados
export const findAllProducts = async (req, res) => {
    // Buscar todos los productos registrados
    const products = await Product.find()
        .then(products => {
            if(products.length > 0) {
                return res.status(200).json({
                    message: 'Lista de todos los productos registrados!',
                    products
                });
            }
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({
                message: 'No se encontro ningun producto registrado',
                data: null
            });
        });
};

// Método para buscar productos por id
export const findProductById = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId)
        .then(product => {
            if(product) {
                return res.status(200).json({
                    message: `Producto encontrado con el id: ${productId}`,
                    product
                });
            }
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({
                message: `No se encontro ningun producto registrado con el id: ${productId}`,
                data: null
            });
        });
};

// Método pata editar producto por id
export const editProductById = async (req, res) => {
    const { id } = req.params;

    if(!req.body && req.body === null) {
        return res.status(400).json({
            message: 'No pudimos editar los datos del producto',
            data: null
        })
    }

    await Product.findById(id)
        .then(product => {
            return res.status(200).json({
                product
            })
        })
        .catch(error => {
            console.log(error);

            return res.status(500).json({
                message: 'No pudimos encontrar el producto',
                data: null
            })
        })
};

// Método para actualizar un producto por id
export const updateProductById = async (req, res) => {
    const { productId } = req.params;
    const { name, description, mark, image, stock_minimum, stock } = req.body;

    if(!req.body && req.body === null) {
        return res.status(400).json({
            message: 'No pudimos actualizar los datos correctamente',
            data: null
        });
    }

    await Product.findByIdAndUpdate(productId, {
        name,
        description,
        mark,
        image: req.file,
        stock_minimum,
        stock
    }, { new: true })
    .then(product => {
        if(product) {
            return res.status(200).json({
                message: `Se actualizo correctamente el producto con id: ${productId}`,
                product
            });
        }   
    })
    .catch(error => {
        console.error(error);

        return res.status(500).json({
            message: 'No se pudo actualizar correctamente el producto',
            data: null
        });
    });
};

// Método para eliminar producto por id
export const deleteProductById = async (req, res) => {
    const { productId } = req.params;

    await Product.findByIdAndRemove(productId)
        .then(product => {
            if(product) {
                return res.status(200).json({
                    message: `Se elimino correctamente el producto con id: ${productId}`,
                    product
                });
            }
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({
                message: 'Error al tratar de eliminar el producto',
                data: null
            });
        })
};

// Método para extraer el número de colleciones de los productos
export const countProducts = async (req, res) => {
    const productsCount = Product.find();

    productsCount.count(function(error, result) {
        if(error) {
            throw new Error('No se encontro ningun producto')
        }

        return res.status(200).json({
            result
        })
    })
};