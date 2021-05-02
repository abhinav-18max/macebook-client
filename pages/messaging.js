import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import styles from '../styles/pages/messaging.module.scss'
import { clientRedirect, serverRedirect } from '../lib/redirect'

const Messaging = ({messages}) => {
    return(
        <Layout>
            <SEO title="Messaging | Macebook"/>
            <h1>Messaging</h1>
            {messages.map((m, idx) => <div key={idx}>{m}</div>)}
        </Layout>
    )
}

Messaging.getInitialProps = async (ctx) => {
    return handleFetch(ctx, `${process.env.API}/messages`)
}

const handleFetch = async (ctx, route) => {
    const res = await fetch(route, {
        method: 'GET',
        credentials: 'include',
        headers: ctx.req ? {cookie: ctx.req.headers.cookie} : undefined
    })
    
    if(res.status === 401 && !ctx.req){
        clientRedirect('/login')
        return {}
    }

    if(res.status === 401 && ctx.req){
        serverRedirect(ctx, '/login')
        return {}
    }
    
    return {
        messages: [
            "message 1",
            "message 2",
            "message 3",
            "message 4",
        ]
    }
}

export default Messaging