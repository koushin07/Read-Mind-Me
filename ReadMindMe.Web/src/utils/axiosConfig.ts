// axiosConfig.js
import axios  from 'axios';
import { toast } from 'sonner';


const sleep = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
 }

// Create an Axios instance with a base URL and default headers
const api = axios.create({
    baseURL: 'http://localhost:5081/api', // Set your API base URL here
    headers: {
        'Content-Type': 'application/json',
        // You can add other default headers here
    },
});

// Add a request interceptor to include auth tokens automatically
api.interceptors.request.use(
    (config) => {
        // Set the authorization token if available
        const token = localStorage.getItem('token'); // or wherever you store your token
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Add a response interceptor to catch errors globally
api.interceptors.response.use(
    async (response) => {
        // Handle any additional error handling or transformation here
        await sleep(2000);
        return response; // Return the original response if no additional transformation is needed
    }, // Forward successful responses
    (error) => {
        // Handle specific status codes or generic error actions
        if (error.response && error.response.status === 401) {
            // e.g., Handle unauthorized errors (maybe redirect to login)
            console.error("Unauthorized access - Redirecting to login.");
            // You can redirect to login or show a notification here
        } else if (error.response && error.response.status >= 400) {
            // Handle other client/server errors
            const errors = error.response.data.errors
            Object.keys(errors).forEach(field => {
                const errorMessages = errors[field];
                errorMessages.forEach((message: string) => {
                    toast.error("error occured", {
                        description: message
            })
                });
            })
        }

        throw error
    }
);

export default api;
