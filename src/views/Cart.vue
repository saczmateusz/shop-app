<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Shopping cart</p>
      <p class="w3-right">
        <router-link to="/" class="cart-link">
          <span class="cart">{{cartCount}} items</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-container w3-text-grey" style="font-size: 3em">Chosen products</div>
    <div class="cart-list" v-if="cart">
      <div
        class="w3-container w3-grayscale cart-item cart-trigger cart-flashing"
        v-for="(item, index) in cart"
        v-bind:key="index"
      >
        <div class="w3-col cart-item-count">{{item.count}}×</div>
        <div class="w3-rest">
          <img :src="item.image" style="width: 15%; display: inline" class="cart-img-trigger" />
          <div class="w3-padding item-info">
            <p class="item-info-p">{{item.product_name}}</p>
            <p class="item-info-p">
              <b>{{item.price}}</b>
            </p>
          </div>
          <div class="w3-right remove-button">
            <button class="w3-button w3-black" v-on:click="dropFromCart(item)">REMOVE</button>
          </div>
        </div>
      </div>
    </div>
    <div class="await" v-else>Retrieving items for you</div>
    <div class="w3-container w3-white w3-center">
      <button
        type="button"
        class="w3-button w3-left w3-black w3-margin-bottom"
        @click="$router.go(-1)"
      >BACK TO STORE</button>
      <!-- <router-link :to="{name: 'cart'}"> -->
      <button
        type="button"
        class="w3-button w3-right w3-green w3-margin-bottom"
        @click="$router.go(-1)"
      >
        CHECKOUT
        <i class="fa fa-arrow-right"></i>
      </button>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartCount']),
  },
  data() {
    return {
      popup: false,
    };
  },
  mounted() {},
  methods: {
    ...mapActions(['dropFromCart']),
    getRandomItemsdd(items) {
      if (this.staticList === null) {
        const result = [];
        const indexes = [];
        const arrLength = 30;
        while (result.length < items) {
          const i = Math.floor(Math.random() * arrLength);
          if (indexes.indexOf(i) === -1) {
            indexes[indexes.length] = i;
            result[result.length] = this.items[i];
          }
        }
        this.staticList = result;
      }
      return this.staticList;
    },
    getRandomItemsddddd(items) {
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
  },
};
</script>

<style>
.await {
  height: 200px;
  font-size: 2em;
  color: grey;
  margin: 110px 0px;
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

.cart-link {
  text-decoration: none;
  background-color: rgb(255, 255, 255);
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
  padding: 50px 0px;
}

.item-info {
  display: inline-block;
}

.item-info-p {
  margin: 0px;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
