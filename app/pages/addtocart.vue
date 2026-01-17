<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

    <div class="flex flex-col gap-6" v-if="cartStore.cart.length > 0">
      <div
        v-for="(item) in cartStore.cart"
        :key="item.id"
        class="flex bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <div class="w-1/3 bg-gray-50 flex items-center justify-center p-4">
          <img
            :src="item.image"
            alt="product image"
            class="max-w-full max-h-48 object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div class="w-2/3 p-5 flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
              {{ item.title }}
            </h3>

            <p class="text-sm text-gray-500 mt-1 line-clamp-2">
              {{ item.description }}
            </p>

            <div class="flex flex-wrap gap-2 mt-3">
              <span class="text-xs bg-red-500 text-white px-2 py-0.5 rounded">Welcome Deal</span>
              <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Top Selling</span>
              <span class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">Free Shipping</span>
            </div>
          </div>

          <!-- quantity + buttons -->
          <div class="flex items-center gap-3 mt-4">
            <button 
              @click="cartStore.decreaseQuantity(item.id)"
              class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 font-bold"
            >-</button>

            <span class="px-4 py-1 border rounded">{{ item.quantity }}</span>

            <button 
              @click="cartStore.increaseQuantity(item.id)"
              class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 font-bold"
            >+</button>

            <button 
              @click="cartStore.removeProduct(item.id)"
              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 font-bold ml-auto"
            >
              Remove
            </button>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <span class="text-red-600 font-bold text-lg">
{{ (Number(item.price.toFixed(2)) * item.quantity).toFixed(2) }} EGP
            </span>
            <span class="text-gray-400 line-through text-sm ml-2">
              {{ item.oldPrice }} EGP
            </span>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <span class="text-xl font-bold">Total: {{ cartStore.totalPrice.toFixed(2) }} EGP</span>
        <div class="flex gap-3">
          <button
            @click="cartStore.clearCart"
            class="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>
          <button
            class="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>

<div v-else class="flex flex-col items-center justify-center py-20">
  <img src="/images/emptycart.png" alt="Empty Cart" class="w-64 h-64 object-contain mb-6" />
</div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart.js'

const cartStore = useCartStore()
cartStore.loadCart()
</script>
