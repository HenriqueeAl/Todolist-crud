import React, { createContext, useEffect, useState } from "react";

interface IUser{
    user?: string | null;
}

interface IContext{
    loggeduser?: any;
    login: ()=> void;
    logout: ()=> void
}

interface IAuthProvider {
    children: JSX.Element
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider ) => {
    const [loggeduser, setLogeeduser] = useState<IUser | null>(null);

    useEffect(()=>{
        const user: any = localStorage.getItem('u')

        if(user){
            setLogeeduser(user)
        }
    }, [])

    const login = () => {
        const user: any = localStorage.getItem('u')

        if(user){
            setLogeeduser(user)
        }
    }

    const logout = () => {
        localStorage.removeItem('u')
        setLogeeduser(null)
    }

    return (
        <AuthContext.Provider value={{loggeduser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}