<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">{{title}}</p>
      <p class="w3-right">
        <i class="fa fa-shopping-cart w3-margin-right right"></i>
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
      <div class="w3-container w3-text-grey" id="jeans">
        <p>{{rand}} items</p>
      </div>
      <div class="w3-container w3-grayscale nopadding">
        <div class="w3-col l3 s6" v-for="(item, index) in getRandomItems(rand)" v-bind:key="index">
          <div class="w3-container item trigger flashing">
            <img :src="item.image" style="width: 100%" class="img-trigger" />
            <div class="onHover">
              <button class="w3-button w3-black" v-on:click="itemlog(item)">
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
    <div style="height: 400px; font-size: 3em; color: grey" v-else>Retrieving items for you</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home',
  computed: {
    ...mapState(['items']),
  },
  data() {
    return {
      rand: null,
    };
  },
  mounted() {
    this.rand = Math.floor(Math.random() * 10 + 7);
  },
  methods: {
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
    itemlog() {
      // console.log(`'clicked: '${item.id}`);
    },
  },
};
</script>

<style>
.item {
  padding: 0;
  min-height: 360px;
}

.nopadding {
  padding: 0px;
}

.right {
  padding-right: 6.5px;
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
</style>
