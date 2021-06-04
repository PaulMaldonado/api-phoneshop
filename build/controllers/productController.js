"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countProducts = exports.deleteProductById = exports.updateProductById = exports.editProductById = exports.findProductById = exports.findAllProducts = exports.createProduct = exports.uploadImage = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Función para subir imagenes
var storage = _multer.default.diskStorage({
  destination: function destination(req, res, cb) {
    _fs.default.mkdir('./uploads/', error => {
      cb(null, './uploads/');
    });
  },
  filename: function filename(req, res, cb) {
    cb(null, (0, _uuid.v4)() + _path.default.extname(file.originalname));
  }
}); // Exportando función para subir imagenes


var uploadImage = (0, _multer.default)({
  storage: storage
}).single('image'); // Método para crear nuevo productos

exports.uploadImage = uploadImage;

var createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    // Desctructurando datos del producto
    var {
      name,
      description,
      mark,
      image,
      stock_minimum,
      stock
    } = req.body;

    try {
      var newProduct = new _Product.default({
        name,
        description,
        mark,
        image: req.file,
        stock_minimum,
        stock
      });
      var savedProduct = yield newProduct.save();

      if (savedProduct) {
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
  });

  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Método para obtener todos los productos creados


exports.createProduct = createProduct;

var findAllProducts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    // Buscar todos los productos registrados
    var products = yield _Product.default.find().then(products => {
      if (products.length > 0) {
        return res.status(200).json({
          message: 'Lista de todos los productos registrados!',
          products
        });
      }
    }).catch(error => {
      console.error(error);
      return res.status(500).json({
        message: 'No se encontro ningun producto registrado',
        data: null
      });
    });
  });

  return function findAllProducts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Método para buscar productos por id


exports.findAllProducts = findAllProducts;

var findProductById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      productId
    } = req.params;
    var product = yield _Product.default.findById(productId).then(product => {
      if (product) {
        return res.status(200).json({
          message: "Producto encontrado con el id: ".concat(productId),
          product
        });
      }
    }).catch(error => {
      console.error(error);
      return res.status(500).json({
        message: "No se encontro ningun producto registrado con el id: ".concat(productId),
        data: null
      });
    });
  });

  return function findProductById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Método pata editar producto por id


exports.findProductById = findProductById;

var editProductById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;

    if (!req.body && req.body === null) {
      return res.status(400).json({
        message: 'No pudimos editar los datos del producto',
        data: null
      });
    }

    yield _Product.default.findById(id).then(product => {
      return res.status(200).json({
        product
      });
    }).catch(error => {
      console.log(error);
      return res.status(500).json({
        message: 'No pudimos encontrar el producto',
        data: null
      });
    });
  });

  return function editProductById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // Método para actualizar un producto por id


exports.editProductById = editProductById;

var updateProductById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      productId
    } = req.params;
    var {
      name,
      description,
      mark,
      image,
      stock_minimum,
      stock
    } = req.body;

    if (!req.body && req.body === null) {
      return res.status(400).json({
        message: 'No pudimos actualizar los datos correctamente',
        data: null
      });
    }

    yield _Product.default.findByIdAndUpdate(productId, {
      name,
      description,
      mark,
      image: req.file,
      stock_minimum,
      stock
    }, {
      new: true
    }).then(product => {
      if (product) {
        return res.status(200).json({
          message: "Se actualizo correctamente el producto con id: ".concat(productId),
          product
        });
      }
    }).catch(error => {
      console.error(error);
      return res.status(500).json({
        message: 'No se pudo actualizar correctamente el producto',
        data: null
      });
    });
  });

  return function updateProductById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // Método para eliminar producto por id


exports.updateProductById = updateProductById;

var deleteProductById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var {
      productId
    } = req.params;
    yield _Product.default.findByIdAndRemove(productId).then(product => {
      if (product) {
        return res.status(200).json({
          message: "Se elimino correctamente el producto con id: ".concat(productId),
          product
        });
      }
    }).catch(error => {
      console.error(error);
      return res.status(500).json({
        message: 'Error al tratar de eliminar el producto',
        data: null
      });
    });
  });

  return function deleteProductById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // Método para extraer el número de colleciones de los productos


exports.deleteProductById = deleteProductById;

var countProducts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var productsCount = _Product.default.find();

    productsCount.count(function (error, result) {
      if (error) {
        throw new Error('No se encontro ningun producto');
      }

      return res.status(200).json({
        result
      });
    });
  });

  return function countProducts(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.countProducts = countProducts;