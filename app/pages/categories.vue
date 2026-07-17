<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '~/composables/useProducts';
import { useCart } from '~/composables/useCart';

useSeoMeta({
  title: 'Explorar Colecciones - NexusSport',
  description: 'Navega por nuestro catálogo de indumentaria deportiva de alto rendimiento. Filtra por Calzado, Chaquetas, Pantalones, Poleras y Accesorios.',
});

const route = useRoute();
const router = useRouter();
const { loadProducts, getProducts, getCategories } = useProducts();
const { addToCart } = useCart();

const allProducts = computed(() => getProducts());
const categories = computed(() => getCategories());

onMounted(() => {
  loadProducts();
});

// Filtering and sorting states
const search = ref('');
const activeCategory = ref(route.query.cat as string || '');
const sortBy = ref('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'

watch(
  () => route.query.cat,
  (newCat) => {
    activeCategory.value = (newCat as string) || '';
  }
);

const setCategory = (cat: string) => {
  activeCategory.value = cat;
  router.push({
    path: '/categories',
    query: cat ? { cat } : {}
  });
};

const filteredProducts = computed(() => {
  let result = [...allProducts.value];

  if (activeCategory.value) {
    result = result.filter(p => p.category === activeCategory.value);
  }


  if (search.value.trim()) {
    const query = search.value.toLowerCase().trim();
    result = result.filter(
      p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
});

const toastMessage = ref('');
const showToast = ref(false);

const handleAddToCart = (product: any) => {
  addToCart(product, 1);
  toastMessage.value = `¡${product.name} agregado al carrito!`;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative">
    <!-- Header Title -->
    <div class="space-y-4 mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-white">Catálogo de Productos</h1>
      <p class="text-sm text-slate-400 max-w-lg">Encuentra y filtra la indumentaria deportiva de alto rendimiento para tu entrenamiento.</p>
    </div>

    <!-- Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Filters Sidebar -->
      <aside class="lg:col-span-3 space-y-8 lg:sticky lg:top-28">
        <!-- Search Filter -->
        <div class="glassmorphism p-6 rounded-2xl border border-slate-900 space-y-3">
          <label class="text-xs font-semibold uppercase tracking-wider text-slate-400">Buscar</label>
          <div class="relative">
            <input
              type="text"
              v-model="search"
              placeholder="Ej. Cortavientos, calzas..."
              class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4 text-slate-500 absolute left-3 top-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
            </svg>
          </div>
        </div>

        <!-- Categories List -->
        <div class="glassmorphism p-6 rounded-2xl border border-slate-900 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Colecciones</h3>
            <button
              v-if="activeCategory"
              @click="setCategory('')"
              class="text-[10px] font-semibold text-orange-500 hover:text-orange-400 transition-colors"
            >
              Limpiar
            </button>
          </div>
          <div class="flex flex-col space-y-2">
            <button
              @click="setCategory('')"
              class="text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
              :class="!activeCategory ? 'bg-orange-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'"
            >
              Todos los Productos
            </button>
            <button
              v-for="category in categories"
              :key="category"
              @click="setCategory(category)"
              class="text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
              :class="activeCategory === category ? 'bg-orange-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Sort Filter -->
        <div class="glassmorphism p-6 rounded-2xl border border-slate-900 space-y-3">
          <label class="text-xs font-semibold uppercase tracking-wider text-slate-400">Ordenar Por</label>
          <select
            v-model="sortBy"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Calificación de Clientes</option>
          </select>
        </div>
      </aside>

      <!-- Right Column: Products Grid -->
      <main class="lg:col-span-9 space-y-8">
        <!-- Results count indicator -->
        <div class="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Se encontraron {{ filteredProducts.length }} productos</span>
          <span v-if="activeCategory" class="font-medium text-orange-400">Colección: {{ activeCategory }}</span>
        </div>

        <!-- Grid -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="glassmorphism rounded-2xl flex flex-col justify-between overflow-hidden border border-slate-800 hover:border-slate-700/80 hover-lift group relative"
                   <!-- Image Link -->
            <NuxtLink :to="`/products/${product.id}`" class="relative block aspect-[4/3] w-full overflow-hidden bg-slate-950 p-5 cursor-pointer">
              <div :class="`w-full h-full rounded-xl bg-gradient-to-tr ${product.gradient} opacity-90 flex items-center justify-center relative shadow-inner overflow-hidden`">
                <!-- Real Product Image -->
                <img
                  v-if="product.imageUrl"
                  :src="product.imageUrl"
                  :alt="product.name"
                  class="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div v-if="product.imageUrl" class="absolute inset-0 bg-slate-950/20 z-0"></div>

                <!-- Fallback Sports Category Icons -->
                <template v-else>
                  <svg v-if="product.category === 'Chaquetas'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 0 1 .415.865v10.563a1.125 1.125 0 0 1-1.125 1.125H7.93a1.125 1.125 0 0 1-1.125-1.125V8.69c0-.334.14-.653.385-.877l3.87-3.55a1.125 1.125 0 0 1 .765-.304h.93Z" />
                  </svg>
                  <svg v-else-if="product.category === 'Calzado'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  </svg>
                  <svg v-else-if="product.category === 'Pantalones'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 9.75h7.5M8.25 12h7.5M8.25 15h7.5M8.25 18h7.5M3.75 3h16.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 3.75 3Z" />
                  </svg>
                  <svg v-else-if="product.category === 'Poleras'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.75 3.75 0 0 1 21 12Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-85">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </template>
              </div>
            </NuxtLink>


            <!-- Text Info -->
            <div class="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center space-x-1 text-amber-400">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-[10px] text-slate-400 font-medium ml-1">({{ product.reviewsCount }})</span>
                </div>
                <NuxtLink :to="`/products/${product.id}`" class="block cursor-pointer">
                  <h3 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {{ product.name }}
                  </h3>
                </NuxtLink>
                <p class="text-xs text-slate-400 line-clamp-2">{{ product.description }}</p>
              </div>

              <!-- Buy Action -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-900/60 mt-4">
                <span class="text-base font-bold font-display text-white">${{ product.price }}</span>
                <button
                  @click="handleAddToCart(product)"
                  class="bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/20 hover:border-transparent px-3 py-2 rounded-xl text-xs font-semibold hover-lift transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No results screen -->
        <div v-else class="glassmorphism rounded-3xl p-16 text-center border border-slate-900 space-y-4">
          <div class="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 mx-auto">
            ⚠
          </div>
          <h3 class="text-xl font-bold text-white">No se encontraron productos</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">
            Prueba ajustando los filtros de búsqueda o seleccionando otra colección.
          </p>
          <button
            @click="search = ''; setCategory('')"
            class="bg-orange-600 text-white font-semibold rounded-xl px-5 py-2 text-xs hover-lift cursor-pointer"
          >
            Limpiar Todos los Filtros
          </button>
        </div>
      </main>
    </div>

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
