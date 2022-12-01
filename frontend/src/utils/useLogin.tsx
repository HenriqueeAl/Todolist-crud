import { useContext } from "react"
import { AuthContext } from "./authprovider"

export const useLogin = () => {
    const context = useContext(AuthContext)

    return context
}