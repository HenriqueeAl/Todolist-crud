import styles from './task.module.scss'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import { Taskbox } from '../taskbox/taskbox';

export const Task = () => {
    return (
        <div className={styles.task}>
            <button className={styles.logout}>logout</button>
            <h1>Todo List</h1>
            <form>
                <input placeholder='TASK'></input>
                <button className={styles.add}>+</button>
            </form>
            <div className={styles.box}>
                <Taskbox name='Aprender node.js' complete='false'></Taskbox>
                <Taskbox name='Aprender node.js' complete='true'></Taskbox>
            </div>
        </div>
    )
}