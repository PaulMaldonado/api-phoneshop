"use strict";

var _app = _interopRequireDefault(require("./app"));

var _db = _interopRequireDefault(require("./database/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8000;

_app.default.listen(port, () => console.log("Server running on port: ".concat(port)));