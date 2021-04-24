import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import Router from 'next/router'
import styles from '../styles/pages/messaging.module.scss'

const Messaging = (props) => {
    return(
        <Layout>
            <SEO title="Messaging | Macebook"/>
            <div>Messaging</div>
            <div>Message 1</div>
            <div>Message 2</div>
            <div>Message 3</div>
            <div>Message 4</div>
            <div>Message 5</div>
        </Layout>
    )
}

Messaging.getInitialProps = async (ctx) => {
    const res = await fetch('http://localhost:5001/api/messages', {
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

export default Messaging