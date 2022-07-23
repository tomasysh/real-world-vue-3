import { apiClient } from './ApiClient.js';

export default {
    getEvents() {
        return apiClient.get('/events');
    }
}