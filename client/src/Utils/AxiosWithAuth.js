import axios from 'axios';
import {REACT_APP_API_URL} from './Config'
const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL: REACT_APP_API_URL,
        headers: {
            Authorization:  token,
        },
    });
};

 export default axiosWithAuth;