"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uri = "mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@cluster0.3gbsf.mongodb.net/").concat(process.env.DB_DATABASE, "?retryWrites=true&w=majority");
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

_mongoose.default.connect(uri, options).then(() => {
  console.log('Database is connected!');
}).catch(error => {
  console.error(error);
});

var _default = _mongoose.default;
exports.default = _default;