import axios from "axios";

const ok = axios.create(
    {
        withCredentials: true,
        baseURL: "http://localhost:4000/"
    }
)

export default ok;
