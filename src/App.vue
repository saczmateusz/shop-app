<template>
  <div id="app" class="w3-content content">
    <Sidebar id="sidebar" style="z-index: 3" />
    <header class="w3-bar w3-top w3-hide-large w3-black w3-xlarge">
      <div class="w3-bar-item w3-padding-24 w3-wide">LOGO</div>
      <a
        href="javascript:void(0)"
        class="w3-bar-item w3-button w3-padding-24 w3-right"
        v-on:click="w3_open()"
      >
        <i class="fa fa-bars"></i>
      </a>
    </header>
    <div
      class="w3-overlay w3-hide-large"
      v-on:click="w3_close()"
      style="cursor: pointer; display: none; z-index: 2"
      title="close side menu"
      id="overlay"
    ></div>
    <router-view style="z-index: 1" />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'app',
  components: {
    Sidebar,
  },
  methods: {
    w3_open() {
      document.getElementById('sidebar').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
    },

    w3_close() {
      document.getElementById('sidebar').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
    },
  },
};
</script>


<style>
.content {
  max-width: 1200px;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
.w3-wide {
  font-family: "Montserrat", sans-serif;
}

.w3-sidebar a {
  font-family: "Roboto", sans-serif;
}
</style>
