<template>
  <div>
    <div class="w3-hide-large" style="margin-top:83px"></div>
    <header class="w3-container w3-xlarge">
      <p class="w3-left">Checkout</p>
      <p class="w3-right">
        <router-link :to="{name: 'cart'}" class="link">
          <span class="cart" v-if="cartCount !== 1">{{cartCount}} items</span>
          <span class="cart" v-if="cartCount === 1">{{cartCount}} item</span>
          <i class="fa fa-shopping-cart w3-margin-right right"></i>
        </router-link>
        <i class="fa fa-search"></i>
      </p>
    </header>
    <div class="w3-container w3-text-grey" style="font-size: 3em">Checkout & Payment</div>
    <div class="list">
      <div
        class="w3-container w3-grayscale checkout-item"
        v-for="(item, index) in cart"
        v-bind:key="index"
      >
        <div class="w3-col checkout-item-count">{{item.count}}×</div>
        <div class="w3-rest checkout-item-info">
          <div style="display: inline-block">
            <span class="checkout-item-info-p">{{item.product_name}}</span>
            <span class="w3-text-gray checkout-item-info-p">({{item.price}}/pc.)</span>
          </div>
          <div class="w3-right checkout-item-sum">
            ${{(item.price.slice(1) * item.count).toFixed(2)}}
          </div>
        </div>
      </div>
      <div class="w3-container">
        <hr class="sum-line" />
        <div class="w3-right sum-value">
          <span style="padding-right: 20px; font-size: 0.8em">TOTAL:</span>
          <span style="font-size: 1.5em">${{cartValue}}</span>
        </div>
      </div>
      <div class="w3-container">
        <span class="form-header">Enter your address and credit card data</span>
        <form>
          <div class="w3-quarter" style="padding-right: 16px; min-width: 229.48px">
            <span class="form-subtitle">Your address</span>
            <div class="form-input">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="John Doe" v-model="customer.name" />
            </div>
            <div class="form-input">
              <label for="name">Phone</label>
              <input type="text" id="phone" placeholder="100-200-300" v-model="customer.phone" />
            </div>
            <div class="form-input">
              <label for="name">Postal Code</label>
              <input type="text" id="postal-code" placeholder="10-200" v-model="customer.code" />
            </div>
            <div class="form-input">
              <label for="name">Town</label>
              <input type="text" id="town" placeholder="New York" v-model="customer.town" />
            </div>
            <div class="form-input">
              <label for="name">Street</label>
              <input
                type="text"
                id="street"
                placeholder="1st Street Avenue"
                v-model="customer.street"
              />
            </div>
          </div>
          <div class="w3-quarter" style="padding-right: 16px; min-width: 229.48px">
            <span class="form-subtitle">Credit card</span>
            <div class="form-input">
              <label for="name">
                Number
                <span class="excl">(MasterCard/Visa only)</span>
              </label>
              <input
                type="text"
                id="number"
                placeholder="- - - -   - - - -   - - - -   - - - -"
                v-model="customer.card.number"
              />
            </div>
            <div class="form-input">
              <label for="name">Expiry date</label>
              <input
                type="text"
                id="expiration"
                placeholder="--/----"
                v-model="customer.card.expiry"
              />
            </div>
            <div class="form-input">
              <label for="name">CVV</label>
              <input type="text" id="cvv" placeholder="---" v-model="customer.card.cvv" />
            </div>
          </div>
        </form>
      </div>
      <div class="w3-container">
        <h6 id="invalid" class="alert-invalid"></h6>
      </div>
    </div>
    <div class="w3-container w3-white w3-center">
      <button
        type="button"
        class="w3-button w3-left w3-black w3-margin-bottom"
        @click="$router.go(-1)"
      >BACK TO SHOPPING CART</button>
      <button
        type="button"
        id="order"
        class="w3-button w3-right w3-green w3-margin-bottom"
        v-on:click="validate()"
      >
        ORDER & PAY
        <i class="fa fa-arrow-right"></i>
      </button>
    </div>
    <Popup v-if="popup" v-on:switch="popup=!popup" type="purchase" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Popup from '@/components/Popup.vue';

export default {
  name: 'checkout',
  components: {
    Popup,
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartCount', 'cartValue']),
  },
  data() {
    return {
      popup: false,
      customer: {
        name: '',
        phone: '',
        code: '',
        town: '',
        street: '',
        card: {
          number: '',
          expiry: '',
          cvv: '',
        },
      },
      button: false,
    };
  },
  mounted() {
    if (this.cartCount === 0) {
      this.$router.go(-1);
    }
  },
  methods: {
    ...mapActions(['clearCart']),
    submit() {
      this.clearCart();
      this.popup = !this.popup;
    },
    validate() {
      let valid = 0;
      valid += this.validateName(this.customer.name);
      valid += this.validatePhone(this.customer.phone);
      valid += this.validateCode(this.customer.code);
      valid += this.validateTown(this.customer.town);
      valid += this.validateStreet(this.customer.street);
      valid += this.validateCard(this.customer.card);
      if (valid === 6) {
        document.getElementById('invalid').innerHTML = '';
        this.submit();
      } else document.getElementById('invalid').innerHTML = 'Please enter all necessary informations and match the format shown in placeholder!';
    },
    validateName(argument) {
      if (argument.length !== 0) {
        const name = argument
          .split('')
          .filter(
            element => (element >= 'a' && element <= 'z')
              || (element >= 'A' && element <= 'Z')
              || (element >= '0' && element <= '9')
              || element === '.'
              || element === '&'
              || element === ' ',
          )
          .join('');
        document.getElementById('name').style = 'border-color:#00bc8c;';
        this.customer.name = name;
        return 1;
      }
      document.getElementById('name').style = 'border-color: #e74c3c;';
      return 0;
    },
    validatePhone(argument) {
      const phone = argument.replace(/\D/g, '');
      if (phone.length === 9 && !Number.isNaN(phone)) {
        this.customer.phone = phone
          .slice(0, 2)
          .concat(' ', phone.slice(2, 4), ' ', phone.slice(4, 6), ' ', phone.slice(-3));
        document.getElementById('phone').style = 'border-color:#00bc8c;';
        return 1;
      }
      document.getElementById('phone').style = 'border-color: #e74c3c;';
      return 0;
    },
    validateCode(argument) {
      const code = argument.replace(/\D/g, '');
      if (code.length === 5 && !Number.isNaN(code)) {
        this.customer.code = code.slice(0, 2).concat('-', code.slice(-3));
        document.getElementById('postal-code').style = 'border-color:#00bc8c;';
        return 1;
      }
      document.getElementById('postal-code').style = 'border-color: #e74c3c;';
      return 0;
    },
    validateTown(argument) {
      if (argument.length !== 0) {
        const town = argument
          .split('')
          .filter(
            element => (element >= 'a' && element <= 'z')
              || (element >= 'A' && element <= 'Z')
              || element === '.'
              || element === '&'
              || element === ' '
              || element === ',',
          )
          .join('');
        document.getElementById('town').style = 'border-color:#00bc8c;';
        this.customer.town = town;
        return 1;
      }
      document.getElementById('town').style = 'border-color: #e74c3c;';
      return 0;
    },
    validateStreet(argument) {
      if (argument.length !== 0) {
        const street = argument
          .split('')
          .filter(
            element => (element >= 'a' && element <= 'z')
              || (element >= 'A' && element <= 'Z')
              || (element >= '0' && element <= '9')
              || element === '.'
              || element === '&'
              || element === ' '
              || element === ',',
          )
          .join('');
        document.getElementById('street').style = 'border-color:#00bc8c;';
        this.customer.street = street;
        return 1;
      }
      document.getElementById('street').style = 'border-color: #e74c3c;';
      return 0;
    },
    validateCard(argument) {
      this.validateNumber(argument.number);
      this.validateExpiry(argument.expiry);
      this.validateCVV(argument.cvv);
    },
    validateNumber(argument) {
      const numMask = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
        diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
      };
      const number = argument.replace(/\D/g, '');
      // console.log(number);
      this.customer.card.number = number;
      if (number.length === 16 && !Number.isNaN(number)) {
        if (numMask.visa.test(number) || numMask.mastercard.test(number)) {
          document.getElementById('number').style = 'border-color:#00bc8c;';
          return 1;
        }
      }
      document.getElementById('number').style = 'border-color: #e74c3c;';
      return 0;
    },
    validateExpiry(argument) {
      const mask = new RegExp('\\b[0-9]{1,2}/[0-9][0-9][0-9][0-9]\\b');
      if (mask.test(argument)) {
        const date = argument.split('/');
        const month = parseInt(date[0], 10);
        const year = parseInt(date[1], 10);
        const today = new Date();
        if (month >= 1 && month <= 12 && year > 1000 && year < 9999) {
          if (
            year > today.getFullYear()
            || (year === today.getFullYear() && month >= today.getMonth() + 1)
          ) {
            this.customer.card.expiry = month.toString().length === 1
              ? '0'.concat(month.toString(), '/', year.toString())
              : month.toString().concat('/', year.toString());
            document.getElementById('expiration').style = 'border-color:#00bc8c;';
            return 1;
          }
        }
      }
      document.getElementById('expiration').style = 'border-color: #e74c3c;';
      return 0;
    },
    validateCVV(argument) {
      if (argument.length === 3 && !Number.isNaN(argument)) {
        document.getElementById('cvv').style = 'border-color:#00bc8c;';
        return 1;
      }
      document.getElementById('cvv').style = 'border-color: #e74c3c;';
      return 0;
    },
  },
};
</script>

<style>
.checkout-item {
  padding: 0px 16px;
  height: 50px;
}

.checkout-item-count {
  font-size: 1.2em;
  padding: 8px 0px;
  width: 9%;
  height: 100%;
  font-weight: bold;
}

.checkout-item-sum {
  display: inline;
  margin: 0px;
  font-weight: bold;
  font-size: 1.2em;
}

.checkout-item-info {
  height: 100%;
  padding: 8px 0px;
}

.checkout-item-info-p {
  margin: 0px;
  font-weight: bold;
  font-size: 1.2em;
  padding: 0px 20px 0px 0px;
}

.sum-line {
  border-top: 2px solid rgb(200, 200, 200);
}

.sum-value {
  font-weight: bold;
}

.form-header {
  display: block;
  margin: 20px 0px;
  font-weight: bolder;
  font-size: 2em;
}

.form-subtitle {
  display: block;
  margin-bottom: 20px;
  font-weight: bolder;
  font-size: 1.5em;
}

.form-input {
  display: block;
  font-weight: bold;
  margin-bottom: 20px;
}

input[type='text'] {
  border: 2px solid rgb(200, 200, 200);
  border-radius: 5px;
  padding: 10px;
}

.alert-invalid {
  color: #e74c3c;
}

.excl {
  font-size: 0.8em;
}
</style>
