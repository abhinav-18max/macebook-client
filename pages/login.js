import {useState, useEffect} from 'react'
import SEO from '../components/seo'
import Layout from '../components/Layout/layout'
import {useAuth} from '../contexts/authContext'
import {clientRedirect, serverRedirect} from '../lib/redirect'

const Login = () => {
    const [username, updateUsername] = useState("charlotteli")
    const [password, updatePassword] = useState("charlotteli") 
    const [user, setUser] = useAuth()

    useEffect(() => {
        if(user) clientRedirect('/feeds')
    }, [user])

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.API}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include'
            })
    
            if(res.status == 404 || res.status == 401){
                return alert("Invalid Username or Password")
            }
    
            console.log("You're Logged In!")
            localStorage.setItem('macebook-isauth', true)
            const data = await res.json()
            setUser(data.user)
        } catch (error) {
            console.log("Server not responding!")
        }
    }

    const handleChange = (e) => {
        if(e.target.name == "username"){
            updateUsername(e.target.value)
        }
        if(e.target.name=='password'){
            updatePassword(e.target.value)
        }
    }

    return(
        <Layout>
            <SEO title="Login | Macebook"/>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" onChange={handleChange} value={username}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" onChange={handleChange} value={password}/>
                </div>
                <button type="submit" onClick={handleClick}>Submit</button>
            </form>
        </Layout>
    )
}

Login.getInitialProps = async (ctx) => {
    if(ctx.res){
        const res = await fetch(`${process.env.API}/feeds`, {
            method: 'GET',
            credentials: 'include',
            headers: ctx.req ? {cookie: ctx.req.headers.cookie} : undefined
        })

        if(res.ok){
            serverRedirect(ctx, '/feeds')
            return {}
        }
    }
    return {}
}

export default Login
