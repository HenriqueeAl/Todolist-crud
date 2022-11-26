import styles from './logout.module.scss'
import { useState, useEffect, useRef } from "react";
import { Api } from '../../utils/axios';

export const Logout = () => {
    const [taskvalue, setTaskvalue] = useState();
    const [sendtask, setSendtask] = useState();

    const [add,setAdd] = useState(false);

    const [user,setUser] = useState<string | null>()

    useEffect(()=>{
        setUser(sessionStorage.getItem('u'))
    },[])
    
    useEffect(()=>{
        Api.post('/addtask',{task: sendtask})
        console.log(sendtask)
    }, [sendtask])

    return (
        <>
        <header className={styles.header}>
            <button onClick={()=>setAdd(true)}>+ ADD tasks</button>
            <a href='/register' className={styles.logout}>Logout</a>
        </header>
        {/*add tasks*/}
        {add == true ? 
        <div className={styles.addtask}>
            <div className={styles.content}>
                <h4>ADD task</h4>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    setSendtask(taskvalue);
                }}>
                    <input placeholder='Name of task' onChange={(e: any)=>setTaskvalue(e.target.value)}></input>
                    <button onClick={()=> {}}>ADD</button>
                </form>
            </div>
            <p onClick={()=>setAdd(false)}>X</p>
        </div>
         :
        <div></div>}
        </>
    )
}