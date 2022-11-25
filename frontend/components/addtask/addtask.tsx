import styles from './addtask.module.scss'

export const Addtask = () => {
    return(
        <div className={styles.addtask}>
            <div className={styles.content}>
                <h4>ADD task</h4>
                <textarea></textarea>
                <button>Confirm</button>
            </div>
            <p>X</p>
        </div>
    )
}