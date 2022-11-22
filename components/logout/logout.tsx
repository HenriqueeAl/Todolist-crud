import styles from './logout.module.scss'

export const Logout = () => {
    return (
        <header className={styles.header}>
            <a href='/register' className={styles.logout}>Logout</a>
        </header>
    )
}