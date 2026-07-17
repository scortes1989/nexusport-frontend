import { ref, computed, watch, onMounted } from 'vue';
import { type Product } from './useProducts';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function useCart() {
  // Use Nuxt's shared state so that it is reactive across all pages and components
  const cart = useState<CartItem[]>('cart_state', () => []);
  const initialized = useState<boolean>('cart_initialized', () => false);

  // Load from localStorage only on client side after mounting
  onMounted(() => {
    if (!initialized.value) {
      const stored = localStorage.getItem('e_commerce_cart');
      if (stored) {
        try {
          cart.value = JSON.parse(stored);
        } catch (e) {
          console.error("Error reading cart from localStorage", e);
        }
      }
      initialized.value = true;
    }
  });

  // Watch for changes in cart and save to localStorage
  if (process.client) {
    watch(
      cart,
      (newCart) => {
        localStorage.setItem('e_commerce_cart', JSON.stringify(newCart));
      },
      { deep: true }
    );
  }

  const addToCart = (product: Product, quantity = 1) => {
    const existing = cart.value.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    } else {
      cart.value.push({ product, quantity: Math.min(quantity, product.stock) });
    }
  };

  const removeFromCart = (productId: string) => {
    cart.value = cart.value.filter(item => item.product.id !== productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, item.product.stock));
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const cartTotalCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalCount,
    cartTotalPrice
  };
}
