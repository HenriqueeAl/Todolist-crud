var http = require('http');
const express = require('express');
const app = express();
const md5 = require('md5'); // HASH PASSWORD

app.use(require("cors")());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// DATA BASE

const Userimport = require('./models/user');
const taskimport = require('./models/tasks')

Userimport.hasMany(taskimport, {
    foreingKey: 'userId',
    as: 'userId'
})
const database = require('./db');
database.sync()

// END - DATA BASE

// ROUTE REGISTER

app.post('/register', (req: any , res: any) => {
    const usercadast: string = req.body.user
    const passwordcadast: string = req.body.password

    const validantion = async ()=>{
        const userconsult = await Userimport.findOne({where: {user:usercadast}})

        if(userconsult){
            res.status(401).json({message: 'Usuario ja em uso', err: 'user'})
        }else{
            if(usercadast.length >= 6){
                if(passwordcadast.length >= 8){
                    Userimport.create({
                        user: usercadast,
                        password: md5(passwordcadast)
                    })
                    res.status(200).json({message: 'cadastrado', user: usercadast})
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

// END - ROUTE REGISTER

// ROUTE LOGIN

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

// END - ROUTE LOGIN

// ROUTE TASKS

app.post('/tasks', async (req: any, res: any) => {
    const name = req.body.name
    const loggeduser = req.body.user
    const userid = await Userimport.findOne({where: {user:loggeduser}})
    const id = userid.dataValues.id
    if(name != ''){
        await taskimport.create({
            name: name,
            userId: id
        })
        const tasks = await Userimport.findByPk(id, {
            include: {
                model: taskimport,
                as: 'userId'
            }
        })
        res.status(200).json(tasks.userId)
    }
})

// END - ROUTE TASKS


//ROUTE DELETE

app.post('/delete', async (req: any, res: any)=>{
    const iddelete = req.body.deleted

    const taskdelete = await taskimport.findByPk(iddelete)

    if(taskdelete){
        await taskdelete.destroy({force:true})
        res.status(200).json({message: 'deleted'})
    }
})

// END - ROUTE DELETE

//ROUTE EDIT

app.post('/edit', async (req: any, res: any)=>{
    const edited = req.body.edit
    const name = req.body.name

    const taskedit = await taskimport.findByPk(edited)

    if(taskedit){
        taskedit.update({name: name})
        await taskedit.save();
        res.status(200).json({message: 'update'})
    }
})

// END - ROUTE EDIT

// ROUTE COMPLETE

app.post('/complete', async (req: any, res: any)=>{

    const idcomplete = req.body.complete

    const taskcomplete = await taskimport.findByPk(idcomplete)

    if(taskcomplete){
        taskcomplete.update({complete: true})
        await taskcomplete.save()
        res.status(200).json({message: 'update'})
    }
})

// END - ROUTE COMPLETE

// ROUTE CONSULT

app.post('/consult', async (req: any, res:any)=>{
    const userconsult = req.body.user
    const user = await Userimport.findOne({where: {user:userconsult}})
    const id = user.dataValues.id
    if(userconsult){
        const tasks = await Userimport.findByPk(id,{
            include: {
                model: taskimport,
                as: 'userId'
            }
        })
        res.status(200).json(tasks.userId)
    }
})

//END - ROUTE CONSULT

app.listen(5051 , ()=>console.log("Servidor escutando na porta 5051..."));

module.exports = app;