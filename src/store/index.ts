import { createStore } from 'vuex'

import EventService from '@/services/EventService';
import { Event } from '@/shared/models/event.model';

export default createStore({
  state: {
    user: { id: 'abc123', name: 'tomasysh' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    event: {}
  },
  mutations: {
    ADD_EVENT(state: any, event: Event) {
      state.events = [ ...state.events, event ];
    },
    SET_EVENTS(state: any, events: Event[]) {
      state.events = [ ...events ];
    },
    SET_EVENT(state: any, event: Event) {
      state.event = { ...event }; 
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
      })
      .catch((error) => {
        throw(error);
      });
    },
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then((response) => {
          commit('SET_EVENTS', response.data);
        })
        .catch((error) => {
          throw(error);
        });
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent: Event = state.events.find((event: any) => event.id === id);
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        return EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            throw(error);
          });
      }
    }
  },
  getters: {
    categoriesLength: (state) => {
      return state.categories.length;
    },
    petAllowedEvents: (state) => {
      return state.events.filter((event: any) => event.petsAllowed);
    },
    getEventById: (state) => (id: number) => {
      return state.events.find((event: Event) => event.id === id);
    }
  },
  modules: {}
})