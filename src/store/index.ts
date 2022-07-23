import { createStore } from 'vuex'

import EventService from '@/services/EventService';

export default createStore({
  state: {
    user: 'tomasysh',
    events: [],
    event: {}
  },
  mutations: {
    ADD_EVENT(state: any, event) {
      state.events = [ ...state.events, event ];
    },
    SET_EVENTS(state: any, events) {
      state.events = [ ...events ];
    },
    SET_EVENT(state: any, event) {
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
        console.log(error);
      });
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then((response) => {
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event: any) => event.id === id);
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
  modules: {}
})