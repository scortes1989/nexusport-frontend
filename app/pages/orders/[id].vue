<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

useSeoMeta({
  title: 'Seguimiento de Pedido - NexusSport',
  description: 'Consulta el estado de envío y los detalles de tu compra en NexusSport.',
});

const route = useRoute();
const orderId = route.params.id as string;
const isSuccess = computed(() => route.query.success === 'true');

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  communeName: string;
  shippingCost: number;
  subtotal: number;
  total: number;
  status: string;
  paymentMethodName: string;
  transactionId: string;
  createdAt: string;
  estimatedDeliveryDate: string;
  items?: OrderItem[];
}

const order = ref<Order | null>(null);
const loading = ref(true);
const errorMsg = ref('');

const fetchOrder = async () => {
  try {
    const res = await $fetch<{ data: Order }>(`http://127.0.0.1:8000/api/orders/${orderId}`);
    if (res && res.data) {
      order.value = res.data;
    } else {
      errorMsg.value = 'No se encontró información del pedido.';
    }
  } catch (e: any) {
    console.error('Error fetching order details', e);
    errorMsg.value = e.data?.message || 'Error al conectar con el servidor para consultar tu pedido.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrder();
});

const formatDate = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatEstimatedDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T12:00:00');
  const formatted = date.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative min-h-[60vh]">
    <!-- Background glow -->
    <div class="absolute top-[10%] right-[-5%] w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-[90px] pointer-events-none"></div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="max-w-4xl mx-auto space-y-6 text-center py-20">
      <div class="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
      <p class="text-sm text-slate-400">Cargando estado de tu pedido...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMsg" class="max-w-xl mx-auto glassmorphism rounded-3xl p-8 lg:p-12 text-center border border-slate-900 space-y-6">
      <div class="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto text-2xl font-bold">
        !
      </div>
      <h1 class="text-2xl font-bold text-white">No pudimos cargar el pedido</h1>
      <p class="text-xs text-slate-400 leading-relaxed">{{ errorMsg }}</p>
      <NuxtLink
        to="/categories"
        class="block w-full bg-slate-900 border border-slate-800 hover:text-white text-slate-300 font-semibold rounded-xl py-3.5 text-xs transition-all cursor-pointer"
      >
        Volver al Catálogo
      </NuxtLink>
    </div>

    <!-- Success Order View -->
    <div v-else-if="order" class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <!-- Success Banner -->
      <div v-if="isSuccess" class="bg-emerald-950/30 border border-emerald-500/20 rounded-3xl p-6 text-center space-y-3 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 pointer-events-none"></div>
        <div class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto text-xl font-bold">
          ✓
        </div>
        <h2 class="text-base font-bold text-white">¡Compra Completada con Éxito!</h2>
        <p class="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
          Muchas gracias por tu compra. Tu pedido ha sido procesado de manera exitosa y ya se encuentra en preparación. A continuación puedes ver el estado y los detalles de seguimiento.
        </p>
      </div>

      <!-- Title Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-950 pb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Seguimiento de Pedido</h1>
          <p class="text-xs text-slate-400 mt-1">Código de Seguimiento: <span class="text-orange-500 font-semibold font-mono uppercase">{{ order.code }}</span></p>
        </div>
        <div class="text-left md:text-right">
          <p class="text-xs text-slate-400">Fecha de compra</p>
          <p class="text-xs font-semibold text-white mt-0.5">{{ formatDate(order.createdAt) }}</p>
        </div>
      </div>

      <!-- Order Status Progress Timeline -->
      <div class="glassmorphism p-6 md:p-8 rounded-3xl border border-slate-900 space-y-6">
        <h2 class="text-sm font-bold text-white uppercase tracking-wider">Estado de tu Envío</h2>
        
        <div class="relative pt-4">
          <!-- Timeline progress line background -->
          <div class="absolute top-[26px] left-[15px] right-[15px] h-0.5 bg-slate-900 pointer-events-none hidden md:block"></div>
          <!-- Active timeline progress line -->
          <div class="absolute top-[26px] left-[15px] w-[33%] h-0.5 bg-orange-500 pointer-events-none hidden md:block"></div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 text-xs">
            <!-- Step 1: Paid -->
            <div class="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center border font-bold bg-orange-500 border-orange-500 text-white">
                ✓
              </div>
              <div>
                <p class="font-bold text-white">Pago Aprobado</p>
                <p class="text-[10px] text-slate-400">Orden recibida con éxito</p>
              </div>
            </div>

            <!-- Step 2: Preparing -->
            <div class="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center border font-bold bg-orange-500/10 border-orange-500 text-orange-400 animate-pulse">
                2
              </div>
              <div>
                <p class="font-bold text-orange-400">En Preparación</p>
                <p class="text-[10px] text-slate-400">Empacando productos en bodega</p>
              </div>
            </div>

            <!-- Step 3: Shipped -->
            <div class="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center border font-bold bg-slate-950 border-slate-900 text-slate-600">
                3
              </div>
              <div>
                <p class="font-bold text-slate-500">Despachado</p>
                <p class="text-[10px] text-slate-600">En camino al transportista</p>
              </div>
            </div>

            <!-- Step 4: Delivered -->
            <div class="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center border font-bold bg-slate-950 border-slate-900 text-slate-600">
                4
              </div>
              <div>
                <p class="font-bold text-slate-500">Entregado</p>
                <p class="text-[10px] text-slate-600">Recibido en domicilio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Split Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Left details column (Address and Summary) -->
        <div class="md:col-span-8 space-y-8">
          <!-- Shipping and Payment Details -->
          <div class="glassmorphism p-6 rounded-3xl border border-slate-900 space-y-4">
            <h2 class="text-sm font-bold text-white uppercase tracking-wider">Información del Despacho y Pago</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div class="space-y-3">
                <div>
                  <p class="text-slate-500">Destinatario</p>
                  <p class="font-semibold text-white mt-0.5">{{ order.customerName }}</p>
                  <p class="text-slate-400 mt-0.5 text-[11px]">{{ order.customerEmail }}</p>
                </div>
                <div>
                  <p class="text-slate-500">Dirección de Envío</p>
                  <p class="font-semibold text-white mt-0.5">{{ order.shippingAddress }}</p>
                  <p class="text-orange-500 font-medium mt-0.5">{{ order.communeName }}</p>
                  <div class="space-y-1 mt-2.5">
                    <p class="text-slate-400 font-medium flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-slate-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>Despacho estimado: {{ formatEstimatedDate(order.estimatedDispatchDate) }}</span>
                    </p>
                    <p class="text-emerald-400 font-semibold flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <span>Entrega estimada: {{ formatEstimatedDate(order.estimatedDeliveryDate) }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-slate-500">Medio de Pago</p>
                  <p class="font-semibold text-orange-500 mt-0.5">{{ order.paymentMethodName }}</p>
                </div>
                <div>
                  <p class="text-slate-500">Transacción ID</p>
                  <p class="font-mono text-[11px] text-white bg-slate-950 px-2 py-1.5 rounded-lg border border-slate-900 inline-block mt-0.5">
                    {{ order.transactionId }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Items list -->
          <div class="glassmorphism p-6 rounded-3xl border border-slate-900 space-y-4">
            <h2 class="text-sm font-bold text-white uppercase tracking-wider">Productos en tu Pedido</h2>
            <div class="divide-y divide-slate-900/60 space-y-4">
              <div 
                v-for="item in order.items" 
                :key="item.id" 
                class="flex items-center space-x-4 pt-4 first:pt-0"
              >
                <!-- Thumbnail -->
                <div class="w-14 h-14 bg-slate-950 border border-slate-900 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img v-if="item.productImageUrl" :src="item.productImageUrl" :alt="item.productName" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full bg-gradient-to-br from-orange-600/20 to-red-600/20 flex items-center justify-center text-orange-500 text-xs font-bold">
                    NXS
                  </div>
                </div>

                <!-- Info -->
                <div class="flex-grow min-w-0">
                  <h4 class="text-xs font-bold text-white truncate">{{ item.productName }}</h4>
                  <div class="flex items-center space-x-2 mt-1">
                    <span class="text-[10px] text-orange-500 font-bold uppercase">Talla: {{ item.size }}</span>
                    <span class="text-slate-800 text-[10px]">•</span>
                    <span class="text-[10px] text-slate-400">Cantidad: {{ item.quantity }}</span>
                  </div>
                </div>

                <!-- Price -->
                <div class="text-right flex-shrink-0 text-xs">
                  <p class="font-bold text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  <p class="text-[10px] text-slate-500 mt-0.5">${{ item.price.toFixed(2) }} c/u</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Summary and Action column -->
        <div class="md:col-span-4 space-y-6">
          <div class="glassmorphism p-6 rounded-3xl border border-slate-900 space-y-4">
            <h2 class="text-sm font-bold text-white uppercase tracking-wider">Resumen de Cuenta</h2>
            <div class="space-y-3 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-400">Subtotal:</span>
                <span class="font-medium text-white">${{ order.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Costo de Envío:</span>
                <span class="font-medium text-white">${{ order.shippingCost.toFixed(2) }}</span>
              </div>
              <hr class="border-slate-900" />
              <div class="flex justify-between text-sm font-bold pt-1">
                <span class="text-white">Total Cobrado:</span>
                <span class="text-orange-400 font-display">${{ order.total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <NuxtLink
            to="/categories"
            class="block w-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-2xl py-3.5 text-center text-xs transition-all hover-lift cursor-pointer"
          >
            Volver al Catálogo
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
