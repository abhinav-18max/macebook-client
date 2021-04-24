import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import Router from 'next/router'
import styles from '../styles/pages/feeds.module.scss'

const Feeds = (props) => {
    return(
        <Layout>
            <SEO title="Feeds | Macebook"/>
            <div>Feeds</div>
            <div>Feed 1</div>
            <div>Feed 2</div>
            <div>Feed 3</div>
            <div>Feed 4</div>
            <div>Feed 5</div>
        </Layout>
    )
}

Feeds.getInitialProps = async (ctx) => {
    const res = await fetch('http://localhost:5001/api/feeds', {
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

export default Feeds