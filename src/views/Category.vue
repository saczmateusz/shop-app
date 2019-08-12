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
    <div v-if="items">
      <div class="w3-container w3-text-grey" id="jeans">
        <p>{{rand}} items</p>
      </div>
      <div class="w3-container w3-grayscale nopadding">
        <div class="w3-col l3 s6" v-for="(item, index) in getRandomItems(rand)" v-bind:key="index">
          <div class="w3-container item trigger">
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
  name: 'category',
  computed: {
    ...mapState(['items']),
  },
  watch: {
    '$route.params.cat': function x() {
      this.reload();
    },
  },
  data() {
    return {
      title: null,
      rand: null,
    };
  },
  mounted() {
    this.title = this.$route.params.cat;
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
    reload() {
      this.title = this.$route.params.cat;
      this.rand = Math.floor(Math.random() * 10 + 7);
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
