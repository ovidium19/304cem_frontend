require('babel-register')
import Koa from 'koa'
const koa_body = require('koa-bodyparser')
const Router = require('koa-router')
const status = require('http-status-codes')
import path from 'path'
import serve from 'koa-static'
const sendfile = require('koa-sendfile')
import webpack from 'webpack'
import config from '../webpack.config.dev'

import webMid from 'koa-webpack-dev-middleware'
import hotMid from 'koa-webpack-hot-middleware'

const port = 8000
const app = new Koa()
app.use(koa_body())
app.use(serve(path.join(__dirname,'../static')))
const compiler = webpack(config)
const router = new Router()
app.use(webMid(compiler),{
    noInfo: true,
    publicPath: config.output.publicPath
})
app.use(hotMid(compiler))
app.use( async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*')
	await next()
})
router.get('*', async ctx => {
    ctx.set('Allow', 'GET')
    try {
        if (ctx.get('error')) throw new Error(ctx.get('error'))
        await sendfile(ctx,path.join( __dirname, '../src/index.html'))
    }
    catch(err){
        ctx.status = status.NOT_FOUND
        ctx.body = {status: 'error', message: err.message}
    }
})
app.use(router.routes())
app.use(router.allowedMethods())
const server  = app.listen(process.env.PORT || port, () => {
    console.log(process.env.PORT)
    console.log(`Listening on port ${port}`)
})
export default server
