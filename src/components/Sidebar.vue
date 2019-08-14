<template>
  <div class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style="width: 250px">
    <router-link class="rout" :to="{ name: 'home' }">
      <div class="w3-container w3-display-container w3-padding-16">
        <h3 class="w3-wide">
          <b>LOGO</b>
        </h3>
      </div>
    </router-link>
    <div class="w3-padding-64 w3-large w3-text-grey" style="font-weight: bold">
      <router-link
        :to="{ name: 'category', params: { cat: 'Shirts' }}"
        class="w3-bar-item w3-button"
      >Shirts</router-link>
      <router-link
        :to="{ name: 'category', params: { cat: 'Dresses' }}"
        class="w3-bar-item w3-button"
      >Dresses</router-link>
      <router-link
        :to="{ name: 'category', params: { cat: 'Jeans' }}"
        class="w3-bar-item w3-button"
      >
        Jeans
        <i class="fa fa-caret-down arrow" v-on:click="onJeansClick" id="jeansArrow"></i>
      </router-link>
      <div class="w3-bar-block w3-hide w3-padding-large w3-medium w3-show" v-if="jeansList">
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | skinny' }}"
          class="w3-bar-item w3-button"
        >Skinny</router-link>
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | relaxed' }}"
          class="w3-bar-item w3-button"
        >Relaxed</router-link>
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | bootcut' }}"
          class="w3-bar-item w3-button"
        >Bootcut</router-link>
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | straight' }}"
          class="w3-bar-item w3-button"
        >Straight</router-link>
      </div>
      <router-link
        :to="{ name: 'category', params: { cat: 'Jackets' }}"
        class="w3-bar-item w3-button"
      >Jackets</router-link>
      <router-link
        :to="{ name: 'category', params: { cat: 'Gymwear' }}"
        class="w3-bar-item w3-button"
      >Gymwear</router-link>
      <router-link
        :to="{ name: 'category', params: { cat: 'Blazers' }}"
        class="w3-bar-item w3-button"
      >Blazers</router-link>
      <router-link
        :to="{ name: 'category', params: { cat: 'Shoes' }}"
        class="w3-bar-item w3-button"
      >Shoes</router-link>
    </div>
    <a href="#footer" class="w3-bar-item w3-button w3-padding">Contact</a>
    <a class="w3-bar-item w3-button w3-padding" v-on:click="popup=!popup">Newsletter</a>
    <a href="#footer" class="w3-bar-item w3-button w3-padding">Subscribe</a>
    <Popup v-if="popup" v-on:switch="popup=!popup" type="newsletter" />
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue';

export default {
  name: 'Sidebar',
  components: {
    Popup,
  },
  data() {
    return {
      jeansList: false,
      popup: false,
    };
  },
  methods: {
    onJeansClick() {
      this.jeansList = !this.jeansList;
      if (this.jeansList) {
        document.getElementById('jeansArrow').setAttribute('style', 'transform: rotate(-180deg);');
      } else {
        document.getElementById('jeansArrow').setAttribute('style', 'transform: rotate(0deg);');
      }
    },
  },
};
</script>

<style>
.rout {
  text-decoration: none;
}

.router-link-active {
  color: rgb(0, 0, 0);
  background-color: rgb(241, 241, 241);
}

.arrow {
  transition: all 0.5s ease-in-out;
  transform: rotate(0deg);
}
</style>
