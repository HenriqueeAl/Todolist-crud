import styles from './loginregister.module.scss'

export const Loginregister = () => {
    return (
        <header className={styles.header}>
            <a href='/login' className={styles.loginregister}>Login</a>
            <span>or</span>
            <a href='/register' className={styles.loginregister}>Register</a>
        </header>
    )
}