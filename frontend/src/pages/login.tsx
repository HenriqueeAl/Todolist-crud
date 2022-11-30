import { Loginregisterform } from '../components/loginregisterfrom/loginregisterform'
import styles from '../styles/Home.module.scss'

interface login{
  user: string;
  password: string;
}

export default function Login() {

  return (
    <div>
      <Loginregisterform post='/login' type='LOGIN' description='Not a member?' link='Register' linkto='/register'>

      </Loginregisterform>
    </div>
  )
}
