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
    dropFromCart(state, payload) {
      const index = state.cart.indexOf(payload);
      state.cart.splice(index, 1);
    },
  },
  actions: {
    setItems(context, payload) {
      context.commit('setItems', payload);
    },
    addToCart(context, payload) {
      context.commit('addToCart', payload);
    },
    dropFromCart(context, payload) {
      context.commit('dropFromCart', payload);
    },
  },
  getters: {
    // eslint-disable-next-line
    cartCount: (state) => {
      return state.cart.length;
    },
  },
});
