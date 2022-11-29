import { useState } from 'react';
import styles from './loginregisterform.module.scss'


export const Loginregisterform = (props) =>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.login}>
            <h1>todo list</h1>
            <div className={styles.box}>
                <form>
                    <div className={styles.inputs}>
                        <input placeholder='USER NAME'></input>
                        <input placeholder='PASSWORD' type='password'></input>
                    </div>
                    <button>{props.type}</button>
                </form>
                <div className={styles.description}>
                    <p>{props.description}</p>
                    <a href={props.linkto}>{props.link}</a>
                </div>
            </div>
        </div>
    )
}