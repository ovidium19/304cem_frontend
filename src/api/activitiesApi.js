import axios from 'axios'
import * as ct from '../constants'

const baseUrl = ct.BASE_URL
const GET_USER_ACTIVITIES_URL = '/api/v1/activities/for'
const POST_ACTIVITY = '/api/v1/activities'
function generateAuthHeader(credentials){
    return `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`
}

export async function getActivities(header, username, params) {
    let goodParams = Object.keys(params).reduce((p,c,i) => {
        if (params[c]!=='') {
            p[c] = params[c]
        }
        return p
    },{})
    console.log(goodParams)
    console.log(header)
    return axios({
        url: `${GET_USER_ACTIVITIES_URL}/${username}`,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': header
        },
        params: goodParams
    }).then(res => {
        return res.data
    })
}
export async function postActivity(header,data) {
    return axios({
        url: POST_ACTIVITY,
        baseURL: baseUrl,
        method: 'POST',
        headers: {
            'Authorization': header
        },
        data
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}
