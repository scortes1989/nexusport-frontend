<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProducts } from '~/composables/useProducts';
import { useCart } from '~/composables/useCart';

// SEO Metatags
useSeoMeta({
  title: 'NexusSport - Ropa Deportiva y Calzado de Alto Rendimiento',
  description: 'Descubre la indumentaria deportiva de próxima generación. Compra cortavientos técnicos, zapatillas de running con amortiguación reactiva y calzas de compresión premium en NexusSport.',
  ogTitle: 'NexusSport - Equipamiento Deportivo Premium',
  ogDescription: 'Explora nuestra selección de indumentaria y calzado de alto rendimiento diseñado para deportistas exigentes.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
});

const { loadProducts, getFeaturedProducts, getCategories } = useProducts();
const { addToCart } = useCart();

const featuredProducts = computed(() => getFeaturedProducts());
const categories = computed(() => getCategories());

onMounted(() => {
  loadProducts();
});

// Notification Toast
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
  <div class="space-y-20 pb-20 relative overflow-hidden">
    <!-- Background glow decors -->
    <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none"></div>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 pt-12 lg:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="space-y-6 text-left">
        <div class="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-xs text-orange-400 font-semibold tracking-wider uppercase">
          <span>Rendimiento Sin Límites</span>
        </div>
        <h1 class="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
          Desata tu máximo <span class="gradient-text">Potencial</span>
        </h1>
        <p class="text-lg text-slate-300 max-w-xl leading-relaxed">
          Indumentaria técnica y calzado de alto rendimiento diseñados con fibras transpirables y compresión inteligente para potenciar tus metas deportivas.
        </p>
        <div class="flex flex-wrap gap-4 pt-4">
          <NuxtLink
            id="hero-cta-shop"
            to="/categories"
            class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl px-8 py-3.5 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover-lift transition-all flex items-center space-x-2 text-sm cursor-pointer"
          >
            <span>Ver Catálogo</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Hero Visual (Sports shoes feature representation) -->
      <div class="relative flex items-center justify-center lg:justify-end">
        <div class="w-full max-w-[450px] aspect-square rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800/80 p-8 flex flex-col justify-between shadow-2xl relative group overflow-hidden hover:border-orange-500/40 transition-colors duration-500">
          <div class="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-red-500/10 opacity-60 pointer-events-none"></div>
          
          <div class="flex justify-between items-start z-10">
            <span class="text-xs font-semibold uppercase tracking-wider text-orange-400">Favorito de los Corredores</span>
            <span class="text-sm font-semibold font-display text-white bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">$139.99</span>
          </div>

          <!-- Shoe illustration graphic placeholder -->
          <div class="w-52 h-52 rounded-full overflow-hidden mx-auto my-4 flex items-center justify-center relative shadow-2xl shadow-orange-500/30 group-hover:scale-105 transition-transform duration-500 border-2 border-orange-500/25">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
              alt="Sonic Zoom Runner"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-slate-950/10 pointer-events-none"></div>
          </div>


          <div class="space-y-2 text-center lg:text-left z-10">
            <h3 class="text-2xl font-bold text-white">Sonic Zoom Runner</h3>
            <p class="text-xs text-slate-400">Zapatillas de Running con amortiguación reactiva.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="text-center space-y-4 mb-12">
        <h2 class="text-3xl font-bold text-white">Comprar por Colección</h2>
        <p class="text-sm text-slate-400 max-w-md mx-auto">Selecciona tu categoría de entrenamiento para ver productos dedicados.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category"
          :to="`/categories?cat=${encodeURIComponent(category)}`"
          class="glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 hover-lift border border-slate-800/80 hover:border-orange-500/30 group text-center cursor-pointer"
        >
          <div class="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-orange-400 group-hover:text-white group-hover:bg-orange-600 transition-colors duration-300 shadow-inner">
            <!-- Sports Category Icons -->
            <svg v-if="category === 'Chaquetas'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 0 1 .415.865v10.563a1.125 1.125 0 0 1-1.125 1.125H7.93a1.125 1.125 0 0 1-1.125-1.125V8.69c0-.334.14-.653.385-.877l3.87-3.55a1.125 1.125 0 0 1 .765-.304h.93Z" />
            </svg>
            <svg v-else-if="category === 'Calzado'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            </svg>
            <svg v-else-if="category === 'Pantalones'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 9.75h7.5M8.25 12h7.5M8.25 15h7.5M8.25 18h7.5M3.75 3h16.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 3.75 3Z" />
            </svg>
            <svg v-else-if="category === 'Poleras'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.75 3.75 0 0 1 21 12Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <span class="font-display font-semibold text-sm text-slate-200 group-hover:text-orange-400 transition-colors">{{ category }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="flex items-end justify-between mb-12">
        <div class="space-y-4">
          <h2 class="text-3xl font-bold text-white">Productos Destacados</h2>
          <p class="text-sm text-slate-400 max-w-md">Indumentaria con la máxima tecnología de absorción y retorno energético.</p>
        </div>
        <NuxtLink to="/categories" class="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors flex items-center space-x-1 hover-lift">
          <span>Ver Colección</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Product Card -->
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="glassmorphism rounded-2xl flex flex-col justify-between overflow-hidden border border-slate-800 hover:border-slate-700/80 hover-lift group relative"
        >
          <!-- Thumbnail Graphic representing Product -->
          <NuxtLink :to="`/products/${product.id}`" class="relative block aspect-[4/3] w-full overflow-hidden bg-slate-950 p-6 cursor-pointer">
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
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-16 h-16 text-white opacity-80">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </template>
            </div>

            <span class="absolute top-4 left-4 bg-slate-900/90 text-slate-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-800">
              {{ product.category }}
            </span>
          </NuxtLink>

          <!-- Details -->
          <div class="p-6 space-y-4 flex-grow flex flex-col justify-between">
            <div class="space-y-2">
              <div class="flex items-center space-x-1 text-amber-400">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-[10px] text-slate-400 font-medium ml-1">({{ product.reviewsCount }})</span>
              </div>
              <NuxtLink :to="`/products/${product.id}`" class="block cursor-pointer">
                <h3 class="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
                  {{ product.name }}
                </h3>
              </NuxtLink>
              <p class="text-xs text-slate-400 line-clamp-2">
                {{ product.description }}
              </p>
            </div>

            <!-- Price and Buy Action -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-900/60 mt-4">
              <span class="text-lg font-bold font-display text-white">
                ${{ product.price }}
              </span>
              <button
                :id="`btn-add-${product.id}`"
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
    </section>

    <!-- Value Propositions -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="glassmorphism rounded-3xl p-8 lg:p-12 border border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-red-500/5 pointer-events-none"></div>

        <!-- Prop 1 -->
        <div class="space-y-3 flex flex-col items-center">
          <div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.12-1.243l1.105-9.4A1.125 1.125 0 0 1 4.485 7.5h15.03a1.125 1.125 0 0 1 1.12.898l1.105 9.4a1.125 1.125 0 0 1-1.12 1.243M3 7.5V4.5m0-2.25h18" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Despacho Rápido</h3>
          <p class="text-xs text-slate-400 max-w-[200px]">Envíos express prioritarios gratis en compras mayores a $150.</p>
        </div>

        <!-- Prop 2 -->
        <div class="space-y-3 flex flex-col items-center">
          <div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Garantía Deportiva</h3>
          <p class="text-xs text-slate-400 max-w-[200px]">Materiales testeados para alta fricción, tensión y climas extremos.</p>
        </div>

        <!-- Prop 3 -->
        <div class="space-y-3 flex flex-col items-center">
          <div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Cambio Sin Fricción</h3>
          <p class="text-xs text-slate-400 max-w-[200px]">¿No te quedó la talla? Cámbialo sin costo en un plazo de 30 días.</p>
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
