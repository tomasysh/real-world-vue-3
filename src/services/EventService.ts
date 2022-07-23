import { apiClient } from './ApiClient';

export default {
    getEvents(perPage: any, page: any) {
        return apiClient.get(`/events?_limit=${ perPage }&_page=${ page }`);
    },
    getEvent(id: any) {
        return apiClient.get(`/events/${ id }`);
    } 
}