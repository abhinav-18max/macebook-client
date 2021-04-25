import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import Router from 'next/router'
import styles from '../styles/pages/notifications.module.scss'

const Notifications = (props) => {
    return(
        <Layout>
            <SEO title="Notifications | Macebook"/>
            <h1>Notifications</h1>
            <div>Notification 1</div>
            <div>Notification 2</div>
            <div>Notification 3</div>
            <div>Notification 4</div>
            <div>Notification 5</div>
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
        ctx.res.writeHead(301, {Location: 'http://localhost:3000/login'})
        ctx.res.end()
        return {}
    }
    
    return {}
}

export default Notifications