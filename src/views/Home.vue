<template>
  <div class="w3-main" style="margin-left: 250px">
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Welcome</p>
      <p class="w3-right">
        <i class="fa fa-shopping-cart w3-margin-right right"></i>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-display-container w3-container">
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
        <p>{{items.length}} items</p>
      </div>
      <div class="w3-container w3-grayscale nopadding">
        <div class="w3-col l3 s6 item" v-for="item in items" v-bind:key="item.id">
          <img :src="item.image" style="width:100%" />
          <p>
            {{item.product_name}}
            <br />
            <b>{{item.price}}</b>
          </p>
        </div>
      </div>
    </div>
    <div style="height: 400px; font-size: 3em; color: grey" v-else>Retrieving items for you</div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Footer from '@/components/Footer.vue';
import API from '@/lib/API';

export default {
  name: 'home',
  components: {
    Footer,
  },
  computed: {
    ...mapState(['items']),
  },
  data() {
    return {
      apidata: null,
    };
  },
  mounted() {
    API.getData().then((result) => {
      this.apidata = result;
    });
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
</style>
