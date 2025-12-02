import axios from 'axios'

const api = axios.create({
    baseURL: 'gateway-production-d435.up.railway.app'
})

export default api