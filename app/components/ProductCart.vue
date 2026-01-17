<template>
  <NuxtLink :to="`/product/${product.id}`" class="block">
    <div
      class="border border-gray-100 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden h-full group"
    >
      <!-- IMAGE -->
      <div class="w-full aspect-square bg-gray-50 relative flex items-center justify-center overflow-hidden">
        <img
          :src="product.image"
          alt="Product image"
          class="max-w-full max-h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <!-- DETAILS -->
      <div class="p-4 flex flex-col flex-1">
        <h3
          class="text-sm md:text-base font-semibold text-gray-900 truncate hover:text-indigo-600 transition-colors duration-300"
        >
          {{ product.title }}
        </h3>
        <p class="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
          {{ product.description }}
        </p>

        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-xs bg-red-500 text-white px-2 py-0.5 rounded">Welcome Deal</span>
          <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Top Selling</span>
          <span class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
            {{ product.rating?.count || 5000 }}+ sold
          </span>
          <span class="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">Free Shipping</span>
        </div>

        <div class="mt-auto flex items-center gap-3 mt-3">
          <span class="text-red-600 font-bold text-sm md:text-base">{{ product.price }} EGP</span>
          <span class="text-gray-400 line-through text-xs md:text-sm">{{ product.oldPrice }}</span>
        </div>
        <button class="bg-blue-500 text-white font-bold p-2 rounded-lg hover:bg-blue-00">Show Details</button>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  product: {
     type: Object, 
     required: true 
    }
})
</script>
