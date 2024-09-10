import axios, {HttpStatusCode} from "axios";


axios.interceptors.request.use((config) => {
    console.log("Axios request:");
    console.log(config);
    const jwt = localStorage.getItem("jwtToken");
    if (jwt !== null && jwt.length > 0) {
        config.headers.set("Authorization", `Bearer ${jwt}`, true);
    }
    config.headers.set("Content-Type", "application/json");
    return config;
}, (error) => {
    console.error("Axios request error:");
    console.error(error);
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
        console.log("Axios response:");
        console.log(response);
        return response;
    },
    (error) => {
        console.error("Axios response error:");
        console.error(error);
        if (error.code === "ERR_NETWORK") {
            return Promise.reject({code: HttpStatusCode.InternalServerError, message: error.message});
        }
        return Promise.reject({code: error.response.status, message: error.message});
    }
)
