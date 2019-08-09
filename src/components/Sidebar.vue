<template>
  <div class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style="width: 250px">
    <div class="w3-container w3-display-container w3-padding-16">
      <h3 class="w3-wide">
        <b>LOGO</b>
      </h3>
    </div>
    <div class="w3-padding-64 w3-large w3-text-grey" style="font-weight: bold">
      <a class="w3-bar-item w3-button">Shirts</a>
      <a class="w3-bar-item w3-button">Dresses</a>
      <a class="w3-bar-item w3-button" v-on:click="onJeansClick">
        Jeans
        <i class="fa fa-caret-down"></i>
      </a>
      <div class="w3-bar-block w3-hide w3-padding-large w3-medium w3-show" v-if="jeansList">
        <a class="w3-bar-item w3-button">Skinny</a>
        <a class="w3-bar-item w3-button">Relaxed</a>
        <a class="w3-bar-item w3-button">Bootcut</a>
        <a class="w3-bar-item w3-button">Straight</a>
      </div>
      <a class="w3-bar-item w3-button">Jackets</a>
      <a class="w3-bar-item w3-button">Gymwear</a>
      <a class="w3-bar-item w3-button">Blazers</a>
      <a class="w3-bar-item w3-button">Shoes</a>
    </div>
    <a class="w3-bar-item w3-button w3-padding">Contact</a>
    <a class="w3-bar-item w3-button w3-padding" v-on:click="onNewsletterClick">Newsletter</a>
    <a class="w3-bar-item w3-button w3-padding">Subscribe</a>

    <div id="newsletter" class="w3-modal" style="display: block; z-index: 4" v-if="newsletter">
      <div class="w3-modal-content w3-animate-zoom" style="padding:32px">
        <div class="w3-container w3-white w3-center">
          <i
            v-on:click="onNewsletterClick"
            class="fa fa-remove w3-right w3-button w3-transparent w3-xxlarge"
          ></i>
          <h2 class="w3-wide">NEWSLETTER</h2>
          <p>Join our mailing list to receive updates on new arrivals and special offers.</p>
          <p>
            <input class="w3-input w3-border" type="text" placeholder="Enter e-mail" />
          </p>
          <button
            type="button"
            class="w3-button w3-padding-large w3-red w3-margin-bottom"
            v-on:click="onNewsletterClick"
          >Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      jeansList: false,
      newsletter: false,
    };
  },
  methods: {
    onJeansClick() {
      this.jeansList = !this.jeansList;
    },
    onNewsletterClick() {
      this.newsletter = !this.newsletter;
    },
  },
};
</script>
