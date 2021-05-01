import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    
    useEffect(() => {
        if(!user){
            fetch(`${process.env.API}/profile`, {
                method: 'GET',
                credentials: 'include'
            })
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(err => console.log(err))
        }
    }, [user])

    return(
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}