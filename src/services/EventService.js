import { apiClient } from './ApiClient';

export default {
    getEvents(perPage, page) {
        return apiClient.get(`/events?_limit=${ perPage }&_page=${ page }`);
    },
    getEvent(id) {
        return apiClient.get(`/events/${ id }`);
    } 
}