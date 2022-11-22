import styles from './taskcomplete.module.scss'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';

interface Task {
    text: string
}

export const Taskcomplete = (props: Task) => {
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