import { apiClient } from './ApiClient';

export default {
    getEvents() {
        return apiClient.get('/events')
      },
    getEvent(id: any) {
        return apiClient.get(`/events/${ id }`);
    },
    postEvent(event: any) {
        return apiClient.post('/events', event);
    }
}