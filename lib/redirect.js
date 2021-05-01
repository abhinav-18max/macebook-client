import Router from "next/router"

export const clientRedirect = (slug) => {
    Router.replace(slug)
}

export const serverRedirect = (ctx, slug) => {
    ctx.res.writeHead(301, {Location: slug})
    ctx.res.end()
}