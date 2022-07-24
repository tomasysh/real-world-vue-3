import EventService from '@/services/EventService';
import { Event } from '@/shared/models/event.model';

export const namespaced = true;

export const state = {
    events: [],
    eventTotal: 0,
    event: {}
};

export const mutations = {
    ADD_EVENT(state: any, event: Event) {
        state.events = [ ...state.events, event ];
    },
    SET_EVENTS(state: any, events: Event[]) {
        state.events = [ ...events ];
    },
    SET_EVENTS_TOTAL(state: any, eventsTotal: number) {
        state.eventsTotal = eventsTotal;
    },
    SET_EVENT(state: any, event: Event) {
        state.event = { ...event }; 
    }
};

export const actions = {
    createEvent({ commit, dispatch }: any, event: Event) {
        return EventService.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event);
                const notification = {
                    type: 'success',
                    message: 'Your event has been created'
                };
                dispatch('notification/add', notification, { root: true });
            })
            .catch((error) => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem creating your event: ' + error.message
                };
                dispatch('notification/add', notification, { root: true });
                throw error;
            });
    },
    fetchEvents({ commit, dispatch  }: any, { perPage, page }: { perPage: number, page: number }) {
        return EventService.getEvents(perPage, page)
            .then((response) => {
                commit('SET_EVENTS_TOTAL', +response.headers['x-total-count']);
                commit('SET_EVENTS', response.data);
            })
            .catch((error) => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem fetching events: ' + error.message
                };
                dispatch('notification/add', notification, { root: true });
                throw error;
            });
    },
    fetchEvent({ commit, state, dispatch }: any, id: number) {
        const existingEvent: Event = state.events.find((event: any) => event.id === id);
        if (existingEvent) {
        commit('SET_EVENT', existingEvent);
        } else {
        return EventService.getEvent(id)
            .then((response) => {
            commit('SET_EVENT', response.data);
            })
            .catch((error) => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem fetching event: ' + error.message
                };
                dispatch('notification/add', notification, { root: true });
                throw error;
            });
        }
    }
};

export const getters = {
    categoriesLength: (state: any, commit: any, rootState: any) => {
        return rootState.categories.length;
    },
    petAllowedEvents: (state: any) => {
        return state.events.filter((event: any) => event.petsAllowed);
    },
    getEventById: (state: any) => (id: number) => {
        return state.events.find((event: Event) => event.id === id);
    },
};