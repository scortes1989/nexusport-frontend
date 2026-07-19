import { ref, computed, watch, onMounted } from 'vue';
import { type Product } from './useProducts';

// CartItem tracks product, quantity AND size
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export function useCart() {
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

  const addToCart = (product: Product, size?: string, quantity = 1) => {
    // If no size is specified (e.g. quick-add from catalog), default to first size with stock > 0
    let selectedSize = size;
    if (!selectedSize) {
      const availableSize = product.sizes?.find(s => s.stock > 0);
      selectedSize = availableSize ? availableSize.size : (product.sizes?.[0]?.size || 'Única');
    }

    // Find the stock limit for this specific size
    const sizeObj = product.sizes?.find(s => s.size === selectedSize);
    const maxStock = sizeObj ? sizeObj.stock : product.stock;

    if (maxStock <= 0) {
      console.warn("Product is out of stock in selected size", selectedSize);
      return;
    }

    const existing = cart.value.find(
      item => item.product.id === product.id && item.size === selectedSize
    );

    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, maxStock);
    } else {
      cart.value.push({
        product,
        size: selectedSize,
        quantity: Math.min(quantity, maxStock)
      });
    }
  };

  const removeFromCart = (productId: string, size: string) => {
    cart.value = cart.value.filter(
      item => !(item.product.id === productId && item.size === size)
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    const item = cart.value.find(
      item => item.product.id === productId && item.size === size
    );
    if (item) {
      const sizeObj = item.product.sizes?.find(s => s.size === size);
      const maxStock = sizeObj ? sizeObj.stock : item.product.stock;
      item.quantity = Math.max(1, Math.min(quantity, maxStock));
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
