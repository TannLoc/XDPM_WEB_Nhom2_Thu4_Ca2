import axios from "axios";

export const locationApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOCATION
})