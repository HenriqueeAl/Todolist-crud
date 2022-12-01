import './task.scss'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import { Taskbox } from '../taskbox/taskbox';
import { useLogin } from '../../utils/useLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Task = () => {
    const login = useLogin()

    const [tasks, setTasks] = useState([]);

    /*Adicionando task*/
    const [taskname, setTaskname] = useState('');

    const posttask = ()=> {
        axios.post('http://localhost:5051/tasks', {
            name: taskname,
            user: login.loggeduser
        }).then((res)=>{
            setTasks(res.data)
        })

        setTaskname('')
    }
    
    /*Deletando task*/
    const [deleted, setDeleted] = useState()

    const deletetask = async (e)=>{
        axios.post('http://localhost:5051/delete', {
            deleted: e
        }).then((res)=>{
            update()
        })
    }

    /*Edit name task*/

    /*Marcando task como completada*/

    const completetask = async (e)=>{
        await  axios.post('http://localhost:5051/complete', {
            complete: e
        })
        update()
    }

    /*useEffect(()=>{
        axios.post('http://localhost:5051/complete', {
            complete: complete
        })
        update()
    }, [complete])*/

    const [value, setValue] = useState('')

    const modifyname = (e)=>{
        
        axios.post('http://localhost:5051/edit', {
            edit: e.id,
            name: value
        })
    }

    /*Mostar as tasks na tela*/
    const update = () => {
        axios.post('http://localhost:5051/consult', {
            user: login.loggeduser
        }).then((res)=>{
            console.log(res.data)
            setTasks(res.data)
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
                {tasks.map((e)=> <Taskbox name={e.name}
                complete={e.complete} 
                deleted={()=>{deletetask(e.id)}}
                value={(e)=>{setValue(e)}} 
                modifyname={()=>{modifyname(e)}}
                completepost={()=>completetask(e.id)}
                ></Taskbox>
                )}
            </div>
        </div>
    )
}