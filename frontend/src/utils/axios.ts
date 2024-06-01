import axios from "axios";

const ok = axios.create(
    {
        withCredentials: true,
        //baseURL: "https://birdy-livid.vercel.app"
        baseURL: "http://localhost:4000"
    }
)

export default ok;
