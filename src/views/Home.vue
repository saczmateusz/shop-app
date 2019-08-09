<template>
  <div class="w3-main" style="margin-left: 250px">
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Welcome</p>
      <p class="w3-right">
        <i class="fa fa-shopping-cart w3-margin-right"></i>
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
    <div class="w3-container w3-text-grey" id="jeans">
      <p>8 items</p>
    </div>
    <div class="w3-row w3-grayscale">
      <div class="w3-col l3 s6">
        <div class="w3-container">
          <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
          <p>
            Ripped Skinny Jeans
            <br />
            <b>$24.99</b>
          </p>
        </div>
        <div class="w3-container">
          <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
          <p>
            Mega Ripped Jeans
            <br />
            <b>$19.99</b>
          </p>
        </div>
      </div>

      <div class="w3-col l3 s6">
        <div class="w3-container">
          <div class="w3-display-container">
            <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
            <span class="w3-tag w3-display-topleft">New</span>
            <div class="w3-display-middle w3-display-hover">
              <button class="w3-button w3-black">
                Buy now
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <p>
            Mega Ripped Jeans
            <br />
            <b>$19.99</b>
          </p>
        </div>
        <div class="w3-container">
          <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
          <p>
            Washed Skinny Jeans
            <br />
            <b>$20.50</b>
          </p>
        </div>
      </div>

      <div class="w3-col l3 s6">
        <div class="w3-container">
          <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
          <p>
            Washed Skinny Jeans
            <br />
            <b>$20.50</b>
          </p>
        </div>
        <div class="w3-container">
          <div class="w3-display-container">
            <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
            <span class="w3-tag w3-display-topleft">Sale</span>
            <div class="w3-display-middle w3-display-hover">
              <button class="w3-button w3-black">
                Buy now
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <p>
            Vintage Skinny Jeans
            <br />
            <b class="w3-text-red">$14.99</b>
          </p>
        </div>
      </div>

      <div class="w3-col l3 s6">
        <div class="w3-container">
          <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
          <p>
            Vintage Skinny Jeans
            <br />
            <b>$14.99</b>
          </p>
        </div>
        <div class="w3-container">
          <img src="https://dummyimage.com/400x500.jpg/5fa2dd/ffffff" style="width:100%" />
          <p>
            Ripped Skinny Jeans
            <br />
            <b>$24.99</b>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import API from '@/lib/API';

export default {
  name: 'home',
  components: {
    Footer,
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
