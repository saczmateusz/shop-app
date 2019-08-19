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
    <div class="w3-main" style="margin-left: 250px">
      <router-view style="z-index: 1" />
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';
import API from '@/lib/API';

export default {
  name: 'app',
  components: {
    Sidebar,
    Footer,
  },
  computed: {
    ...mapState(['items']),
  },
  async beforeMount() {
    if (localStorage.getItem('shopItems') !== null) this.setItems(JSON.parse(localStorage.getItem('shopItems')));
    else {
      await API.getData().then((result) => {
        this.setItems(result);
      });
    }
    if (localStorage.getItem('cartItems') !== null) {
      await this.loadCart();
    }
  },
  methods: {
    ...mapActions(['setItems', 'setCart']),
    loadCart() {
      this.setCart(JSON.parse(localStorage.getItem('cartItems')));
    },
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
  font-family: 'Montserrat', sans-serif;
}

.w3-sidebar a {
  font-family: 'Roboto', sans-serif;
}

.cart {
  font-size: 0.8em;
  font-weight: bolder;
}

.list {
  min-height: 600px;
  margin: 16px 0px;
}

.link {
  text-decoration: none;
  background-color: rgb(255, 255, 255);
}

.link:hover {
  color: rgb(100, 100, 100);
}

.tag {
  position: absolute;
  top: 0;
}

.item {
  padding-left: 16px;
  padding-right: 16px;
  min-height: 360px;
}

.nopadding {
  padding: 0px;
}

.right {
  padding-right: 6.5px;
}

.await {
  height: 200px;
  font-size: 2em;
  color: grey;
  margin: 110px 0px;
  text-align: center;
}

.on-hover {
  display: none;
  position: relative;
  top: -100px;
  left: 63px;
  margin: -19px;
  padding: 0px;
}

.on-hover:hover {
  display: block;
}

.trigger:hover + .on-hover {
  display: block;
}

.img-trigger:hover + .on-hover {
  display: block;
}

.trigger:hover {
  position: relative;
  top: -4px;
}

.flashing {
  position: relative;
}

.flashing:active {
  animation: flash 0.1s;
}

@keyframes flash {
  0% {
    padding-left: 16px;
    padding-right: 16px;
  }
  50% {
    padding-left: 18px;
    padding-right: 18px;
  }
  100% {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
