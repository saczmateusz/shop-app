<template>
  <div id="pop-up" class="w3-modal" style="display: block; z-index: 4">
    <div class="w3-modal-content w3-animate-zoom" style="padding:32px">
      <div class="w3-container w3-white w3-center">
        <i
          v-on:click="$emit('switch', false)"
          class="fa fa-remove w3-right w3-button w3-transparent w3-xxlarge"
          v-if="type !== 'purchase'"
        ></i>
        <h2 class="w3-wide" v-if="type == 'addItem'">Great choice!</h2>
        <p v-if="type == 'addItem'">You have added 1 product to your cart.</p>
        <h2 class="w3-wide" v-if="type == 'purchase'">Thank you for shopping!</h2>
        <p v-if="type == 'purchase'">You have successfully bought our products.</p>
        <h2 class="w3-wide" v-if="type == 'newsletter'">NEWSLETTER</h2>
        <p
          v-if="type == 'newsletter'"
        >Join our mailing list to receive updates on new arrivals and special offers.</p>
        <p v-if="type == 'newsletter'">
          <input class="w3-input w3-border" type="text" placeholder="Enter e-mail" />
        </p>
        <router-link :to="{name: 'home'}" v-if="type === 'purchase'">
          <button
            type="button"
            class="w3-button w3-padding-large w3-red w3-margin-bottom"
            v-on:click="$emit('switch', false)"
          >BACK TO STORE</button>
        </router-link>
        <button
          type="button"
          class="w3-button w3-padding-large w3-red w3-margin-bottom"
          v-on:click="$emit('switch', false)"
          v-else
        >
          <div v-if="type === 'addItem'">BACK TO STORE</div>
          <div v-else>Subscribe</div>
        </button>
        <router-link :to="{name: 'cart'}" v-if="type === 'addItem'">
          <button
            type="button"
            class="w3-button w3-padding-large w3-black w3-margin-bottom"
            style="margin-left: 20px"
          >
            SEE YOUR SHOPPING CART
            <i
              class="fa fa-shopping-cart w3-margin-right right"
              style="margin-left: 5px"
            ></i>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    type: String,
  },
};
</script>
