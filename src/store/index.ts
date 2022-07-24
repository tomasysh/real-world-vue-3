import { createStore } from 'vuex';

import * as user from '@/store/modules/user';
import * as event from '@/store/modules/event';
import * as notification from '@/store/modules/notification';

export default createStore({
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    // events: [],
    // eventTotal: 0,
    // event: {}
  },
  // mutations: {
  //   ADD_EVENT(state: any, event: Event) {
  //     state.events = [ ...state.events, event ];
  //   },
  //   SET_EVENTS(state: any, events: Event[]) {
  //     state.events = [ ...events ];
  //   },
  //   SET_EVENTS_TOTAL(state, eventsTotal) {
  //     state.eventsTotal = eventsTotal;
  //   },
  //   SET_EVENT(state: any, event: Event) {
  //     state.event = { ...event }; 
  //   }
  // },
  // actions: {
  //   createEvent({ commit }, event) {
  //     EventService.postEvent(event)
  //     .then(() => {
  //       commit('ADD_EVENT', event);
  //     })
  //     .catch((error) => {
  //       throw(error);
  //     });
  //   },
  //   fetchEvents({ commit }, { perPage, page }) {
  //     return EventService.getEvents(perPage, page)
  //       .then((response) => {
  //         commit('SET_EVENTS_TOTAL', +response.headers['x-total-count']);
  //         commit('SET_EVENTS', response.data);
  //       })
  //       .catch((error) => {
  //         throw(error);
  //       });
  //   },
  //   fetchEvent({ commit, state }, id) {
  //     const existingEvent: Event = state.events.find((event: any) => event.id === id);
  //     if (existingEvent) {
  //       commit('SET_EVENT', existingEvent);
  //     } else {
  //       return EventService.getEvent(id)
  //         .then((response) => {
  //           commit('SET_EVENT', response.data);
  //         })
  //         .catch((error) => {
  //           throw(error);
  //         });
  //     }
  //   }
  // },
  // getters: {
  //   categoriesLength: (state) => {
  //     return state.categories.length;
  //   },
  //   petAllowedEvents: (state) => {
  //     return state.events.filter((event: any) => event.petsAllowed);
  //   },
  //   getEventById: (state) => (id: number) => {
  //     return state.events.find((event: Event) => event.id === id);
  //   },
  // },
})