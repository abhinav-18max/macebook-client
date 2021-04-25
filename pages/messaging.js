import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import Router from 'next/router'
import styles from '../styles/pages/messaging.module.scss'

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
    const res = await fetch(`${process.env.API}/api/messages`, {
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
        messages: [
            "message 1",
            "message 2",
            "message 3",
            "message 4",
        ]
    }
}

export default Messaging