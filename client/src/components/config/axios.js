import Axios from 'axios'

const config = Axios.create({
    baseURL: 'http://localhost:3015'
})

export default config