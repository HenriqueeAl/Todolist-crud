import styles from './task.module.scss'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';

interface Task {
    text: string
}

export const Task = (props: Task) => {
    return (
        <div className={styles.task}>
            <p>{props.text}</p>
            <div className={styles.options}>
                <AiOutlineCheck />
                <AiFillEdit />
                <AiFillDelete />
            </div>
        </div>
    )
}