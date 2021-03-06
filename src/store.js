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
      localStorage.setItem('shopItems', JSON.stringify(payload));
    },
    addToCart(state, payload) {
      const index = state.cart.findIndex(element => element.id === payload.id);
      if (index === -1) {
        state.cart.push({ ...payload, count: 1 });
      } else {
        state.cart[index].count += 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    dropFromCart(state, payload) {
      const index = state.cart.indexOf(payload);
      state.cart.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    setCart(state, payload) {
      state.cart = payload;
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
    setCart(context, payload) {
      context.commit('setCart', payload);
    },
  },
  getters: {
    cartCount: state => state.cart.reduce((a, b) => a + (b.count || 0), 0),
    cartValue: state => state.cart.reduce(
      (a, b) => a + (b.count * b.price.slice(1) || 0), 0,
    ).toFixed(2),
  },
});
