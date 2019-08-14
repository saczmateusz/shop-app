<template>
  <div class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style="width: 250px">
    <router-link class="link" :to="{ name: 'home' }">
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
        id="jeans-button"
      >
        Jeans
        <i class="fa fa-caret-down arrow" v-on:click="onJeansClick" id="jeans-arrow"></i>
      </router-link>
      <div class="w3-bar-block w3-hide w3-padding-large w3-medium w3-show" v-if="jeansList">
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | skinny' }}"
          class="w3-bar-item w3-button"
        >
          <i class="fa fa-caret-right w3-margin-right" v-if="showArrow() === 'skinny'"></i>
          Skinny
        </router-link>
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | relaxed' }}"
          class="w3-bar-item w3-button"
        >
          <i class="fa fa-caret-right w3-margin-right" v-if="showArrow() === 'relaxed'"></i>
          Relaxed
        </router-link>
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | bootcut' }}"
          class="w3-bar-item w3-button"
        >
          <i class="fa fa-caret-right w3-margin-right" v-if="showArrow() === 'bootcut'"></i>
          Bootcut
        </router-link>
        <router-link
          :to="{ name: 'category', params: { cat: 'Jeans | straight' }}"
          class="w3-bar-item w3-button"
        >
          <i class="fa fa-caret-right w3-margin-right" v-if="showArrow() === 'straight'"></i>
          Straight
        </router-link>
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
  watch: {
    '$route.params.cat': function watch() {
      this.showArrow();
    },
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
        document.getElementById('jeans-arrow').setAttribute('style', 'transform: rotate(-180deg);');
      } else {
        document.getElementById('jeans-arrow').setAttribute('style', 'transform: rotate(0deg);');
      }
    },
    showArrow() {
      if (this.$route.name === 'category') {
        if (this.$route.params.cat.split(' ')[0].toString() === 'Jeans') {
          document
            .getElementById('jeans-button')
            .setAttribute('style', 'color: rgb(0, 0, 0); background-color: rgb(241, 241, 241)');
        } else document.getElementById('jeans-button').setAttribute('style', '');
        return this.$route.params.cat.split(' ')[2];
      }
      return 'home';
    },
  },
};
</script>

<style>
.router-link-active {
  color: rgb(0, 0, 0);
  background-color: rgb(241, 241, 241);
}

.arrow {
  transition: all 0.5s ease-in-out;
  transform: rotate(0deg);
}
</style>
