import {useState, useEffect} from 'react'
import SEO from '../components/seo'
import Layout from '../components/Layout/layout'
import Sign_in from '../styles/pages/login.module.scss'
import {useAuth} from '../contexts/authContext'
import {clientRedirect, serverRedirect} from '../lib/redirect'
import Link from "next/link";


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

        <div className={Sign_in.layout}>
            <SEO title ="Login | Macebook"/>
            <div className={Sign_in.title_box}><div className={Sign_in.text}>Welcome Back</div></div>
            <div className={Sign_in.label1}><div className={Sign_in.t1}>Username</div></div>
            <div className={Sign_in.tex1}><input name="username" type="text" onChange={handleChange} value={username}/></div>
            <div className={Sign_in.label2}><div className={Sign_in.t2}>Password</div></div>
            <div className={Sign_in.tex2}><input name="password" type="password" onChange={handleChange} value={password}/></div>
            <div className={Sign_in.forgot}><a>Forgot Password</a></div>
            <div className={Sign_in.sign}><button type="submit" onClick={handleClick}>Submit</button></div>
            <div className={Sign_in.signgoogle}><button>Sign in using google</button></div>
            <div className={Sign_in.ellipse}> </div>
            <div className={Sign_in.signup}><button> <Link href="/signup"><a>Signup</a></Link></button></div>



        </div>
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
