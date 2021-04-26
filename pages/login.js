import {useState} from 'react'
import SEO from '../components/seo'
import Layout from '../components/Layout/layout'
import Router from 'next/router'

const Login = () => {
    const [username, updateUsername] = useState("charlotteli")
    const [password, updatePassword] = useState("charlotteli") 

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
    
            if(res.status == 200){
                console.log("You're Logged In!")
                localStorage.setItem('macebook-isauth', true)
                return Router.replace('/feeds')
            }
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

export default Login
