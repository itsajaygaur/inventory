import axios from "axios";

console.log('--> ', process.env.API_URL)

export const instance = axios.create({
    baseURL: process.env.API_URL,
    // baseURL: 'http://localhost:9000',
    headers: {
        Token: process.env.TOKEN
    }

})