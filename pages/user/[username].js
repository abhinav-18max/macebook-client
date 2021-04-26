import {Router, useRouter} from 'next/router'
import Layout from '../../components/Layout/layout'
import SEO from '../../components/seo'
import styles from '../../styles/pages/profile.module.scss'

const UserProfile = (props) => {
    // const router = useRouter()
    const user = props.user
    return(
        <Layout>
            <SEO title={`${user.name} | Macebook`}/>
            <img src={user.picture}></img>
            <h1>{user.name}</h1>
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

    const res = await fetch(`${process.env.API}/users/${ctx.params.username}`, {
        headers: {
            cookie
        }
    })

    if(res.status === 401 && !ctx.req){
        Router.replace('/login')
        return {props:{}}
    }

    if(res.status === 401 && ctx.req){
        ctx.res.writeHead(301, {Location: '/login'})
        ctx.res.end()
        return {props:{}}
    }

    if(res.status === 404 && !ctx.req){
        Router.replace('/404')
        return {props:{}}
    }

    if(res.status === 404 && ctx.req){
        ctx.res.writeHead(301, {Location: '/404'})
        ctx.res.end()
        return {props:{}}
    }
    
    const user = await res.json()
    return{
        props: {user}
    }
}
export default UserProfile