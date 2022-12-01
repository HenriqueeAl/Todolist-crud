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
const md5 = require('md5');
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const Userimport = require('./models/user');
const taskimport = require('./models/tasks');
Userimport.hasMany(taskimport, {
    foreingKey: 'userId',
    as: 'userId'
});
const database = require('./db');
database.sync();
app.post('/register', (req, res) => {
    const usercadast = req.body.user;
    const passwordcadast = req.body.password;
    const validantion = () => __awaiter(void 0, void 0, void 0, function* () {
        const userconsult = yield Userimport.findOne({ where: { user: usercadast } });
        if (userconsult) {
            res.status(401).json({ message: 'Usuario ja em uso', err: 'user' });
        }
        else {
            if (usercadast.length >= 6) {
                if (passwordcadast.length >= 8) {
                    Userimport.create({
                        user: usercadast,
                        password: md5(passwordcadast)
                    });
                    res.status(200).json({ message: 'cadastrado', user: usercadast });
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
    validantion();
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userlogin = req.body.user;
    const passwordlogin = md5(req.body.password);
    const haveuser = yield Userimport.findOne({ where: { user: userlogin } });
    if (haveuser) {
        const passwordverify = haveuser.dataValues.password;
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
    const userid = yield Userimport.findOne({ where: { user: loggeduser } });
    const id = userid.dataValues.id;
    if (name != '') {
        yield taskimport.create({
            name: name,
            userId: id
        });
        const tasks = yield Userimport.findByPk(id, {
            include: {
                model: taskimport,
                as: 'userId'
            }
        });
        res.status(200).json(tasks.userId);
    }
}));
app.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const iddelete = req.body.deleted;
    const taskdelete = yield taskimport.findByPk(iddelete);
    if (taskdelete) {
        yield taskdelete.destroy({ force: true });
        res.status(200).json({ message: 'deleted' });
    }
}));
app.post('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = req.body.edit;
    const name = req.body.name;
    const taskedit = yield taskimport.findByPk(edited);
    if (taskedit) {
        taskedit.update({ name: name });
        yield taskedit.save();
        res.status(200).json({ message: 'update' });
    }
}));
app.post('/complete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idcomplete = req.body.complete;
    const taskcomplete = yield taskimport.findByPk(idcomplete);
    if (taskcomplete) {
        taskcomplete.update({ complete: true });
        yield taskcomplete.save();
        res.status(200).json({ message: 'update' });
    }
}));
app.post('/consult', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userconsult = req.body.user;
    const user = yield Userimport.findOne({ where: { user: userconsult } });
    const id = user.dataValues.id;
    if (userconsult) {
        const tasks = yield Userimport.findByPk(id, {
            include: {
                model: taskimport,
                as: 'userId'
            }
        });
        res.status(200).json(tasks.userId);
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Servidor escutando na porta 5051..."));
module.exports = app;
