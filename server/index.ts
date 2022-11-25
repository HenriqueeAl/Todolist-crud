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

const Userimport = require('./models/users');
const database = require('./db');

database.sync()

app.post('/register', (req: any , res: any) => {
    const usercadast: string = req.body.user
    const passwordcadast: string = req.body.password

    if(usercadast.length >= 6){
        console.log('user cadastrado')
        if(passwordcadast.length >= 8){
            console.log('senha maior que 8')
            Userimport.create({
                user: usercadast,
                password: md5(passwordcadast)
            })
        }else{
            console.log('nao cadastrado senha deve ter 8 caracter')
        }
    }else{
        console.log('nao cadastrado usuario deve ter 6 caracter')
    }
})

app.post('/login', async (req: any, res: any) => {
    const userlogin: string = req.body.user
    const passwordlogin: string = md5(req.body.password)

    const haveuser = await Userimport.findOne({where:{user:userlogin}})

    if(haveuser){
        const passwordverify = haveuser.dataValues.password
        if(passwordverify === passwordlogin){
            console.log('logado')
            res.status(200).json({message: 'logado',
            user: userlogin
            })
        }else{
            res.status(406).json({message: 'senha errada'})
        }
    }else{
        res.status(406).json({message: 'usuario nao encontrado'})
    }
})

var server = http.createServer(app); 
server.listen(5051);
console.log("Servidor escutando na porta 5051...")