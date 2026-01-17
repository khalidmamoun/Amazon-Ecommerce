<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex items-center justify-between gap-4">
      
      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <img src="/images/amazon-logo-white.png" alt="logo" class="h-8 object-contain">
      </NuxtLink>

      <!-- Search -->
      <div class="search flex items-center flex-1 w-100 relative">
        <input type="search" placeholder="Search..." class="w-full rounded-md py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <img src="/images/icons/search-icon.png" alt="Search Icon" class="absolute right-2 w-5 h-5 cursor-pointer" />
      </div>

      <!-- Theme Toggle -->
      <div class="mode flex items-center">
        <div class="theme-logo cursor-pointer" id="themeLogo">
          <i class="fa-solid fa-moon moon mr-2"></i>
          <i class="fa-solid fa-sun sun"></i>
        </div>
      </div>

      <!-- Cart -->
      <div class="cart relative flex items-center">
        <span class="quantity absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {{ cartStore.totalQuantity }}
        </span>
        <NuxtLink to="/addtocart">
          <img src="/images/icons/cart-icon.png" alt="Cart Icon" class="w-6 h-6">
        </NuxtLink>
      </div>

    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '~/stores/cart.js'

const cartStore = useCartStore()
cartStore.loadCart()
</script>
