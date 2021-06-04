"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  Schema,
  model
} = _mongoose.default;
var productSchema = new Schema({
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

var _default = model('Product', productSchema);

exports.default = _default;