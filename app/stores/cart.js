import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),

  getters: {
    totalQuantity: (state) => 
      state.cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0),

    totalPrice: (state) => 
      state.cart.reduce((sum, item) => sum + ((item.price ?? 0) * (item.quantity ?? 1)), 0)
  },

  actions: {
    addProduct(product) {
      const existing = this.cart.find(i => i.id === product.id)
      if(existing) {
        existing.quantity = (existing.quantity ?? 1) + 1
      } else {
        this.cart.push({
          ...product,
          quantity: 1,
          price: product.price ?? 0
        })
      }
      this.saveCart()
    },

    saveCart() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },

    loadCart() {
      if (process.client) {
        try {
          const saved = JSON.parse(localStorage.getItem('cart'))
          this.cart = Array.isArray(saved) ? saved.map(item => ({
            ...item,
            price: item.price ?? 0,
            quantity: item.quantity ?? 1
          })) : []
        } catch {
          this.cart = []
        }
      }
    },

    removeProduct(id) {
      this.cart = this.cart.filter(item => item.id !== id)
      this.saveCart()
    },

    clearCart() {
      this.cart = []
      this.saveCart()
    },

    increaseQuantity(id) {
      const item = this.cart.find(i => i.id === id)
      if(item) item.quantity = (item.quantity ?? 1) + 1
      this.saveCart()
    },

    decreaseQuantity(id) {
      const item = this.cart.find(i => i.id === id)
      if(item && (item.quantity ?? 1) > 1) item.quantity--
      this.saveCart()
    },
  }
})
