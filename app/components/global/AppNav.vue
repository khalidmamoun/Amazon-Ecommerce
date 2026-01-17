<template>
  <header class="bg-gray-800 text-white p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between gap-4 relative">

      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <img src="/images/amazon-logo-white.png" alt="logo" class="h-8 object-contain"/>
      </NuxtLink>

      <!-- Search -->
      <div class="search relative flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full rounded-md py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Dropdown -->
        <div
          v-if="searchQuery"
          class="absolute top-full left-0 right-0 bg-white text-black rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto z-50"
        >
          <!-- Products Found -->
          <template v-if="filteredProducts.length">
            <NuxtLink
              v-for="product in filteredProducts"
              :key="product.id"
              :to="`/product/${product.id}`"
              class="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
              @click="searchQuery = ''"
            >
              <img
                :src="product.image || '/images/default.png'"
                alt="product"
                class="w-12 h-12 object-cover rounded"
              />
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900 truncate">
                  {{ product.title }}
                </p>
                <p class="text-xs text-gray-500">{{ formatPrice(product.price) }} EGP</p>
              </div>
            </NuxtLink>
          </template>

          <!-- No Products Found -->
          <div v-else class="p-3 text-gray-500 text-sm">
            No products found
          </div>
        </div>
      </div>

      <!-- Cart -->
      <div class="cart relative flex items-center">
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {{ cartStore.totalQuantity }}
        </span>
        <NuxtLink to="/addtocart">
          <img src="/images/icons/cart-icon.png" alt="Cart Icon" class="w-6 h-6"/>
        </NuxtLink>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart.js'

const cartStore = useCartStore()
cartStore.loadCart()

const searchQuery = ref('')
const filteredProducts = ref([])
const allProducts = ref([])

const formatPrice = (value) => Number(value).toFixed(2)

// Fetch all products once on mounted
const fetchProducts = async () => {
  try {
    const data = await $fetch('https://fakestoreapi.com/products')
    allProducts.value = data
  } catch (err) {
    console.error('Error fetching products:', err)
    allProducts.value = []
  }
}
onMounted(fetchProducts)

// Filter products client-side (case-insensitive)
watch(searchQuery, (q) => {
  if (!q) {
    filteredProducts.value = []
    return
  }
  const query = q.toLowerCase()
  filteredProducts.value = allProducts.value.filter((p) =>
    p.title.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.search div.absolute {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
