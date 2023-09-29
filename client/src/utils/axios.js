import axios from "axios";

const port = process.env.VUE_APP_PORT || '3000';
const URL = "http://localhost:"+port;

const api = axios.create({
    baseURL : URL+'/api',
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json'
    }
})

const normal = axios.create({
    baseURL : URL,
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json'
    }
})

export {
    api,
    normal,
}