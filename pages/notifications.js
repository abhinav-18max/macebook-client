import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import Router from 'next/router'
import styles from '../styles/pages/notifications.module.scss'

const Notifications = ({notifications}) => {
    return(
        <Layout>
            <SEO title="Notifications | Macebook"/>
            <h1>Notifications</h1>
            {notifications.map((n, idx) => <div key={idx}>{n}</div>)}
        </Layout>
    )
}

Notifications.getInitialProps = async (ctx) => {
    const res = await fetch(`${process.env.API}/api/notifications`, {
        method: 'GET',
        credentials: 'include',
        headers: ctx.req ? {cookie: ctx.req.headers.cookie} : undefined
    })
    
    if(res.status === 401 && !ctx.req){
        Router.replace('/login')
        return {}
    }

    if(res.status === 401 && ctx.req){
        ctx.res.writeHead(301, {Location: '/login'})
        ctx.res.end()
        return {}
    }

    return {
        notifications: [
            "notification 1",
            "notification 2",
            "notification 3",
            "notification 4",
        ]
    }
}


export default Notifications