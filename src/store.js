import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: null,
    cart: [],
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload;
    },
    addToCart(state, payload) {
      state.cart.push(payload);
    },
  },
  actions: {
    setItems(context, payload) {
      context.commit('setItems', payload);
    },
    addToCart(context, payload) {
      context.commit('addToCart', payload);
    },
  },
  getters: {
    // eslint-disable-next-line
    cartCount: (state) => {
      return state.cart.length;
    },
  },
});
