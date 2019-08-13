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
      // eslint-disable-next-line
      const index = state.cart.findIndex((element) => {
        return element.id === payload.id;
      });
      if (index === -1) state.cart.push({ ...payload, count: 1 });
      else state.cart[index].count += 1;
    },
    dropFromCart(state, payload) {
      const index = state.cart.indexOf(payload);
      if (state.cart[index].count === 1) state.cart.splice(index, 1);
      else state.cart[index].count -= 1;
    },
    clearCart(state) {
      state.cart = [];
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
    clearCart(context) {
      context.commit('clearCart');
    },
  },
  getters: {
    // eslint-disable-next-line
    cartCount: (state) => {
      return state.cart.reduce((a, b) => a + (b.count || 0), 0);
    },
    // eslint-disable-next-line
    cartValue: (state) => {
      return state.cart.reduce((a, b) => a + (b.count * b.price.slice(1) || 0), 0).toFixed(2);
    },
  },
});
