import axios from 'axios'
import * as ct from '../constants'

const baseUrl = ct.BASE_URL
const RESULTS_URL = '/api/v1/results'
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
export async function getActivityById(header,id) {
    return axios({
        url: `${POST_ACTIVITY}/${id}`,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': header
        }
    }).then(res => {
        console.log(res.data)
        return res.data[0]
    })
}
export async function modifyPublishState(header,act) {
    return axios({
        url: `${POST_ACTIVITY}/${act._id}?modifyState=true`,
        baseURL: baseUrl,
        method: 'PUT',
        headers: {
            'Authorization': header
        },
        data: act
    }).then(res => {
        console.log(res.data)
        return act
    })
}
export async function updateActivity(header,act) {
    return axios({
        url: `${POST_ACTIVITY}/${act._id}`,
        baseURL: baseUrl,
        method: 'PUT',
        headers: {
            'Authorization': header
        },
        data: act
    }).then(res => {
        console.log(res.data)
        return act
    })
}
export async function getReviewActivities(header,options) {
    return axios({
        url: `${POST_ACTIVITY}`,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': header
        },
        params: options
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}
export async function publishActivity(header,act) {
    return axios({
        url: `${POST_ACTIVITY}/${act._id}/publish`,
        baseURL: baseUrl,
        method: 'PUT',
        headers: {
            'Authorization': header
        },
        data: act
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}
export async function declineActivity(header,id) {
    return axios({
        url: `${POST_ACTIVITY}/${id}/publish`,
        baseURL: baseUrl,
        method: 'PUT',
        headers: {
            'Authorization': header
        },
        params: {
            remove: true
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}

export async function getGameActivities(header,params) {
    return axios({
        url: `${POST_ACTIVITY}`,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': header
        },
        params
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}
export async function postAnswer(header,id,data) {
    return axios({
        url: `${POST_ACTIVITY}/${id}/answer`,
        baseURL: baseUrl,
        method: 'PUT',
        headers: {
            'Authorization': header
        },
        data
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}
export async function postResults(header,data) {
    return axios({
        url: RESULTS_URL,
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
export async function sendFeedback(header,id,data) {
    return axios({
        url: `${POST_ACTIVITY}/${id}/feedback`,
        baseURL: baseUrl,
        method: 'PUT',
        headers: {
            'Authorization': header
        },
        data
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}
