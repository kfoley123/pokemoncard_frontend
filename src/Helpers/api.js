import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000/api/",
    // baseURL: "https://dry-tor-16883.herokuapp.com/api/",
});
