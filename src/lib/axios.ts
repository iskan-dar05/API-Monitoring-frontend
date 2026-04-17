import axios from 'axios'


const api = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials:true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;


api.interceptors.response.use(
	(response) => response,
	(error) => {
		if(error.response?.status === 401){
			console.warn("Unothorized - redirect to login")

		}

		return Promise.reject(error)
	}
);

export default api;