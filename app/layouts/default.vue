<script setup lang="ts">
import { onMounted } from 'vue';
import { useCart } from '~/composables/useCart';
import { useProducts } from '~/composables/useProducts';

const { cartTotalCount } = useCart();

const route = useRoute();

// Simple navigation links
const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Catálogo', path: '/categories' },
];
</script>





<template>
  <div class="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-600 selection:text-white">
    <!-- Header / Navbar -->
    <header class="sticky top-0 z-50 glassmorphism border-b border-slate-900 px-4 lg:px-8 py-4 transition-all duration-300">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <img src="/logo.png" alt="NexusSport Logo" class="w-10 h-10 rounded-xl object-cover shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300" />
          <span class="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            NEXUS<span class="text-orange-500">SPORT</span>
          </span>
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-orange-400"
            :class="route.path === link.path ? 'text-orange-500' : 'text-slate-300'"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Action Icons (Search, Cart) -->
        <div class="flex items-center space-x-6">
          <!-- Cart Icon -->
          <NuxtLink to="/cart" class="relative p-2 text-slate-300 hover:text-orange-400 transition-colors duration-200 hover-lift group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span
              v-if="cartTotalCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-600 text-white font-display font-semibold text-[10px] flex items-center justify-center border border-slate-950 animate-pulse shadow-md shadow-orange-500/50"
            >
              {{ cartTotalCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-990 border-t border-slate-900 pt-16 pb-8 px-4 lg:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand / About -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <img src="/logo.png" alt="NexusSport Logo" class="w-8 h-8 rounded-lg object-cover shadow-md" />
            <span class="font-display font-bold text-lg text-white">
              NEXUS<span class="text-orange-500">SPORT</span>
            </span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed max-w-xs">
            Indumentaria y calzado deportivo de alto rendimiento diseñado para potenciar tu agilidad y estilo de vida activo.
          </p>
        </div>

        <!-- Links: Shop -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Colecciones</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><NuxtLink to="/categories" class="hover:text-orange-400 transition-colors">Todos los Productos</NuxtLink></li>
            <li><NuxtLink to="/categories?cat=Chaquetas" class="hover:text-orange-400 transition-colors">Chaquetas</NuxtLink></li>
            <li><NuxtLink to="/categories?cat=Calzado" class="hover:text-orange-400 transition-colors">Calzado</NuxtLink></li>
            <li><NuxtLink to="/categories?cat=Pantalones" class="hover:text-orange-400 transition-colors">Pantalones</NuxtLink></li>
            <li><NuxtLink to="/categories?cat=Poleras" class="hover:text-orange-400 transition-colors">Poleras</NuxtLink></li>
          </ul>
        </div>

        <!-- Links: Support -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Ayuda</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="#" class="hover:text-orange-400 transition-colors">Contacto</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Guía de Tallas</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Cambios y Devoluciones</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-200">Únete al Club</h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Suscríbete para recibir lanzamientos exclusivos, entrenamientos recomendados y un 15% de descuento en tu primera compra.
          </p>
          <form class="flex items-center" @submit.prevent>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              class="w-full bg-slate-900 border border-slate-800 rounded-l-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <button
              type="submit"
              class="bg-orange-600 text-white px-4 py-2 rounded-r-xl font-display font-medium text-xs hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/10 cursor-pointer"
            >
              Unirse
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="max-w-7xl mx-auto border-t border-slate-900/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; 2026 NexusSport Inc. Todos los derechos reservados.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-slate-300">Términos de Servicio</a>
          <a href="#" class="hover:text-slate-300">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles if needed, Tailwind handles most */
.router-link-active {
  color: #fb923c;
  font-weight: 600;
}
</style>
