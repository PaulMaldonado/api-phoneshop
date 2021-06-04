"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _product = _interopRequireDefault(require("./routes/product.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Rutas para productos

app.use((0, _cors.default)()); // middleware dotenv

_dotenv.default.config({
  path: _path.default.join(__dirname, '.env')
});

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use('/uploads', _express.default.static('uploads'));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}); // Middleware para las rutas de productos

app.use('/api/auth', _user.default);
app.use('/api/product', _product.default); // Middleware para las rutas de autenticación

app.use('/api/dashboard', _user.default);
var _default = app;
exports.default = _default;