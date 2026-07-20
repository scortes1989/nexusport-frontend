<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCart } from '~/composables/useCart';

useSeoMeta({
  title: 'Tu Carrito de Compras - NexusSport',
  description: 'Revisa y finaliza tu pedido de indumentaria deportiva premium en NexusSport.',
});

const { cart, removeFromCart, updateQuantity, clearCart, cartTotalCount, cartTotalPrice } = useCart();

// Shipping Calculation: Free above $150, else $15
const shippingCost = computed(() => {
  if (cartTotalPrice.value >= 150 || cartTotalPrice.value === 0) {
    return 0;
  }
  return 15.00;
});

const cartFinalTotal = computed(() => {
  return cartTotalPrice.value + shippingCost.value;
});

// Checkout Simulation State
const checkoutForm = ref({
  name: '',
  email: '',
  address: '',
  card: '',
});

const checkoutLoading = ref(false);
const orderPlaced = ref(false);
const orderId = ref('');

const handleCheckout = () => {
  if (cart.value.length === 0) return;
  
  checkoutLoading.value = true;
  
  setTimeout(() => {
    checkoutLoading.value = false;
    orderPlaced.value = true;
    orderId.value = 'NXS-' + Math.floor(100000 + Math.random() * 900000);
    clearCart();
  }, 2000);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative">
    <!-- Background glows -->
    <div class="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div v-if="orderPlaced" class="max-w-xl mx-auto glassmorphism rounded-3xl p-8 lg:p-12 text-center border border-slate-900 space-y-6">
      <div class="w-20 h-20 rounded-full bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mx-auto text-3xl animate-bounce-short">
        ✓
      </div>
      <h1 class="text-3xl font-bold text-white">¡Compra Completada!</h1>
      <p class="text-xs text-slate-400 leading-relaxed">
        Muchas gracias por tu compra. Tu pedido ha sido procesado de manera exitosa y está en preparación para ser despachado.
      </p>
      
      <div class="bg-slate-950 border border-slate-900 rounded-2xl p-5 text-left space-y-2">
        <div class="flex justify-between text-xs"><span class="text-slate-400">ID del Pedido:</span> <span class="font-semibold text-white">{{ orderId }}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-400">Estado:</span> <span class="font-semibold text-emerald-400">Preparando envío</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-400">Tiempo de Entrega:</span> <span class="font-semibold text-white">2 - 5 días hábiles</span></div>
      </div>

      <NuxtLink
        to="/categories"
        class="block w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl py-3 text-xs hover-lift transition-all cursor-pointer"
      >
        Seguir Comprando
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Title -->
      <div class="space-y-4 mb-12">
        <h1 class="text-4xl font-bold tracking-tight text-white">Tu Carrito</h1>
        <p class="text-sm text-slate-400">Revisa los artículos seleccionados antes de proceder al pago.</p>
      </div>

      <!-- Main Layout Grid -->
      <div v-if="cart.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Items List -->
        <div class="lg:col-span-8 space-y-4">
          <div
            v-for="item in cart"
            :key="item.product.id + '-' + item.productSizeId"
            class="glassmorphism p-5 rounded-2xl border border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <!-- Product Thumbnail & Details -->
            <div class="flex items-center space-x-4 w-full sm:w-auto">
              <div :class="`w-16 h-16 rounded-xl bg-gradient-to-tr ${item.product.gradient} opacity-90 flex-shrink-0 flex items-center justify-center relative overflow-hidden shadow-inner`">
                <!-- Real Product Image -->
                <img
                  v-if="item.product.imageUrl"
                  :src="item.product.imageUrl"
                  :alt="item.product.name"
                  class="w-full h-full object-cover absolute inset-0 z-0 opacity-90"
                />
                <div v-if="item.product.imageUrl" class="absolute inset-0 bg-slate-950/10 z-0"></div>

                <!-- Fallback Sports Category Icons -->
                <template v-else>
                  <svg v-if="item.product.category === 'Chaquetas'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-white opacity-80">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 0 1 .415.865v10.563a1.125 1.125 0 0 1-1.125 1.125H7.93a1.125 1.125 0 0 1-1.125-1.125V8.69c0-.334.14-.653.385-.877l3.87-3.55a1.125 1.125 0 0 1 .765-.304h.93Z" />
                  </svg>
                  <svg v-else-if="item.product.category === 'Calzado'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-white opacity-80">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  </svg>
                  <svg v-else-if="item.product.category === 'Pantalones'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-white opacity-80">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 9.75h7.5M8.25 12h7.5M8.25 15h7.5M8.25 18h7.5M3.75 3h16.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 3.75 3Z" />
                  </svg>
                  <svg v-else-if="item.product.category === 'Poleras'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-white opacity-80">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.75 3.75 0 0 1 21 12Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-white opacity-80">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </template>
              </div>

              <div class="space-y-1">
                <NuxtLink :to="`/products/${item.product.id}`" class="text-base font-bold text-white hover:text-orange-400 transition-colors cursor-pointer">
                  {{ item.product.name }}
                </NuxtLink>
                <div class="flex items-center space-x-2">
                  <p class="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                    {{ item.product.category }}
                  </p>
                  <span class="text-slate-800 text-[10px]">•</span>
                  <p class="text-[10px] uppercase font-bold tracking-wider text-orange-500">
                    Talla: {{ item.size }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Qty Selector, Subtotal & Delete -->
            <div class="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
              <!-- Qty Selector -->
              <div class="flex items-center border border-slate-800 bg-slate-950 rounded-xl p-0.5">
                <button
                  @click="updateQuantity(item.product.id, item.productSizeId, item.quantity - 1)"
                  class="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <span class="w-10 text-center text-xs font-semibold text-white">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.product.id, item.productSizeId, item.quantity + 1)"
                  class="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  :disabled="item.quantity >= (item.product.sizes?.find(s => s.id === item.productSizeId)?.stock ?? item.product.stock)"
                >
                  +
                </button>
              </div>

              <!-- Price Subtotal -->
              <div class="text-sm font-semibold font-display text-white w-20 text-right">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </div>

              <!-- Delete button -->
              <button
                @click="removeFromCart(item.product.id, item.productSizeId)"
                class="text-slate-500 hover:text-red-400 p-2 transition-colors hover-lift cursor-pointer"
                title="Eliminar producto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Checkout Summary and Checkout form -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Summary card -->
          <div class="glassmorphism p-6 rounded-2xl border border-slate-900 space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Resumen del Pedido</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between"><span class="text-slate-400">Subtotal ({{ cartTotalCount }} items):</span> <span class="font-medium text-white">${{ cartTotalPrice.toFixed(2) }}</span></div>
              <div class="flex justify-between">
                <span class="text-slate-400">Envío:</span>
                <span class="font-medium text-white" v-if="shippingCost > 0">${{ shippingCost.toFixed(2) }}</span>
                <span class="font-semibold text-emerald-400 uppercase" v-else>¡Gratis!</span>
              </div>
              <div v-if="shippingCost > 0" class="text-[10px] text-orange-400">Añade ${{ (150 - cartTotalPrice).toFixed(2) }} más para envío gratis.</div>
              <hr class="border-slate-900 my-2" />
              <div class="flex justify-between text-sm font-bold"><span class="text-white">Total:</span> <span class="text-orange-400 font-display">${{ cartFinalTotal.toFixed(2) }}</span></div>
            </div>
          </div>

          <!-- Checkout Form -->
          <div class="glassmorphism p-6 rounded-2xl border border-slate-900 space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Detalles de Envío y Facturación</h3>
            <form @submit.prevent="handleCheckout" class="space-y-4 text-xs">
              <div class="space-y-1.5">
                <label class="text-slate-400 font-medium">Nombre Completo</label>
                <input
                  type="text"
                  required
                  v-model="checkoutForm.name"
                  placeholder="John Doe"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-slate-400 font-medium">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  v-model="checkoutForm.email"
                  placeholder="john@example.com"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-slate-400 font-medium">Dirección de Despacho</label>
                <input
                  type="text"
                  required
                  v-model="checkoutForm.address"
                  placeholder="Av. Providencia 1234, Santiago"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-slate-400 font-medium">Número de Tarjeta (Simulada)</label>
                <input
                  type="text"
                  required
                  v-model="checkoutForm.card"
                  placeholder="4000 1234 5678 9010"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <!-- CTA Checkout -->
              <button
                type="submit"
                id="btn-place-order"
                :disabled="checkoutLoading"
                class="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl py-3 shadow-lg shadow-orange-500/10 hover-lift transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
              >
                <span v-if="checkoutLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span v-else>Finalizar Compra y Pagar</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Empty state layout -->
      <div v-else class="glassmorphism rounded-3xl p-16 text-center border border-slate-900 space-y-4">
        <div class="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white">Tu carrito está vacío</h2>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          ¿Aún no te decides? Explora nuestra colección de indumentaria deportiva y agrega tus favoritos al carrito.
        </p>
        <NuxtLink
          to="/categories"
          class="inline-block bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl px-6 py-2.5 text-xs hover-lift transition-all cursor-pointer"
        >
          Explorar Colección
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.animate-bounce-short {
  animation: bounceShort 2s ease-in-out infinite;
}

@keyframes bounceShort {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
