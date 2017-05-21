import axios from "axios"

const getToken = function() {
    let current_user = JSON.parse(window.sessionStorage.getItem("user"))
    let token = current_user.token
    return token
}

export const http = axios.create({
    baseURL: "http://localhost:8000/v1/",
    headers: {"x-access-token": getToken()}
})