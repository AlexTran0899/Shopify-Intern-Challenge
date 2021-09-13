import axios from'axios';

const axiosWithAuth = () =>{
    
    return axios.create(
        {
            headers:{
              Authorization: JSON.parse(window.localStorage.getItem('token')),
            },
            baseURL: "https://use-my-tech-stuff-backend-1.herokuapp.com",
          }
          
    )
}
export default axiosWithAuth;