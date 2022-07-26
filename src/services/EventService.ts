import { apiClient } from './ApiClient';

export default {
    getEvents(perPage: number, page: number) {
        return apiClient.get(`/events?_limit=${ perPage }&_page=${ page }`)
      },
    getEvent(id: any) {
        return apiClient.get(`/events/${ id }`);
    },
    postEvent(event: any) {
        return apiClient.post('/events', event);
    }
}