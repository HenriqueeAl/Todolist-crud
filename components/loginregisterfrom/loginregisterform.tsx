import styles from './loginregisterform.module.scss'

interface Loginregisterform {
    title: string;
    button : string
}

export const Loginregisterform = (props: Loginregisterform) =>{
    return (
        <div className={styles.login}>
            <div className={styles.windowlogin}>
                <h2>{props.title}</h2>
                <form>
                    <input placeholder='User name' type='text'></input>
                    <input placeholder='Password' type='password'></input>
                    <button>{props.button}</button>
                </form>
            </div>
        </div>
    )
}