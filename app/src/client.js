import axios from "axios"

export const http = axios.create({
    baseURL: "http://localhost:8000/v1/"
})

export const items = {
    query: () => {
        return http.get("items")
    }
}