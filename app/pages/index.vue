<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <ProductCart
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
<script setup>
import axios from 'axios'
import ProductCart from '~/components/ProductCart.vue'

const { data: products } = await useAsyncData('products', async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  return res.data
})
</script>

