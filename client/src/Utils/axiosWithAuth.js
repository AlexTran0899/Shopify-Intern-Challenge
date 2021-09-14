import axios from'axios';

const axiosWithAuth = () =>{
    
    return axios.create(
        {
            headers:{
              Authorization: JSON.parse(window.localStorage.getItem('token')),
            },
            baseURL: process.env.REACT_APP_API_URI,
          }
          
    )
}
export default axiosWithAuth;