import { useState } from 'react';
import styles from './loginregisterform.module.scss'

interface Loginregisterform {
    title: string;
    button : string;
    submit: Function;
}
export const Loginregisterform = (props: Loginregisterform) =>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.login}>
            <div className={styles.windowlogin}>
                <h2>{props.title}</h2>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    props.submit({user, password})
                }}>
                    <input placeholder='User name' type='text' onChange={(e)=>setUser(e.target.value)}></input>
                    <input placeholder='Password' type='password' onChange={(e)=>setPassword(e.target.value)}></input>
                    <button>{props.button}</button>
                </form>
            </div>
        </div>
    )
}