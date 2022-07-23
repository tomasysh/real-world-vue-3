import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 'Adam Jahr',
    events: []
  },
  mutations: {
    ADD_EVENT(state: any, event) {
      state.events = [...state.events, event];
    }
  },
  actions: {},
  modules: {}
})