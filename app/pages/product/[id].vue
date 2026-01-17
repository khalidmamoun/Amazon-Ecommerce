<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden gap-8">

      <!-- IMAGE -->
      <div class="lg:w-1/3 bg-gray-50 flex items-center justify-center p-6">
        <img :src="product.image" alt="Product" class="max-h-64 object-contain transition-transform duration-500 hover:scale-105"/>
      </div>

      <!-- CONTENT -->
      <div class="lg:w-2/3 p-6 flex flex-col">
        <h1 class="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">{{ product.title }}</h1>

        <div class="flex items-center gap-2 mt-3" v-if="product.rating">
          <div class="flex text-yellow-400 text-sm">★ ★ ★ ★ ☆</div>
          <span class="text-sm text-gray-500">({{ product.rating.count || 5000 }} reviews)</span>
        </div>

        <p class="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">{{ product.description }}</p>

        <div class="flex flex-wrap gap-2 mt-4">
          <span class="badge">Free Shipping</span>
          <span class="badge">Top Selling</span>
          <span class="badge">Original Product</span>
        </div>

        <hr class="my-6 border-gray-200" />

        <div class="flex items-end gap-4">
          <span class="text-2xl font-extrabold text-red-600">{{ product.price }} EGP</span>
        </div>

        <button @click="addToCart" class="mt-6 p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart.js'

const route = useRoute()
const productid = route.params.id

const { data: product } = await useAsyncData('product', async () => {
  const res = await axios.get(`https://fakestoreapi.com/products/${productid}`)
  return res.data
})

const cartStore = useCartStore()
cartStore.loadCart()

const addToCart = () => {
  cartStore.addProduct(product.value)
}
</script>
