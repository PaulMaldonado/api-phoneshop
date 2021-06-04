"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboard = exports.login = exports.register = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressJoi = _interopRequireDefault(require("express-joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// validar los campos de registro
var registerSchema = {
  username: _expressJoi.default.Joi.types.String().alphanum().min(6).max(255).required(),
  name: _expressJoi.default.Joi.types.String().alphanum().min(6).max(255).required(),
  email: _expressJoi.default.Joi.types.String().alphanum().min(6).max(255).required(),
  password: _expressJoi.default.Joi.types.String().alphanum().min(6).max(1024).required()
}; // validar los campos de login

var loginSchema = {
  email: _expressJoi.default.Joi.types.String().alphanum().min(6).max(255).required().email(),
  password: _expressJoi.default.Joi.types.String().alphanum().min(6).max(1024).required()
}; // Método para registrar nuevo usuario

var register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        name,
        email,
        password
      } = req.body;

      var {
        registerError
      } = _expressJoi.default.joiValidate(registerSchema);

      if (registerError) {
        return res.status(400).json({
          message: 'Verifique sus datos, no pudimos registrar al usuario...',
          data: null
        });
      }

      var emailExist = yield _User.default.findOne({
        email
      });

      if (emailExist) {
        return res.status(400).json({
          message: 'Error. El email con el que intentas registrarte ya esta en uso.',
          data: null
        });
      }

      var newUser = new _User.default({
        username,
        name,
        email,
        password: yield _User.default.passwordEncrypted(password)
      });
      var savedUser = yield newUser.save();

      var token = _jsonwebtoken.default.sign({
        id: savedUser._id
      }, process.env.TOKEN_SECRET, {
        expiresIn: 86400
      });

      return res.status(200).json({
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Token no valido',
        data: null
      });
    }
  });

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Método para iniciar sesión


exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        email: req.body.email
      });

      if (!userFound) {
        return res.status(400).json({
          message: 'No se encontro nigun usuario con ese email.',
          data: null
        });
      }

      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password);

      if (!matchPassword) {
        return res.status(401).json({
          message: 'Contraseña invalida',
          data: null
        });
      }

      var {
        loginError
      } = _expressJoi.default.joiValidate(loginSchema);

      if (loginError) {
        return res.status(400).json({
          message: 'Verifica Email/password que sean correctos',
          data: null
        });
      }

      var token = _jsonwebtoken.default.sign({
        id: userFound._id
      }, process.env.TOKEN_SECRET, {
        expiresIn: 86400
      });

      return res.status(200).json({
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Token invalido!',
        data: null
      });
    }
  });

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Método de prueba para verificar que si se pudo iniciar sesión correctamente


exports.login = login;

var dashboard = (req, res) => {
  res.json({
    error: null,
    data: {
      message: 'Ruta para usuarios registrado, inicio de sesión correcto!',
      userFound: req.userFound
    }
  });
};

exports.dashboard = dashboard;