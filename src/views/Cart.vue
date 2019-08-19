<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Shopping cart</p>
      <p class="w3-right">
        <router-link :to="{name: 'cart'}" class="link">
          <span class="cart" v-if="cartCount !== 1">{{cartCount}} items</span>
          <span class="cart" v-if="cartCount === 1">{{cartCount}} item</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div
      class="w3-container w3-text-grey"
      style="font-size: 3em"
      v-if="cartCount > 0"
    >Chosen products</div>
    <div class="empty" v-else>Your cart is empty</div>
    <div class="list" v-if="cartCount > 0">
      <div
        class="w3-container w3-grayscale cart-item flashing"
        v-for="(item, index) in cart"
        v-bind:key="index"
      >
        <div class="w3-col cart-item-count">{{item.count}}×</div>
        <div class="w3-rest">
          <router-link :to="{name: 'product', params: { id: item.id }}" class="link">
            <img :src="item.image" class="w3-left cart-item-img" />
          </router-link>
          <div class="w3-padding cart-item-info">
            <router-link :to="{name: 'product', params: { id: item.id }}" class="link">
              <p class="cart-item-info-p">{{item.product_name}}</p>
            </router-link>
            <p class="cart-item-info-p w3-text-gray">{{item.price}}/pc.</p>
            <p class="cart-item-info-p">${{(item.price.slice(1) * item.count).toFixed(2)}}</p>
          </div>
          <div class="w3-right remove-button">
            <button class="w3-button w3-black" v-on:click="dropFromCart(item)">REMOVE</button>
          </div>
        </div>
      </div>
    </div>
    <div class="w3-container w3-white w3-center">
      <button
        type="button"
        class="w3-button w3-left w3-black w3-margin-bottom"
        @click="$router.go(-1)"
      >BACK TO STORE</button>
      <router-link :to="{name: 'checkout'}" v-if="cartCount > 0">
        <button type="button" class="w3-button w3-right w3-green w3-margin-bottom">
          CHECKOUT
          <i class="fa fa-arrow-right"></i>
        </button>
      </router-link>
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
  methods: {
    ...mapActions(['dropFromCart']),
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

.cart-item-info {
  display: inline-block;
}

.cart-item-info-p {
  margin: 0px;
  font-weight: bold;
  font-size: 1.3em;
  padding: 6px 0px;
}

.cart-item-img {
  width: 15%;
  display: inline-block;
}

.remove-button {
  display: inline;
  padding: 40px 0px;
}
</style>
