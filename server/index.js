"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express = require('express');
const app = express();
const md5 = require('md5');
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const prisma = new client_1.PrismaClient();
app.get('/', (req, res) => {
    res.send('oi');
});
app.post('/register', (req, res) => {
    const usercadast = req.body.user;
    const passwordcadast = req.body.password;
    const validantion = () => __awaiter(void 0, void 0, void 0, function* () {
        const userconsult = yield prisma.user.findFirst({ where: { user: usercadast } });
        console.log(userconsult);
        if (userconsult) {
            res.status(401).json({ message: 'Usuario ja em uso', err: 'user' });
        }
        else {
            if (usercadast.length >= 6) {
                if (passwordcadast.length >= 8) {
                    const ver = yield prisma.user.create({
                        data: {
                            user: usercadast,
                            password: md5(passwordcadast),
                        }
                    });
                    res.status(200).json({ message: 'cadastrado', });
                }
                else {
                    res.status(401).json({
                        message: 'A Senha deve ter 8 caracteres',
                        err: 'password'
                    });
                }
            }
            else {
                res.status(401).json({
                    message: 'O Usuario deve ter 6 caracteres',
                    err: 'user'
                });
            }
        }
    });
    validantion().then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        yield prisma.$disconnect();
        process.exit(1);
    }));
});
app.listen(5051, () => console.log("Servidor escutando na porta 5051..."));
module.exports = app;
//# sourceMappingURL=index.js.map