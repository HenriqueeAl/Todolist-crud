import './taskbox.scss'
import { BiTrash, BiEditAlt, BiCheck } from 'react-icons/bi';
import { useState } from 'react';

export interface Tasks{
    name: string;
    complete: Boolean;
    modifyname: Function;
    value: Function;
    deleted: Function;
    completepost: Function;
    id?: any;
}

export const Taskbox = ( props: Tasks ) => {
    const [editando, setEditando] = useState(false)

    const [value, setValue] = useState(props.name)
    
    return (
        <div className='taskbox' style={props.complete == true ? {border: '3px solid #4EB879'}: {}}>
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
            <div className='icons' style={props.complete == true ? {justifyContent: 'flex-end'}: {}}>
                <BiTrash className='icon' onClick={()=>props.deleted()}></BiTrash>
                {
                    props.complete == false ?
                <BiEditAlt className='icon' onClick={()=>{
                    setEditando(true)
                    props.value(props.name)
                    setValue(props.name)
                }}></BiEditAlt> :
                <></>
                }
                {
                    props.complete == false ?
                <BiCheck className='icon' onClick={()=>props.completepost()}></BiCheck> :
                <></>
                }
            </div>
            :
            <></>
            }
        </div>
    )
}