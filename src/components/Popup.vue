<template>
  <div id="pop-up" class="w3-modal" style="display: block; z-index: 4">
    <div class="w3-modal-content w3-animate-zoom" style="padding:32px">
      <div class="w3-container w3-white w3-center">
        <i
          v-on:click="$emit('switch', false)"
          class="fa fa-remove w3-right w3-button w3-transparent w3-xxlarge"
        ></i>
        <h2 class="w3-wide">Great choice!</h2>
        <p>You have added 1 product to your cart.</p>
        <button
          type="button"
          class="w3-button w3-padding-large w3-red w3-margin-bottom"
          v-on:click="$emit('switch', false)"
        >BACK TO STORE</button>
        <router-link :to="{name: 'cart'}">
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
};
</script>
