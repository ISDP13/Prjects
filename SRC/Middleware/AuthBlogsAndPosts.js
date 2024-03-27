"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var login1 = 'admin';
var password1 = 'qwerty';
var authMiddleware = function (req, res, next) {
    //     if (req.headers['authorization'] !== "Basic YWRtaW46cXdlcnR5"){
    //         res.sendStatus(401)
    //         return
    //     }
    // }
    var auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(401);
        return;
    }
    var _a = auth.split(" "), basic = _a[0], token = _a[1];
    if (basic !== "Basic") {
        res.sendStatus(401);
        return;
    }
    var decodedToken = Buffer.from(token, 'base64').toString();
    var _b = decodedToken.split(":"), login = _b[0], password = _b[1];
    if (login !== login1 || password !== password1) {
        res.sendStatus(401);
        return;
    }
    return next();
};
exports.authMiddleware = authMiddleware;
