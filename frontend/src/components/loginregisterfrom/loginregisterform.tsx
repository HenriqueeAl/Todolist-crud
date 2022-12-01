import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLogin } from '../../utils/useLogin';
import './loginregisterform.scss'


export const Loginregisterform = (props: any) =>{
    const login = useLogin()

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [resp, setresp] = useState('');
    const [messageresp, setMessageresp] = useState('');

    const inputuser = useRef<HTMLInputElement>(null);
    const inputpassword = useRef<HTMLInputElement>(null);

    const submit = () => {
        axios.post('http://localhost:5051' + props.post, {
            user: user,
            password: password
        }).then((res)=>{
            if(res.data.user){
                localStorage.setItem('u', res.data.user)
                login.login()
            }
            setresp('')
            setMessageresp('')
        })
        .catch((res)=>{
            setresp(res.response.data.err)
            setMessageresp(res.response.data.message)
            if(res.response.data.err == 'user'){
                setUser('')
                setPassword('')
            }else if(res.response.data.err == 'password'){
                setPassword('')
            }
            })
    }

    useEffect(()=>{
        if(resp == 'user'){
            inputuser.current?.focus()
            inputuser.current?.classList.add('err')
            inputpassword.current?.classList.remove('err')
        }else if(resp == 'password'){
            inputpassword.current?.focus()
            inputpassword.current?.classList.add('err')
            inputuser.current?.classList.remove('err')
        }else{
            inputpassword.current?.classList.remove('err')
            inputuser.current?.classList.remove('err')
        }
    }, [resp])

    return (
        <div className='login'>
            <h1>todo list</h1>
            <div className='box'>
                <form onSubmit={(e)=>{
                    submit()
                    setresp('')
                    setMessageresp('')
                    e.preventDefault()
                    }}>
                    <div className='inputs'>
                        <input
                        ref={inputuser}
                        value={user}
                        placeholder='USER NAME'
                        onChange={(e)=> setUser(e.target.value)}></input>
                        {resp == 'user' ? <p>{messageresp}</p> : <></>}
                        <input
                        ref={inputpassword} 
                        value={password} 
                        placeholder='PASSWORD' 
                        type='password' 
                        onChange={(e)=> setPassword(e.target.value)}></input>
                        {resp == 'password' ?  <p>{messageresp}</p> : <></>}
                    </div>
                    <button>{props.type}</button>
                </form>
                <div className='description'>
                    <p>{props.description}</p>
                    <a href={props.linkto}>{props.link}</a>
                </div>
            </div>
        </div>
    )
}