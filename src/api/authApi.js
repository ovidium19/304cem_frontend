import axios from 'axios'
import * as ct from '../constants'

const baseUrl = ct.BASE_URL
const loginPath = '/api/v1/users/login'
const signupPath = '/api/v1/users/signup'
const updatePath = '/api/v1/users/user'
function generateAuthHeader(credentials){
    return `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`
}
export async function login(credentials){
    let header = generateAuthHeader(credentials)
    return axios({
        url: loginPath,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': generateAuthHeader(credentials)
        }
    }).then(res => {
        return Object.assign({},res.data,{header})
    })
}
export async function signup(credentials){
    let header = generateAuthHeader(credentials)
    return axios({
        url: signupPath,
        baseURL: baseUrl,
        method: 'POST',
        data: credentials,
        headers: {
            'Authorization': header
        }
    }).then(res => {
        return {
            username: credentials.username,
            password: ''
        }
    })
}
export async function updateUser(user) {
    let header = generateAuthHeader(user)
    let {password, ...userData} = user
    return axios({
        url: `${updatePath}/${user.username}`,
        baseURL: baseUrl,
        method: 'PATCH',
        data: userData,
        headers: {
            'Authorization': header
        }
    }).then(res => {
        console.log(res)
        return {}
    })
}
