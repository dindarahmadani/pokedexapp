import axios from "axios";
import { config } from "daisyui";
const baseURL = "https://dinda-pokedex-server-production-50dc.up.railway.app"

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