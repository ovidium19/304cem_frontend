import axios from 'axios'
import * as ct from '../constants'

const baseUrl = ct.BASE_URL
const GET_RESULTS_URL = '/api/v1/results'
function generateAuthHeader(credentials){
    return `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`
}

export async function getResults(header) {
    return axios({
        url: GET_RESULTS_URL,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': header
        }
    }).then(res => {
        return res.data
    })
}
export async function getResultsStats(header, params) {
    return axios({
        url: GET_RESULTS_URL,
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
