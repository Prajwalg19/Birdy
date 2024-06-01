import axios from "axios";

const ok = axios.create(
    {
        withCredentials: true,
        baseURL: "https://birdy-livid.vercel.app"
    }
)

export default ok;
