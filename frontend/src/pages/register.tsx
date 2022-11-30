import { Loginregisterform } from '../components/loginregisterfrom/loginregisterform'


export default function Register() {

  return (
    <div>

      <Loginregisterform post='/register' type='REGISTER' description='Is a member?' link='Login' linkto='/login'></Loginregisterform>
    
    </div>
  )
}
