import styles from './logout.module.scss'

export const Logout = () => {

    const test = () => {
        console.log(sessionStorage.getItem('u'))
    }

    return (
        <header className={styles.header}>
            <button onClick={test}>+ ADD tasks</button>
            <a href='/register' className={styles.logout}>Logout</a>
        </header>
    )
}