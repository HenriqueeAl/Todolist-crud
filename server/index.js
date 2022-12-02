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
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usercadast = req.body.user;
    const passwordcadast = req.body.password;
    const userconsult = yield prisma.user.findFirst({ where: { user: usercadast } });
    res.send(userconsult);
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userlogin = req.body.user;
    const passwordlogin = md5(req.body.password);
    const haveuser = yield prisma.user.findFirst({ where: { user: userlogin } });
    console.log(haveuser);
    if (haveuser) {
        const passwordverify = haveuser.password;
        if (passwordverify === passwordlogin) {
            res.status(200).json({
                message: 'logado',
                user: userlogin
            });
        }
        else {
            res.status(406).json({
                message: 'Senha incorreta',
                err: 'password'
            });
        }
    }
    else {
        res.status(406).json({
            message: 'Usuario não encontrado',
            err: 'user'
        });
    }
}));
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const loggeduser = req.body.user;
    const userid = yield prisma.user.findFirst({ where: { user: loggeduser } });
    if (userid) {
        const id = userid.id;
        if (id) {
            yield prisma.task.create({ data: { name: name, complete: false, userId: id } });
            res.status(200).json('foi');
        }
    }
}));
app.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const iddelete = req.body.deleted;
    const taskdelete = yield prisma.task.delete({ where: { id: iddelete } });
    if (taskdelete) {
        res.status(200).json({ message: 'deleted' });
    }
}));
app.post('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = req.body.edit;
    const name = req.body.name;
    const taskedit = yield prisma.task.update({
        where: {
            id: edited
        },
        data: {
            name: name
        }
    });
    if (taskedit) {
        res.status(200).json({ message: 'update' });
    }
}));
app.post('/complete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idcomplete = req.body.complete;
    const taskcomplete = yield prisma.task.update({
        where: {
            id: idcomplete
        },
        data: {
            complete: true
        }
    });
    if (taskcomplete) {
        res.status(200).json({ message: 'update' });
    }
}));
app.post('/consult', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userconsult = req.body.user;
    const user = yield prisma.user.findFirst({ where: { user: userconsult } });
    if (user) {
        const id = user.id;
        if (id) {
            const tasks = yield prisma.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    task: true
                }
            });
            res.status(200).json(tasks === null || tasks === void 0 ? void 0 : tasks.task);
        }
    }
}));
app.listen(5051, () => console.log("Servidor escutando na porta 5051..."));
module.exports = app;
//# sourceMappingURL=index.js.map