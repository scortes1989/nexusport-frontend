<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProducts } from '~/composables/useProducts';
import { useCart } from '~/composables/useCart';

const route = useRoute();
const { getProductById, getProductsByCategory } = useProducts();
const { addToCart } = useCart();

const productId = route.params.id as string;
const product = getProductById(productId);

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' });
}

useSeoMeta({
  title: `${product.name} - NexusSport`,
  description: product.description,
  ogTitle: `${product.name} - Compra en NexusSport`,
  ogDescription: product.description,
});

const quantity = ref(1);
const selectedSize = ref('');
const toastMessage = ref('');
const showToast = ref(false);

// Size list options based on category
const sizes = computed(() => {
  if (!product) return [];
  if (product.category === 'Calzado') {
    return ['38', '39', '40', '41', '42', '43', '44'];
  }
  if (product.category === 'Accesorios') {
    return ['Única'];
  }
  return ['S', 'M', 'L', 'XL'];
});

// Set default size
if (sizes.value.length > 0) {
  selectedSize.value = sizes.value[0];
}

const handleAddToCart = () => {
  if (!product) return;
  addToCart(product, quantity.value);
  toastMessage.value = `¡${quantity.value}x ${product.name} (Talla: ${selectedSize.value}) agregado al carrito!`;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const incrementQty = () => {
  if (product && quantity.value < product.stock) {
    quantity.value++;
  }
};

const decrementQty = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const relatedProducts = computed(() => {
  if (!product) return [];
  return getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);
});
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16 relative">
    <!-- Back link -->
    <div>
      <NuxtLink to="/categories" class="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-orange-400 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span>Volver al Catálogo</span>
      </NuxtLink>
    </div>

    <!-- Product Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Left Column: Visual Mockup Card -->
      <div class="lg:col-span-6 flex flex-col justify-start">
        <div class="w-full aspect-[4/3] rounded-3xl bg-slate-950 p-12 border border-slate-900 flex items-center justify-center relative overflow-hidden shadow-2xl">
          <div :class="`w-full h-full rounded-2xl bg-gradient-to-tr ${product.gradient} opacity-90 flex items-center justify-center relative shadow-inner overflow-hidden`">
            <!-- Real Product Image -->
            <img
              v-if="product.imageUrl"
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-full object-cover absolute inset-0 z-0 opacity-95"
            />
            <div v-if="product.imageUrl" class="absolute inset-0 bg-slate-950/15 z-0"></div>

            <!-- Fallback Sports Category Icons -->
            <template v-else>
              <svg v-if="product.category === 'Chaquetas'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-32 h-32 text-white opacity-85">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 0 1 .415.865v10.563a1.125 1.125 0 0 1-1.125 1.125H7.93a1.125 1.125 0 0 1-1.125-1.125V8.69c0-.334.14-.653.385-.877l3.87-3.55a1.125 1.125 0 0 1 .765-.304h.93Z" />
              </svg>
              <svg v-else-if="product.category === 'Calzado'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-32 h-32 text-white opacity-85">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
              </svg>
              <svg v-else-if="product.category === 'Pantalones'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-32 h-32 text-white opacity-85">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 9.75h7.5M8.25 12h7.5M8.25 15h7.5M8.25 18h7.5M3.75 3h16.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 3.75 3Z" />
              </svg>
              <svg v-else-if="product.category === 'Poleras'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-32 h-32 text-white opacity-85">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.75 3.75 0 0 1 21 12Z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-32 h-32 text-white opacity-80">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </template>
            <div class="absolute -inset-4 bg-gradient-to-tr from-orange-500/10 to-red-500/10 blur-lg pointer-events-none"></div>
          </div>
        </div>

      </div>

      <!-- Right Column: Specs Panel & Order Builder -->
      <div class="lg:col-span-6 space-y-6">
        <!-- Category and Rating -->
        <div class="flex items-center justify-between">
          <span class="bg-orange-600/10 text-orange-400 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-orange-500/15">
            {{ product.category }}
          </span>
          <div class="flex items-center space-x-1 text-amber-400">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4.5 h-4.5">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-xs font-semibold text-white ml-2">{{ product.rating }}</span>
            <span class="text-xs text-slate-400">({{ product.reviewsCount }} opiniones)</span>
          </div>
        </div>

        <!-- Product Name & Price -->
        <div class="space-y-2">
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {{ product.name }}
          </h1>
          <div class="text-2xl font-bold font-display text-orange-400">
            ${{ product.price }}
          </div>
        </div>

        <hr class="border-slate-900" />

        <!-- Description -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Descripción</h3>
          <p class="text-sm text-slate-300 leading-relaxed">
            {{ product.longDescription }}
          </p>
        </div>

        <!-- Sport Size Selector -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Seleccionar Talla</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="size in sizes"
              :key="size"
              @click="selectedSize = size"
              class="w-12 h-12 flex items-center justify-center text-xs font-semibold border rounded-xl transition-all cursor-pointer"
              :class="selectedSize === size
                ? 'bg-orange-600 border-transparent text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Selection Controls (Quantity & Add button) -->
        <div class="space-y-4 pt-2">
          <div class="flex items-center space-x-6">
            <!-- Quantity Box -->
            <div class="flex flex-col space-y-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Cantidad</label>
              <div class="flex items-center border border-slate-800 bg-slate-900 rounded-xl overflow-hidden p-1">
                <button
                  @click="decrementQty"
                  class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  :disabled="quantity <= 1"
                >
                  -
                </button>
                <span class="w-12 text-center text-sm font-semibold text-white">{{ quantity }}</span>
                <button
                  @click="incrementQty"
                  class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  :disabled="quantity >= product.stock"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Stock Indicator -->
            <div class="flex flex-col justify-end pt-4">
              <span v-if="product.stock <= 5" class="text-xs font-semibold text-red-500 flex items-center space-x-1 animate-pulse">
                <span>⚠</span>
                <span>¡Poco stock! ({{ product.stock }} restantes)</span>
              </span>
              <span v-else class="text-xs text-emerald-400 flex items-center space-x-1">
                <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-1"></span>
                <span>En Stock ({{ product.stock }} unidades)</span>
              </span>
            </div>
          </div>

          <!-- Add to Cart CTA -->
          <button
            id="btn-add-to-cart-detail"
            @click="handleAddToCart"
            class="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-2xl py-4 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover-lift transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span>Agregar al Carrito</span>
          </button>
        </div>

        <hr class="border-slate-900" />

        <!-- Specifications Table -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Ficha Técnica</h3>
          <div class="border border-slate-900 rounded-2xl overflow-hidden glassmorphism">
            <table class="w-full text-left border-collapse text-xs">
              <tbody>
                <tr
                  v-for="(spec, idx) in product.specs"
                  :key="spec.label"
                  :class="idx % 2 === 0 ? 'bg-slate-950/30' : 'bg-transparent'"
                  class="border-b border-slate-900/60 last:border-0"
                >
                  <td class="px-5 py-3 font-semibold text-slate-400 w-1/3 border-r border-slate-900/40">{{ spec.label }}</td>
                  <td class="px-5 py-3 text-slate-200">{{ spec.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section v-if="relatedProducts.length > 0" class="pt-12 border-t border-slate-900">
      <div class="space-y-8">
        <h2 class="text-2xl font-bold text-white">Productos Relacionados</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="rel in relatedProducts"
            :key="rel.id"
            class="glassmorphism rounded-2xl flex flex-col justify-between overflow-hidden border border-slate-800 hover:border-slate-700/80 hover-lift group relative"
          >
            <!-- Thumbnail -->
            <NuxtLink :to="`/products/${rel.id}`" class="relative block aspect-[4/3] w-full overflow-hidden bg-slate-950 p-6 cursor-pointer">
              <div :class="`w-full h-full rounded-xl bg-gradient-to-tr ${rel.gradient} opacity-90 flex items-center justify-center relative shadow-inner overflow-hidden`">
                <!-- Real Product Image -->
                <img
                  v-if="rel.imageUrl"
                  :src="rel.imageUrl"
                  :alt="rel.name"
                  class="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div v-if="rel.imageUrl" class="absolute inset-0 bg-slate-950/20 z-0"></div>

                <!-- Fallback Sports Category Icons -->
                <template v-else>
                  <svg v-if="rel.category === 'Chaquetas'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 0 1 .415.865v10.563a1.125 1.125 0 0 1-1.125 1.125H7.93a1.125 1.125 0 0 1-1.125-1.125V8.69c0-.334.14-.653.385-.877l3.87-3.55a1.125 1.125 0 0 1 .765-.304h.93Z" />
                  </svg>
                  <svg v-else-if="rel.category === 'Calzado'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  </svg>
                  <svg v-else-if="rel.category === 'Pantalones'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 9.75h7.5M8.25 12h7.5M8.25 15h7.5M8.25 18h7.5M3.75 3h16.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 3.75 3Z" />
                  </svg>
                  <svg v-else-if="rel.category === 'Poleras'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.75 3.75 0 0 1 21 12Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </template>
              </div>
            </NuxtLink>


            <!-- Rel Info -->
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div class="space-y-1">
                <NuxtLink :to="`/products/${rel.id}`" class="block cursor-pointer">
                  <h4 class="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    {{ rel.name }}
                  </h4>
                </NuxtLink>
                <div class="text-sm font-bold font-display text-orange-400">${{ rel.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast Notification -->
    <transition name="fade">
      <div v-if="showToast" class="fixed bottom-6 right-6 z-50 bg-slate-900 border border-orange-500/30 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-orange-500/10 flex items-center space-x-3 max-w-sm">
        <div class="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
          ✓
        </div>
        <p class="text-xs font-semibold tracking-wide">{{ toastMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
