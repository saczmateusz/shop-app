<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Checkout</p>
      <p class="w3-right">
        <router-link :to="{name: 'cart'}" class="checkout-link">
          <span class="checkout" v-if="cartCount !== 1">{{cartCount}} items</span>
          <span class="checkout" v-if="cartCount === 1">{{cartCount}} item</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-container w3-text-grey" style="font-size: 3em">Checkout & Payment</div>
    <div class="checkout-list">
      <div
        class="w3-container w3-grayscale checkout-item"
        v-for="(item, index) in cart"
        v-bind:key="index"
      >
        <div class="w3-col checkout-item-count">{{item.count}}×</div>
        <div class="w3-rest checkout-item-info">
          <div style="display: inline-block">
            <span class="checkout-item-info-p">{{item.product_name}}</span>
            <span class="checkout-item-info-p w3-text-gray">({{item.price}}/pc.)</span>
          </div>
          <div class="w3-right ch-item-sum">${{(item.price.slice(1) * item.count).toFixed(2)}}</div>
        </div>
      </div>
      <div class="w3-container">
        <hr class="sum-line" />
        <div class="w3-right sum-value">
          <span style="padding-right: 20px; font-size: 0.8em">TOTAL:</span>
          <span style="font-size: 1.5em">${{cartValue}}</span>
        </div>
      </div>
      <div class="w3-container">
        <span class="form-header">Enter your address and credit card data</span>
        <div class="w3-quarter" style="padding-right: 16px">
          <span class="form-subtitle">Your address</span>
          <div class="form-input">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </div>
          <div class="form-input">
            <label for="name">Phone</label>
            <input type="text" id="phone" placeholder="0-100-200-300" />
          </div>
          <div class="form-input">
            <label for="name">Postal Code</label>
            <input type="text" id="postal-code" placeholder="10-200" />
          </div>
          <div class="form-input">
            <label for="name">Town</label>
            <input type="text" id="town" placeholder="New York" />
          </div>
          <div class="form-input">
            <label for="name">Street</label>
            <input type="text" id="street" placeholder="1st Street Avenue" />
          </div>
        </div>
        <div class="w3-quarter" style="padding-right: 16px">
          <span class="form-subtitle">Credit card</span>
          <div class="form-input">
            <label for="name">Number</label>
            <input type="text" id="number" placeholder="---- ---- ---- ----" />
          </div>
          <div class="form-input">
            <label for="name">Expiry date</label>
            <input type="text" id="expiration" placeholder="--/----" />
          </div>
          <div class="form-input">
            <label for="name">CVV</label>
            <input type="text" id="cvv" placeholder="---" />
          </div>
        </div>
      </div>
    </div>
    <div class="w3-container w3-white w3-center">
      <button
        type="button"
        class="w3-button w3-left w3-black w3-margin-bottom"
        @click="$router.go(-1)"
      >BACK TO SHOPPING CART</button>
      <button
        type="button"
        class="w3-button w3-right w3-green w3-margin-bottom"
        v-on:click="submit()"
      >
        ORDER & PAY
        <i class="fa fa-arrow-right"></i>
      </button>
    </div>
    <Popup v-if="popup" v-on:switch="popup=!popup" type="purchase" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Popup from '@/components/Popup.vue';

export default {
  name: 'checkout',
  components: {
    Popup,
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartCount', 'cartValue']),
  },
  data() {
    return {
      popup: false,
    };
  },
  mounted() {},
  methods: {
    ...mapActions(['clearCart']),
    submit() {
      this.clearCart();
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

.checkout-flashing:active {
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

.checkout {
  font-size: 0.8em;
  font-weight: bolder;
}

.checkout-list {
  min-height: 600px;
  margin: 16px 0px;
}

.checkout-link {
  text-decoration: none;
  background-color: rgb(255, 255, 255);
}

.checkout-link:hover {
  color: rgb(220, 220, 220);
}

.checkout-item {
  padding: 0px 16px;
  height: 50px;
}

.checkout-item-count {
  font-size: 1.2em;
  padding: 8px 0px;
  width: 9%;
  height: 100%;
  font-weight: bold;
}

.ch-item-sum {
  display: inline;
  margin: 0px;
  font-weight: bold;
  font-size: 1.2em;
}

.checkout-item-info {
  height: 100%;
  padding: 8px 0px;
}

.checkout-item-info-p {
  margin: 0px;
  font-weight: bold;
  font-size: 1.2em;
  padding: 0px 20px 0px 0px;
}

.sum-line {
  border-top: 2px solid rgb(200, 200, 200);
}

.sum-value {
  font-weight: bold;
}

.form-header {
  display: block;
  margin: 20px 0px;
  font-weight: bolder;
  font-size: 2em;
}

.form-subtitle {
  display: block;
  margin-bottom: 20px;
  font-weight: bolder;
  font-size: 1.5em;
}

.form-input {
  display: block;
  font-weight: bold;
  margin-bottom: 20px;
}

input[type='text'] {
  border: 2px solid rgb(200, 200, 200);
  border-radius: 5px;
  padding: 10px;
}
</style>
