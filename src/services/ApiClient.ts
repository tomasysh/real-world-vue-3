import axios from 'axios';

export const apiClient = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/tomasysh/real-world-vue-3',
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-TYpe': 'application/json'
    }
});

