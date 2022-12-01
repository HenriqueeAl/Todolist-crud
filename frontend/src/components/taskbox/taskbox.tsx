import styles from './taskbox.module.scss'
import { BiTrash, BiEditAlt, BiCheck } from 'react-icons/bi';
import { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../utils/useLogin';

export const Taskbox = ( props ) => {
    const [editando, setEditando] = useState(false)

    const [value, setValue] = useState(props.name)
    
    return (
        <div className={styles.taskbox} style={props.complete == true ? {border: '3px solid #4EB879'}: {}}>
            {editando == false ?
            <p>{props.name}</p>
            : 
            <form onSubmit={(e)=>{
                setEditando(false)
                props.modifyname();
                e.preventDefault();
                }}>
                <input value={value} onChange={(e)=>{
                    props.value(e.target.value)
                    setValue(e.target.value)
                }}></input>
                <button>
                    <BiCheck ></BiCheck>
                </button>
            </form>}
            {editando == false ?
            <div className={styles.icons} style={props.complete == true ? {justifyContent: 'flex-end'}: {}}>
                <BiTrash className={styles.icon} onClick={()=>props.deleted()}></BiTrash>
                {
                    props.complete == false ?
                <BiEditAlt className={styles.icon} onClick={()=>setEditando(true)}></BiEditAlt> :
                <></>
                }
                {
                    props.complete == false ?
                <BiCheck className={styles.icon} onClick={()=>props.completepost()}></BiCheck> :
                <></>
                }
            </div>
            :
            <></>
            }
        </div>
    )
}