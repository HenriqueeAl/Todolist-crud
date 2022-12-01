import { Children } from "react"
import Login from "../pages/login"
import { useLogin } from "./useLogin"

export const ProtectedLayout = ({ children }: { children: JSX.Element}) => {
    const login = useLogin()

    if (!login.loggeduser){
        return <Login />
    }

    return children
}