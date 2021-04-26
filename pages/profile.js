import Router from "next/router"

const Profile = () => {
    return null
}

Profile.getInitialProps = async (ctx) => {
    const res = await fetch(`${process.env.API}/profile`, {
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

    const user = await res.json()
    
    if(!ctx.req){
        Router.replace(`/user/${user.username}`)
    } 

    if(ctx.req){
        ctx.res.writeHead(301, {Location: `/user/${user.username}`})
        ctx.res.end()
    }

    return {}
}
export default Profile