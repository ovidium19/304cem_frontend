import request from 'supertest'
import status from 'http-status-codes'
jest.mock('webpack')
jest.mock('koa-webpack-dev-middleware')
jest.mock('koa-webpack-hot-middleware')
jest.mock('../webpack.config.dev.js')
import server from './server'

describe('Testing server', () => {
    beforeAll( async() => console.log('Jest starting!'))

    // close the server after each test
    afterAll(() => {
        server.close()
        console.log('server closed!')
    })

    test('It responds with OK', async(done) =>{
        const response = await request(server).get('/')
        expect(response.status).toEqual(status.OK)
        done()
    })
    test('With error header, it responds with error', async done => {
        const response = await request(server).get('/').set('error','foo')
        expect(response.status).toEqual(status.NOT_FOUND)
        const data = JSON.parse(response.text)
        expect(data.message).toEqual('foo')
        done()
    })
})
