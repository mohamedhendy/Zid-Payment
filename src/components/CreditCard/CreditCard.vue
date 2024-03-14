<template>
  <div class="wrapper">
    <div class="card-form">
      <div class="card-list">
        <div class="card-item" :class="{ '-active': isCardFlipped }">
          <div class="card-item__side -front">
            <div
              class="card-item__focus"
              :class="{ '-active': focusElementStyle }"
              :style="focusElementStyle"
              ref="focusElement"
            ></div>
            <div class="card-item__cover"></div>

            <div class="card-item__wrapper">
              <div class="card-item__top">
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                  class="card-item__chip"
                />
                <div class="card-item__type">
                  <transition name="slide-fade-up">
                    <img
                      :src="'src/assets/images/cardsPayments/' + getCardType + '.svg'"
                      v-if="getCardType"
                      :key="getCardType"
                      alt=""
                    />
                  </transition>
                </div>
              </div>
              <label for="cardNumber" class="card-item__number" ref="cardNumber">
                <template v-if="getCardType === 'amex'">
                  <span v-for="(n, $index) in amexCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div
                        class="card-item__numberItem"
                        v-if="
                          $index > 4 &&
                          $index < 14 &&
                          PaymentCard.Number.length > $index &&
                          n.trim() !== ''
                        "
                      >
                        *
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        :key="$index"
                        v-else-if="PaymentCard.Number.length > $index"
                      >
                        {{ PaymentCard.Number[$index] }}
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        v-else
                        :key="$index + 1"
                      >
                        {{ n }}
                      </div>
                    </transition>
                  </span>
                </template>

                <template v-else>
                  <span v-for="(n, $index) in otherCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div
                        class="card-item__numberItem"
                        v-if="
                          $index > 4 &&
                          $index < 15 &&
                          PaymentCard.Number.length > $index &&
                          n.trim() !== ''
                        "
                      >
                        *
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        :key="$index"
                        v-else-if="PaymentCard.Number.length > $index"
                      >
                        {{ PaymentCard.Number[$index] }}
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        v-else
                        :key="$index + 1"
                      >
                        {{ n }}
                      </div>
                    </transition>
                  </span>
                </template>
              </label>
              <div class="card-item__content">
                <label for="cardName" class="card-item__info" ref="cardName">
                  <div class="card-item__holder">Card Holder</div>
                  <transition name="slide-fade-up">
                    <div
                      class="card-item__name"
                      v-if="PaymentCard.CardHolder && PaymentCard.CardHolder.length"
                      key="1"
                    >
                      {{ PaymentCard.CardHolder }}
                    </div>
                    <div class="card-item__name" v-else key="2">Full Name</div>
                  </transition>
                </label>
                <div class="card-item__date" ref="cardDate">
                  <label for="cardMonth" class="card-item__dateTitle">Expires</label>
                  <label for="cardMonth" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="PaymentCard.ExpMonth" :key="PaymentCard.ExpMonth">{{
                        PaymentCard.ExpMonth
                      }}</span>
                      <span v-else key="2">MM</span>
                    </transition>
                  </label>
                  /
                  <label for="cardYear" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="PaymentCard.ExpYear" :key="PaymentCard.ExpYear">{{
                        String(PaymentCard.ExpYear).slice(2, 4)
                      }}</span>
                      <span v-else key="2">YY</span>
                    </transition>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="card-item__side -back">
            <div class="card-item__cover">
              <img
                :src="
                  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                  currentCardBackground +
                  '.jpeg'
                "
                class="card-item__bg"
              />
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">
              <div class="card-item__cvvTitle">CVV</div>
              <div class="card-item__cvvBand">
                <span v-for="(n, $index) in PaymentCard.cvv" :key="$index"> * </span>
              </div>
              <div class="card-item__type">
                <img
                  :src="'src/assets/images/cardsPayments/' + getCardType + '.svg'"
                  v-if="getCardType"
                  class="card-item__typeImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="submitForm" class="card-form__inner">
        <div class="card-input">
          <label for="cardNumber" class="card-input__label">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            class="card-input__input"
            v-mask="generateCardNumberMask"
            v-model="PaymentCard.Number"
            v-on:focus="focusInput"
            v-on:blur="blurInput"
            data-ref="cardNumber"
            autocomplete="off"
          />
          <div>
            <span class="error-message">{{ errors.Number }}</span>
          </div>
        </div>
        <div class="card-input">
          <label for="cardName" class="card-input__label">Card Holders</label>
          <input
            type="text"
            id="cardName"
            class="card-input__input"
            v-model="PaymentCard.CardHolder"
            v-on:focus="focusInput"
            v-on:blur="blurInput"
            data-ref="cardName"
            autocomplete="off"
          />
          <div>
            <span class="error-message">{{ errors.CardHolder }}</span>
          </div>
        </div>
        <div class="card-form__row">
          <div class="card-form__col">
            <div class="card-form__group">
              <label for="cardMonth" class="card-input__label">Expiration Date</label>
              <select
                class="card-input__input -select"
                id="cardMonth"
                v-model="PaymentCard.ExpMonth"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardDate"
              >
                <option value="" disabled selected>Month</option>
                <option :value="n < 10 ? '0' + n : n" v-for="n in 12" :key="n">
                  {{ n < 10 ? '0' + n : n }}
                </option>
              </select>
              <select
                class="card-input__input -select"
                id="cardYear"
                v-model="PaymentCard.ExpYear"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardDate"
              >
                <option value="" disabled selected>Year</option>
                <option :value="$index + minCardYear" v-for="(n, $index) in 12" :key="n">
                  {{ $index + minCardYear }}
                </option>
              </select>
            </div>
            <div>
              <span class="error-message">{{ errors.ExpMonth }}</span>
            </div>
            <div>
              <span class="error-message">{{ errors.ExpYear }}</span>
            </div>
          </div>
          <div class="card-form__col -cvv">
            <div class="card-input">
              <label for="cardCvv" class="card-input__label">CVV</label>
              <input
                type="text"
                class="card-input__input"
                id="cardCvv"
                v-mask="'####'"
                maxlength="4"
                v-model="PaymentCard.cvv"
                v-on:focus="flipCard(true)"
                v-on:blur="flipCard(false)"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <button class="card-form__button">Submit</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, reactive } from 'vue'
import { type creditCard } from './types'
import { loadStripe } from '@stripe/stripe-js'
export default defineComponent({
  methods: {
    focusInput(e: any) {
      this.isInputFocused = true
      let targetRef = e.target.dataset.ref
      let target: any = this.$refs[targetRef]
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null
        }
      }, 300)
      vm.isInputFocused = false
    }
  },
  setup() {
    const imageType = '@assets/images/cardsPayments/visa.svg'
    let PaymentCard = reactive<creditCard>({
      Number: [],
      CardHolder: '',
      ExpMonth: '',
      ExpYear: '',
      cvv: ''
    })
    const errors = ref<any>({
      Number: '',
      CardHolder: '',
      ExpMonth: '',
      ExpYear: '',
      cvv: ''
    })
    let currentCardBackground = ref(Math.floor(Math.random() * 25 + 1))
    let minCardYear = ref(new Date().getFullYear())
    let amexCardMask = ref<string>('#### ###### #####')
    let otherCardMask = ref<string>('#### #### #### ####')
    let cardNumberTemp = ref<string>('')
    let isCardFlipped = ref(false)
    let focusElementStyle = ref<any>(null)
    let isInputFocused = ref(false)

    const getCardType = computed(() => {
      const number = ref<any>(PaymentCard.Number)
      const cardNumber = String(number.value)

      let re = new RegExp('^4')
      if (cardNumber.match(re) !== null) return 'visa'

      re = new RegExp('^(34|37)')
      if (cardNumber.match(re) !== null) return 'amex'

      re = new RegExp('^5[1-5]')
      if (cardNumber.match(re) !== null) return 'mastercard'

      re = new RegExp('^6011')
      if (cardNumber.match(re) !== null) return 'discover'

      re = new RegExp('^9792')
      if (cardNumber.match(re) !== null) return 'troy'

      return 'visa' // default type
    })
    const generateCardNumberMask = computed(() => {
      return getCardType.value === 'amex' ? amexCardMask.value : otherCardMask.value
    })
    const flipCard = (status: boolean) => {
      isCardFlipped.value = status
    }
    const validateForm = () => {
      let isValid = true

      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = ''
      })

      const cardValues = JSON.parse(JSON.stringify(PaymentCard))
      // Validate card number
      if (cardValues.Number.length == 0 || cardValues.Number.trim().length < 16) {
        errors.value.Number = 'Card number is required.'
        isValid = false
      }

      // Validate card holder
      if (cardValues.CardHolder.trim() === '') {
        errors.value.CardHolder = 'Card holder is required.'
        isValid = false
      }

      // Validate expiration month
      if (cardValues.ExpMonth === '') {
        errors.value.ExpMonth = 'Expiration month is required.'
        isValid = false
      }

      // Validate expiration year
      if (cardValues.ExpYear === '') {
        errors.value.ExpYear = 'Expiration year is required.'
        isValid = false
      }

      return isValid
    }
    async function submitForm() {
      if (validateForm()) {
        try {
          const stripe: any = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
          const number: any = String(PaymentCard.Number).replaceAll(' ', '')
          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: {
              number: number,
              exp_month: Number(PaymentCard.ExpMonth),
              exp_year: Number(PaymentCard.ExpYear),
              cvc: PaymentCard.cvv
            }
          })

          if (error) {
            console.error(error)
            alert(error.message)
            return
          }

          const response = await fetch('/test-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id })
          })

          const { success, message } = await response.json()
          if (success) {
            console.log('Payment succeeded:', message)
          } else {
            console.log('Payment failed:', message)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    onMounted(() => {
      cardNumberTemp.value = otherCardMask.value
      // @ts-ignore: Object is possibly 'null'.
      document.getElementById('cardNumber').focus()
    })

    return {
      getCardType,
      imageType,
      PaymentCard,
      minCardYear,
      amexCardMask,
      otherCardMask,
      cardNumberTemp,
      isCardFlipped,
      focusElementStyle,
      isInputFocused,
      flipCard,
      currentCardBackground,
      generateCardNumberMask,
      submitForm,
      errors
    }
  }
})
</script>
<style lang="scss">
@import url('../../assets/scss/card.scss');

.error-message {
  color: rgb(233, 35, 35);
  padding: 2px;
  font-size: 12px;
}
</style>
