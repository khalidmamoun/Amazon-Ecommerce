<!-- CheckoutPage.vue -->
<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- ================= Checkout Form ================= -->
      <section class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6">Checkout Information</h2>

        <form @submit.prevent="submitOrder" class="space-y-5">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input v-model.trim="form.name" type="text" required placeholder="Enter your full name"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
            <input v-model.trim="form.phone" type="tel" required placeholder="01xxxxxxxxx"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Shipping Address</label>
            <textarea v-model.trim="form.address" rows="4" required placeholder="Street, City, Notes"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"></textarea>
          </div>

          <button type="submit" :disabled="isSubmitDisabled"
            class="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Place Order
          </button>
        </form>
      </section>

      <!-- ================= Order Summary ================= -->
      <section class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6">Order Summary</h2>

        <div v-if="cartStore.cart.length" class="space-y-4">
          <div v-for="item in cartStore.cart" :key="item.id" class="flex items-center gap-4 border-b pb-4">
            <img :src="item.image || '/images/default.png'" alt="product" class="w-20 h-20 object-cover rounded-xl border" />
            <div class="flex-1">
              <p class="font-semibold text-gray-800">{{ item.title || item.name }}</p>
              <p class="text-sm text-gray-500">Price: {{ formatPrice(getPrice(item)) }} EGP</p>
              <p class="text-sm text-gray-500">Qty: {{ getQuantity(item) }}</p>
            </div>
            <p class="font-bold text-gray-900">{{ (getPrice(item) * getQuantity(item)).toFixed(2) }} EGP</p>
          </div>
        </div>

        <p v-else class="text-gray-500 text-center">Your cart is empty</p>

        <div class="mt-8 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{{ totalPrice.toFixed(2) }} EGP</span>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useCartStore } from '~/stores/cart.js'
import { useNuxtApp } from '#app'

const cartStore = useCartStore()
cartStore.loadCart()

// Reactive form data
const form = reactive({ name: '', phone: '', address: '' })

// Safe price calculation
const getPrice = item => {
  let price = 0
  if (item.price) price = Number(item.price)
  else if (item.unitPrice) price = Number(item.unitPrice)
  else if (item.product?.price) price = Number(item.product.price)
  else if (item.price?.amount) price = Number(item.price.amount)
  if (isNaN(price)) price = 0
  return price
}

const getQuantity = item => Number(item.quantity ?? 1)

const formatPrice = value => Number(value).toFixed(2)

const totalPrice = computed(() =>
  cartStore.cart.reduce((sum, item) => sum + getPrice(item) * getQuantity(item), 0)
)

const isSubmitDisabled = computed(() =>
  !form.name || !form.phone || !form.address || !cartStore.cart.length
)

// Submit order: validates form & cart,
//  sends POST to /api/order,
//  handles success/failure, safe price & qty calculation
const submitOrder = async () => {
  if (isSubmitDisabled.value) return

  try {
    const nuxtApp = useNuxtApp()
    // POST request to backend API
    await $fetch('/api/order', {
      method: 'POST',
      body: {
        customer: { ...form },
        items: cartStore.cart,
        total: totalPrice.value
      }
    })

    alert(' Your order has been placed successfully!')
    cartStore.cart = [] // clear cart
  } catch (error) {
    console.error(error)
    alert('❌ Failed to place order. Please try again later.')
  }
}
</script>
