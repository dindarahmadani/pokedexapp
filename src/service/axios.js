import axios from "axios";
import { config } from "daisyui";
const baseURL = "http://localhost:3001"

export const client = axios.create({
    baseURL
})

client.interceptors.request.use((config) => {
    return config;
});

client.interceptors.response.use(
    function (response){
        return response;
    },
    function (error) {
        return error
    }
);