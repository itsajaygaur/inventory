import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Token: process.env.TOKEN
    }

})