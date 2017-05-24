import axios from "axios"

const getToken = function() {
    console.log("get token")
    let current_user = JSON.parse(window.sessionStorage.getItem("user"))
    if (current_user && current_user.token ) {
        return current_user.token
    } else {
        return null
    }
}

export const http = axios.create({
    baseURL: "http://localhost:8000/v1/",
    headers: {"x-access-token": getToken()}
})