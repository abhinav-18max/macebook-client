import {Router, useRouter} from 'next/router'
import Layout from '../../components/Layout/layout'
import SEO from '../../components/seo'
import styles from '../../styles/pages/profile.module.scss'

const UserProfile = (props) => {
    const router = useRouter()
    const {username} = router.query
    const user = props.user
    return(
        <Layout>
            <SEO title={`${username} | Macebook`}/>
            <img src={user.picture}></img>
            <h1>{user.username}</h1>
            <address>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.location}</p>
            </address>
        </Layout>
    )
}

export async function getServerSideProps(ctx){
    const cookie = ctx.req.headers.cookie

    const res = await fetch(`http://localhost:5001/api/users/${ctx.params.username}`, {
        headers: {
            cookie
        }
    })

    if(res.status === 401 && !ctx.req){
        Router.replace('/login')
        return {props:{}}
    }

    if(res.status === 401 && ctx.req){
        ctx.res.writeHead(301, {Location: 'http://localhost:3000/login'})
        ctx.res.end()
        return {props:{}}
    }

    if(res.status === 404 && !ctx.req){
        Router.replace('/404')
        return {props:{}}
    }

    if(res.status === 404 && ctx.req){
        ctx.res.writeHead(301, {Location: 'http://localhost:3000/404'})
        ctx.res.end()
        return {props:{}}
    }
    
    const user = await res.json()
    return{
        props: {user}
    }
}
export default UserProfile