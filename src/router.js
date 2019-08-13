import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Category from './views/Category.vue';
import Cart from './views/Cart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/category/:cat',
      name: 'category',
      component: Category,
    },
    {
      path: '/account/cart',
      name: 'cart',
      component: Cart,
    },
  ],
});
