<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">{{title}}</p>
      <p class="w3-right">
        <router-link :to="{name: 'cart'}" class="cart-link">
          <span class="checkout" v-if="cartCount !== 1">{{cartCount}} items</span>
          <span class="checkout" v-if="cartCount === 1">{{cartCount}} item</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div v-if="items">
      <div
        class="w3-container w3-text-grey"
        style="font-size: 3em"
      >Explore our {{headerTitle()}} collection</div>
      <div class="w3-container w3-text-grey" id="jeans">
        <p>{{rand}} items</p>
      </div>
      <div class="w3-container w3-grayscale nopadding">
        <div class="w3-col l3 s6" v-for="(item, index) in getRandomItems(rand)" v-bind:key="index">
          <div class="w3-container item trigger flashing">
            <span class="w3-tag tag" v-if="Math.floor(Math.random() * 10) === 0">New</span>
            <span class="w3-tag tag" v-else-if="Math.floor(Math.random() * 10) === 9">Sale</span>
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
    <Popup v-if="popup" v-on:switch="popup=!popup" type="addItem" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Popup from '@/components/Popup.vue';

export default {
  name: 'category',
  components: {
    Popup,
  },
  computed: {
    ...mapState(['items']),
    ...mapGetters(['cartCount']),
  },
  watch: {
    '$route.params.cat': function watch() {
      this.reload();
    },
  },
  data() {
    return {
      title: '',
      rand: null,
      popup: false,
      staticList: null,
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    ...mapActions(['addToCart']),
    getRandomItems(items) {
      if (this.staticList === null) {
        const result = [];
        const indexes = [];
        const arrLength = 30;
        while (result.length < items) {
          const i = Math.floor(Math.random() * arrLength);
          if (indexes.indexOf(i) === -1) {
            indexes.push(i);
            result.push(this.items[i]);
          }
        }
        this.staticList = result;
      }
      return this.staticList;
    },
    reload() {
      this.staticList = null;
      this.title = this.$route.params.cat;
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

.flashing {
  position: relative;
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

.cart-link:hover {
  color: rgb(220, 220, 220);
}

.tag {
  position: absolute;
  top: 0;
  left: 16px;
}
</style>
