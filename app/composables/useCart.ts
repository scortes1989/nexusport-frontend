import { ref, computed, onMounted } from 'vue';
import { type Product } from './useProducts';

// CartItem tracks product, quantity, size string AND productSizeId relation
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  productSizeId: number;
}

export function useCart() {
  // Use Nuxt's shared state so that it is reactive across all pages and components
  const cart = useState<CartItem[]>('cart_state', () => []);
  const initialized = useState<boolean>('cart_initialized', () => false);

  // Initialize and persist user session ID in cookie
  const sessionId = useCookie<string>('nexusport_session_id', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  });

  // Ensure unique session ID exists
  if (!sessionId.value) {
    sessionId.value = crypto.randomUUID();
  }

  // Get headers with session ID
  const getHeaders = () => {
    return {
      'X-Session-ID': sessionId.value || ''
    };
  };

  // Sync state by querying Laravel API
  const fetchCart = async () => {
    try {
      const res = await $fetch<{ cart: CartItem[] }>('http://127.0.0.1:8000/api/cart', {
        headers: getHeaders()
      });
      if (res && Array.isArray(res.cart)) {
        cart.value = res.cart;
      }
    } catch (e) {
      console.warn("Error fetching cart from Laravel API", e);
    }
  };

  // Load from session API after mounting on client side
  onMounted(() => {
    if (!initialized.value) {
      fetchCart();
      initialized.value = true;
    }
  });

  const addToCart = async (product: Product, size?: string, quantity = 1) => {
    // If no size is specified (e.g. quick-add from catalog), default to first size with stock > 0
    let selectedSize = size;
    if (!selectedSize) {
      const availableSize = product.sizes?.find(s => s.stock > 0);
      selectedSize = availableSize ? availableSize.size : (product.sizes?.[0]?.size || 'Única');
    }

    // Find the stock limit and productSizeId for this specific size
    const sizeObj = product.sizes?.find(s => s.size === selectedSize);
    const maxStock = sizeObj ? sizeObj.stock : product.stock;
    const productSizeId = sizeObj ? sizeObj.id : null;

    if (!productSizeId) {
      console.warn("No valid size ID found for selected size", selectedSize);
      return;
    }

    if (maxStock <= 0) {
      console.warn("Product is out of stock in selected size", selectedSize);
      return;
    }

    try {
      await $fetch('http://127.0.0.1:8000/api/cart', {
        method: 'POST',
        headers: getHeaders(),
        body: {
          product_id: Number(product.id),
          product_size_id: Number(productSizeId),
          quantity: Math.min(quantity, maxStock)
        }
      });
      // Refresh the local state
      await fetchCart();
    } catch (e) {
      console.error("Error adding product to Laravel cart API", e);
    }
  };

  const removeFromCart = async (productId: string, productSizeId: number) => {
    try {
      await $fetch('http://127.0.0.1:8000/api/cart', {
        method: 'DELETE',
        headers: getHeaders(),
        body: {
          product_id: Number(productId),
          product_size_id: Number(productSizeId)
        }
      });
      // Refresh local state
      await fetchCart();
    } catch (e) {
      console.error("Error removing product from Laravel cart API", e);
    }
  };

  const updateQuantity = async (productId: string, productSizeId: number, quantity: number) => {
    try {
      await $fetch('http://127.0.0.1:8000/api/cart', {
        method: 'PUT',
        headers: getHeaders(),
        body: {
          product_id: Number(productId),
          product_size_id: Number(productSizeId),
          quantity: quantity
        }
      });
      // Refresh local state
      await fetchCart();
    } catch (e) {
      console.error("Error updating quantity in Laravel cart API", e);
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
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalCount,
    cartTotalPrice
  };
}
