<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">{{title}}</p>
      <p class="w3-right">
        <router-link to="/" class="cart-link">
          <span class="cart">{{cartCount}} items</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-display-container w3-container" v-if="home">
      <img src="../assets/images/jeans.jpg" alt="Jeans" style="width:100%" />
      <div class="w3-display-topleft w3-text-white" style="padding:24px 48px">
        <h1 class="w3-jumbo w3-hide-small">New arrivals</h1>
        <h1 class="w3-hide-large w3-hide-medium">New arrivals</h1>
        <h1 class="w3-hide-small">COLLECTION 2016</h1>
        <p>
          <a href="#jeans" class="w3-button w3-black w3-padding-large w3-large">SHOP NOW</a>
        </p>
      </div>
    </div>
    <div v-if="items">
      <div
        class="w3-container w3-text-grey"
        style="font-size: 3em"
        v-if="!home"
      >Explore our {{headerTitle()}} collection</div>
      <div class="w3-container w3-text-grey" id="jeans">
        <p>{{rand}} items</p>
      </div>
      <div class="w3-container w3-grayscale nopadding">
        <div class="w3-col l3 s6" v-for="(item, index) in getRandomItems(rand)" v-bind:key="index">
          <div class="w3-container item trigger flashing">
            <img :src="item.image" style="width: 100%" class="img-trigger" />
            <div class="onHover">
              <button class="w3-button w3-black" v-on:click="saveToCart(item)">
                Buy now
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
            <p>
              {{item.product_name}}
              <br />
              <b>{{item.price}}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="await" v-else>Retrieving items for you</div>
    <div id="pop-up" class="w3-modal" style="display: block; z-index: 4" v-if="popup">
      <div class="w3-modal-content w3-animate-zoom" style="padding:32px">
        <div class="w3-container w3-white w3-center">
          <i
            v-on:click="popup=false"
            class="fa fa-remove w3-right w3-button w3-transparent w3-xxlarge"
          ></i>
          <h2 class="w3-wide">Great choice!</h2>
          <p>You have added 1 product to your cart.</p>
          <button
            type="button"
            class="w3-button w3-padding-large w3-red w3-margin-bottom"
            v-on:click="popup=false"
          >BACK TO STORE</button>
          <button
            type="button"
            class="w3-button w3-padding-large w3-black w3-margin-bottom"
            style="margin-left: 20px"
            v-on:click="popup=false"
          >
            SEE YOUR SHOPPING CART
            <i
              class="fa fa-shopping-cart w3-margin-right right"
              style="margin-left: 5px"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'cart',
  computed: {
    ...mapState(['items']),
    ...mapGetters(['cartCount']),
  },
  data() {
    return {
      title: '',
      rand: null,
      home: false,
      popup: false,
    };
  },
  mounted() {
    if (this.title === 'Welcome') {
      this.home = true;
    } else {
      this.home = false;
    }
    this.rand = Math.floor(Math.random() * 10 + 7);
  },
  methods: {
    ...mapActions(['addToCart']),
    getRandomItems(items) {
      const ret = [];
      const indexes = [];
      const arrLength = 30;
      while (ret.length < items) {
        const i = Math.floor(Math.random() * arrLength);
        if (indexes.indexOf(i) === -1) {
          indexes[indexes.length] = i;
          ret[ret.length] = this.items[i];
        }
      }
      return ret;
    },
    reload() {
      if (this.title === 'Welcome') {
        this.home = true;
      } else {
        this.home = false;
      }
      this.rand = Math.floor(Math.random() * 10 + 7);
    },
    saveToCart(item) {
      this.addToCart(item);
      this.popup = !this.popup;
    },
    onPopUpClick() {},
    headerTitle() {
      return (
        this.title
          .toLowerCase()
          .split(' ')
          .reverse()
          // eslint-disable-next-line
          .filter((element, index) => {
            return index % 2 === 0;
          })
          .join(' ')
      );
    },
  },
};
</script>

<style>
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

.onHover {
  display: none;
  position: relative;
  top: -100px;
  left: 63px;
  margin: -19px;
  padding: 0px;
}

.onHover:hover {
  display: block;
}

.trigger:hover + .onHover {
  display: block;
}

.img-trigger:hover + .onHover {
  display: block;
}

.trigger:hover {
  position: relative;
  top: -4px;
}

.flashing:active {
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

.cart-link {
  text-decoration: none;
  background-color: rgb(255, 255, 255);
}
</style>
