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
var http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const Userimport = require('./models/users');
const database = require('./db');
database.sync();
app.post('/register', (req, res) => {
    const usercadast = req.body.user;
    const passwordcadast = req.body.password;
    if (usercadast.length >= 6) {
        console.log('user cadastrado');
        if (passwordcadast.length >= 8) {
            console.log('senha maior que 8');
            Userimport.create({
                user: usercadast,
                password: md5(passwordcadast)
            });
        }
        else {
            console.log('nao cadastrado senha deve ter 8 caracter');
        }
    }
    else {
        console.log('nao cadastrado usuario deve ter 6 caracter');
    }
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userlogin = req.body.user;
    const passwordlogin = md5(req.body.password);
    const haveuser = yield Userimport.findOne({ where: { user: userlogin } });
    if (haveuser) {
        const passwordverify = haveuser.dataValues.password;
        if (passwordverify === passwordlogin) {
            console.log('logado');
            res.status(200).json({ message: 'logado',
                user: userlogin
            });
        }
        else {
            res.status(406).json({ message: 'senha errada' });
        }
    }
    else {
        res.status(406).json({ message: 'usuario nao encontrado' });
    }
}));
var server = http.createServer(app);
server.listen(5051);
console.log("Servidor escutando na porta 5051...");
