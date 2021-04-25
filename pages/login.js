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
            const res = await fetch(`${process.env.API}/api/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include'
            })
            const user = await res.json()
            if(res.status == 404){
                return console.log("Invalid Username or Password")
            }
            if(res.status == 200){
                console.log("You're Logged In!")
                localStorage.setItem('macebook-isauth', true)
                // return router.push(`/user/${user.username}`)
                return Router.replace('/feeds')
            }
            console.log("Failed to login!")
        } catch (error) {
            console.log("Failed to login!")
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
