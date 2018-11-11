require('babel-register');
import Koa from 'koa'
const koa_body = require('koa-bodyparser')
const Router = require('koa-router')
const status = require('http-status-codes')
import path from 'path'
const sendfile = require('koa-sendfile')
import webpack from 'webpack'
import config from '../webpack.config.dev'
import open from 'open'

const webMid = require('koa-webpack-dev-middleware')

const port = 3000
const app = new Koa()
app.use(koa_body())
const compiler = webpack(config)
const router = new Router()
app.use(webMid(compiler),{
    noInfo: true,
    publicPath: config.output.publicPath
})
app.use(require('koa-webpack-hot-middleware')(compiler))
router.get('*', async ctx => {
    ctx.set('Allow', 'GET')
    try {
        if (ctx.get('error')) throw new Error(ctx.get('error'))
        await sendfile(ctx,path.join( __dirname, '../src/index.html'))
        if (!ctx.status) ctx.throw(404)
    }
    catch(err){
        ctx.status = status.NOT_FOUND
        ctx.body = {status: 'error', message: err.message}
    }
})
app.use(router.routes())
app.use(router.allowedMethods())
const server  = app.listen(port, () => {
    open(`http://localhost:${port}`)
})
export default server
