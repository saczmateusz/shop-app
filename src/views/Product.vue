<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Products | {{item.id}}</p>
      <p class="w3-right">
        <router-link :to="{name: 'cart'}" class="link">
          <span class="cart" v-if="cartCount !== 1">{{cartCount}} items</span>
          <span class="cart" v-if="cartCount === 1">{{cartCount}} item</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-container w3-grayscale" style="min-height: 700px">
      <div class="w3-row">
        <div class="w3-col" style="width: 43%">
          <img :src="item.image" style="width: 100%" />
        </div>
        <div class="w3-rest" style="padding-left: 60px; font-weight: bolder">
          <p style="font-size: 2em; margin-top: 20px; font-weight: normal">{{item.product_name}}</p>
          <p style="font-size: 1em; margin-top: 20px">PRODUCT ID: {{item.id}}</p>
          <p style="font-size: 1.3em; margin-top: 20px">{{item.company}}</p>
          <p style="font-size: 1em; margin-top: 20px">{{item.short_description}}</p>
          <p style="font-size: 1.8em; margin-top: 20px">{{item.price}}</p>
        </div>
      </div>
      <p style="font-weight: bold; line-height: 30px; margin: 40px 0">{{item.description}}</p>
    </div>
    <div class="w3-container w3-white w3-center">
      <button
        type="button"
        class="w3-button w3-left w3-black w3-margin-bottom"
        @click="$router.go(-1)"
      >BACK TO STORE</button>
      <button
        type="button"
        class="w3-button w3-right w3-green w3-margin-bottom"
        v-on:click="saveToCart(item)"
      >
        ADD TO CART
        <i class="fa fa-shopping-cart"></i>
      </button>
    </div>
    <Popup v-if="popup" v-on:switch="popup=!popup" type="addItem" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Popup from '@/components/Popup.vue';

export default {
  name: 'product',
  components: {
    Popup,
  },
  beforeMount() {
    this.item = this.items[this.$route.params.id - 1];
  },
  data() {
    return {
      item: null,
      popup: false,
    };
  },
  computed: {
    ...mapGetters(['cartCount']),
    ...mapState(['items']),
  },
  methods: {
    ...mapActions(['addToCart']),
    saveToCart(item) {
      this.addToCart(item);
      this.popup = !this.popup;
    },
  },
};
</script>

<style>
.empty {
  height: 479.875px;
  font-size: 2em;
  color: grey;
  margin: 110px 0px;
  padding: 200px;
  text-align: center;
}

.cart-flashing:active {
  animation: flash 0.3s;
}

@keyframes flash {
  0% {
    padding-left: 16px;
    padding-right: 16px;
  }
  50% {
    padding-left: 19px;
    padding-right: 19px;
  }
  100% {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.cart {
  font-size: 0.8em;
  font-weight: bolder;
}

.cart-list {
  min-height: 600px;
  margin: 16px 0px;
}

.cart-item {
  padding: 0px 16px;
  height: 165px;
}

.cart-item-count {
  font-size: 3em;
  padding: 40px 0px;
  width: 17%;
  height: 100%;
}

.remove-button {
  display: inline;
  padding: 40px 0px;
}

.item-info {
  display: inline-block;
}

.item-info-p {
  margin: 0px;
  font-weight: bold;
  font-size: 1.3em;
  padding: 6px 0px;
}

.item-img {
  width: 15%;
  display: inline-block;
}
</style>
