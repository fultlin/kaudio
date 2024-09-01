import axios from "axios";

const examplar = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default examplar