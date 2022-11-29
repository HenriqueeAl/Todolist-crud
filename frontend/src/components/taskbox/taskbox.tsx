import styles from './taskbox.module.scss'
import { BiTrash, BiEditAlt, BiCheck } from 'react-icons/bi';

export const Taskbox = (props) => {
    
    return (
        <div className={styles.taskbox} style={props.complete == 'true' ? {border: '3px solid #4EB879'}: {}}>
            <p>{props.name}</p>
            <div className={styles.icons} style={props.complete == 'true' ? {justifyContent: 'flex-end'}: {}}>
                <BiTrash className={styles.icon}></BiTrash>
                {
                    props.complete == 'false' ?
                <BiEditAlt className={styles.icon}></BiEditAlt> :
                <></>
                }
                {
                    props.complete == 'false' ?
                <BiCheck className={styles.icon}></BiCheck> :
                <></>
                }
            </div>
        </div>
    )
}