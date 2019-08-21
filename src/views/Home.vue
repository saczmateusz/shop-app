<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Welcome</p>
      <p class="w3-right">
        <router-link :to="{name: 'cart'}" class="link">
          <span class="cart" v-if="cartCount !== 1">{{cartCount}} items</span>
          <span class="cart" v-if="cartCount === 1">{{cartCount}} item</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-display-container w3-container">
      <img src="../assets/images/jeans.jpg" alt="Jeans" style="width:100%" />
      <div class="w3-display-topleft w3-text-white" style="padding:24px 48px">
        <h1 class="w3-jumbo w3-hide-small">New arrivals</h1>
        <h1 class="w3-hide-large w3-hide-medium">New arrivals</h1>
        <h1 class="w3-hide-small">COLLECTION 2016</h1>
        <p>
          <a href="#jeans" class="w3-button w3-black w3-padding-large w3-large">SHOP NOW</a>
        </p>
      </div>
    </div>
    <div v-if="items">
      <div class="w3-container w3-text-grey">
        <p>{{rand}} items</p>
      </div>
      <div class="w3-container w3-grayscale nopadding">
        <div class="w3-col l3 s6" v-for="(item, index) in getRandomItems(rand)" v-bind:key="index">
          <div class="w3-container item trigger flashing">
            <span class="w3-tag tag" v-if="tagNew.indexOf(item.id) !== -1">New</span>
            <span class="w3-tag tag" v-else-if="tagSale.indexOf(item.id) !== -1">Sale</span>
            <router-link
              :to="{name: 'product', params: { id: item.id }}"
              class="link img-trigger"
              style="z-index: 2"
            >
              <img
                :src="item.image"
                style="width: 100%"
              />
            </router-link>
            <div class="on-hover">
              <button class="w3-button w3-black" style="z-index: 3" v-on:click="saveToCart(item)">
                Buy now
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
            <p>
              <router-link
                :to="{name: 'product', params: { id: item.id }}"
                class="link"
              >{{item.product_name}}</router-link>
              <br />
              <b>{{item.price}}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="await" v-else>Retrieving items for you</div>
    <Popup v-if="popup" v-on:switch="popup=!popup" type="addItem" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Popup from '@/components/Popup.vue';

export default {
  name: 'home',
  components: {
    Popup,
  },
  computed: {
    ...mapState(['items']),
    ...mapGetters(['cartCount']),
  },
  data() {
    return {
      rand: null,
      popup: false,
      staticList: null,
      tagNew: [],
      tagSale: [],
    };
  },
  beforeMount() {
    this.tagNew = [1, 8, 12];
    this.tagSale = [16, 21, 29];
  },
  mounted() {
    this.staticList = null;
    this.rand = Math.floor(Math.random() * 10 + 7);
  },
  methods: {
    ...mapActions(['addToCart']),
    getRandomItems(items) {
      if (this.staticList === null) {
        const result = [];
        const indexes = [];
        const arrLength = 30;
        while (result.length < items) {
          const i = Math.floor(Math.random() * arrLength);
          if (indexes.indexOf(i) === -1) {
            indexes.push(i);
            result.push(this.items[i]);
          }
        }
        this.staticList = result;
      }
      return this.staticList;
    },
    saveToCart(item) {
      this.addToCart(item);
      this.popup = !this.popup;
    },
  },
};
</script>
