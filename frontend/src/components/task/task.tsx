import './task.scss'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import { Taskbox, Tasks } from '../taskbox/taskbox';
import { useLogin } from '../../utils/useLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface Id {
    id: number
}

interface modify extends Id{
    name: string
}

const notifyadd = () => {
    toast.success('Task adicionada', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })}

const notifydeleted = () => {
    toast.warning('Task deletada', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })}

const notifyedited = () => {
    toast.success('Task Editada', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })}

const notifycomlete = () => {
    toast.success('Task completada', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })}

export const Task = () => {

    const login = useLogin()

    const [tasks, setTasks] = useState([]);

    /*Adicionando task*/
    const [taskname, setTaskname] = useState('');

    const posttask = ()=> {
        axios.post('https://todolist-crud-p9gc-4vz8cwnmx-henriqueeal.vercel.app/tasks', {
            name: taskname,
            user: login.loggeduser
        }).then((res)=>{
            notifyadd()
            update()
        })

        setTaskname('')
    }
    
    /*Deletando task*/
    const [deleted, setDeleted] = useState()

    const deletetask = async (e: Id)=>{
        axios.post('https://todolist-crud-p9gc-4vz8cwnmx-henriqueeal.vercel.app/delete', {
            deleted: e
        }).then((res)=>{
            notifydeleted()
            update()
        })
    }

    /*Edit name task*/

    /*Marcando task como completada*/

    const completetask = async (e: Id)=>{
        await  axios.post('https://todolist-crud-p9gc-4vz8cwnmx-henriqueeal.vercel.app/complete', {
            complete: e
        }).then(()=>notifycomlete())
        update()
    }


    /*Modificar nome*/
    const [value, setValue] = useState('')

    const modifyname = (e: modify)=>{
        
        axios.post('https://todolist-crud-p9gc-4vz8cwnmx-henriqueeal.vercel.app/edit', {
            edit: e,
            name: value
        }).then((res)=>notifyedited())

        update()
    }

    /*Mostar as tasks na tela*/
    const update = () => {
        axios.post('https://todolist-crud-p9gc-4vz8cwnmx-henriqueeal.vercel.app/consult', {
            user: login.loggeduser
        }).then((res)=>{
            const arrayorder = res.data
            arrayorder.sort((a: Id, b: Id)=>{
                return a.id < b.id ? -1 : (a.id > b.id) ? 1 : 0
            })
            setTasks(arrayorder)
        })
    }

    /*Chamar funcacao para mostrar tasks quando entrar */
    useEffect(()=>{update()},[])


    return (
        <div className='task'>
            <button className='logout' onClick={()=>login.logout()}>logout</button>
            <h1>Todo List</h1>
            <form onSubmit={(e)=>{
                posttask()
                e.preventDefault();
            }}>
                <input value={taskname} placeholder='TASK' onChange={(e)=>{setTaskname(e.target.value)}}></input>
                <button className='add'>+</button>
            </form>
            <div className='box'>
                {tasks.map((e: Tasks)=> <Taskbox name={e.name}
                complete={e.complete} 
                deleted={()=>{deletetask(e.id)}}
                value={(e: string)=>{setValue(e)}} 
                modifyname={()=>{modifyname(e.id)}}
                completepost={()=>completetask(e.id)}
                ></Taskbox>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}