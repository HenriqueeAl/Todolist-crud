import { Prisma, PrismaClient } from "@prisma/client";
import { env } from "process";

const express = require('express');
const app = express();
const md5 = require('md5'); // HASH PASSWORD

app.use(require("cors")());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// ROUTE REGISTER

interface Userconsult {
    id?: number | null;
    user?: string | null;
    password?: string | null;
    task?: object | null;
}

app.get('/', (req: any, res: any)=>{
    res.send('oi')
})

app.get('/dois', async (req: any, res: any)=>{
    const prisma = new PrismaClient()
    const userconsult = await prisma.user.findMany()
    res.send(userconsult)
    await prisma.$disconnect()
})

app.post('/register', async (req: any , res: any) => {
    const prisma = new PrismaClient()

    const usercadast: string = req.body.user
    const passwordcadast: string = req.body.password

    const validantion = async ()=>{
        const userconsult = await prisma.user.findMany()
        if(userconsult){
            res.status(401).json({message: 'Usuario ja em uso', err: 'user', view: userconsult})
        }else{
            if(usercadast.length >= 6){
                if(passwordcadast.length >= 8){
                    await prisma.user.create({
                        data: {
                            user: usercadast,
                            password: md5(passwordcadast),
                        }
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

    validantion().then(async () => {
        await prisma.$connect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })
})

// END - ROUTE REGISTER

// ROUTE LOGIN

app.post('/login', async (req: any, res: any) => {
    const prisma = new PrismaClient()

    const userlogin: string = req.body.user
    const passwordlogin: string = md5(req.body.password)

    const haveuser = await prisma.user.findFirst({where:{user:userlogin}})

    console.log(haveuser)

    if(haveuser){
        const passwordverify = haveuser.password
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
    const prisma = new PrismaClient()

    const name = req.body.name
    const loggeduser = req.body.user
    const userid: Userconsult | null = await prisma.user.findFirst({where: {user:loggeduser}})
    if(userid){
        const id = userid.id
        if(id){
            await prisma.task.create({data: {name: name,complete: false, userId: id}})
            res.status(200).json('foi')
        }
    }
})

// END - ROUTE TASKS


//ROUTE DELETE

app.post('/delete', async (req: any, res: any)=>{
    const prisma = new PrismaClient()
    const iddelete = req.body.deleted

    const taskdelete = await prisma.task.delete({where: {id: iddelete}})

    if(taskdelete){
        res.status(200).json({message: 'deleted'})
    }
})

// END - ROUTE DELETE

//ROUTE EDIT

app.post('/edit', async (req: any, res: any)=>{
    const prisma = new PrismaClient()
    const edited = req.body.edit
    const name = req.body.name

    const taskedit = await prisma.task.update({
        where: {
            id: edited
        },
        data: {
            name: name
        }
    })

    if(taskedit){
        res.status(200).json({message: 'update'})
    }
})

// END - ROUTE EDIT

// ROUTE COMPLETE

app.post('/complete', async (req: any, res: any)=>{
    const prisma = new PrismaClient()

    const idcomplete = req.body.complete

    const taskcomplete = await prisma.task.update({
        where: {
            id: idcomplete
        },
        data: {
            complete: true
        }
    })

    if(taskcomplete){
        res.status(200).json({message: 'update'})
    }
})

// END - ROUTE COMPLETE

// ROUTE CONSULT*/

app.post('/consult', async (req: any, res:any)=>{
    const prisma = new PrismaClient()

    const userconsult = req.body.user
    const user: Userconsult | null = await prisma.user.findFirst({where: {user:userconsult}})
    if(user){
        const id = user.id
        if(id){
            const tasks = await prisma.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    task: true
                }
            })
            res.status(200).json(tasks?.task)
        }
    }
})

//END - ROUTE CONSULT

app.listen(5051 , ()=>console.log("Servidor escutando na porta 5051..."));

module.exports = app;