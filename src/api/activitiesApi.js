import axios from 'axios'
import * as ct from '../constants'

const baseUrl = ct.BASE_URL
const GET_USER_ACTIVITIES_URL = '/api/v1/activities/for'
function generateAuthHeader(credentials){
    return `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`
}

export async function getActivities(header, username, params) {
    return axios({
        url: `${GET_USER_ACTIVITIES_URL}/${username}`,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': header
        },
        params
    }).then(res => {
        return res.data
    })
}
