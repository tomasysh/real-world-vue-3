import { apiClient } from './ApiClient';

export default {
    getEvents() {
        return apiClient.get('/events');
    },
    getEvent(id) {
        return apiClient.get(`/events/${ id }`);
    } 
}