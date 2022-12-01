import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggeduser, setLogeeduser] = useState();

    useEffect(()=>{
        let user = localStorage.getItem('u')

        if(user){
            setLogeeduser(user)
        }
    }, [])

    const login = () => {
        let user = localStorage.getItem('u')

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