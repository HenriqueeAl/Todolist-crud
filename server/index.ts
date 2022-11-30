import { AnyARecord } from "dns";

var http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(require("cors")());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

interface User {
    user: string;
    password: string;
}

const Userimport = require('./models/user');
const taskimport = require('./models/tasks')

const database = require('./db');

database.sync()

app.post('/register', (req: any , res: any) => {
    const usercadast: string = req.body.user
    const passwordcadast: string = req.body.password

    const validantion = async ()=>{
        const userconsult = await Userimport.findOne({where: {user:usercadast}})

        console.log(userconsult)

        if(userconsult){
            res.status(401).json({message: 'Usuario ja em uso'})
        }else{
            if(usercadast.length >= 6){
                if(passwordcadast.length >= 8){
                    console.log('senha maior que 8')
                    Userimport.create({
                        user: usercadast,
                        password: md5(passwordcadast)
                    })
                    res.status(200).json({message: 'cadastrado'})
                }else{
                    res.status(401).json({
                        message: 'A Senha deve ter 8 caracteres',
                        err: 'password'
                })
                }
            }else{
                res.status(401).json({
                    message: 'O Usuario deve ter 6 caracteres',
                    err: 'user'
                })
            }
        }
    }

    validantion()
})

app.post('/login', async (req: any, res: any) => {
    const userlogin: string = req.body.user
    const passwordlogin: string = md5(req.body.password)

    const haveuser = await Userimport.findOne({where:{user:userlogin}})

    if(haveuser){
        const passwordverify = haveuser.dataValues.password
        if(passwordverify === passwordlogin){
            res.status(200).json({
                message: 'logado',
                user: userlogin
            })
        }else{
            res.status(406).json({
                message: 'Senha incorreta',
                err: 'password'
            })
        }
    }else{
        res.status(406).json({
            message: 'Usuario não encontrado',
            err: 'user'
        })
    }
})

app.post('/addtask', async (req: any, res: any) => {
    taskimport.create({
        task: req.body.task
    })
})

var server = http.createServer(app); 
server.listen(5051);
console.log("Servidor escutando na porta 5051...")