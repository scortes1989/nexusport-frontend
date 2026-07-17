export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  gradient: string;
  rating: number;
  reviewsCount: number;
  specs: { label: string; value: string }[];
  featured: boolean;
  stock: number;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Aura Windrunner",
    description: "Cortavientos técnico ultraligero y plegable, resistente al agua y viento.",
    longDescription: "El Aura Windrunner redefine la protección climática para deportistas. Construido con poliéster ripstop 100% reciclado con tratamiento repelente al agua (DWR), es capaz de soportar lluvias ligeras y ráfagas de viento fuertes. Su diseño inteligente permite plegarlo por completo dentro de su propio bolsillo para guardarlo fácilmente.",
    price: 89.99,
    category: "Chaquetas",
    gradient: "from-orange-500 to-red-600",
    rating: 4.8,
    reviewsCount: 124,
    specs: [
      { label: "Material", value: "Poliéster 100% Reciclado con DWR" },
      { label: "Peso", value: "115 gramos (Talla M)" },
      { label: "Visibilidad", value: "Detalles reflectantes de 360 grados" },
      { label: "Corte", value: "Ajuste deportivo (Active Fit)" }
    ],
    featured: true,
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    name: "Sonic Zoom Runner",
    description: "Zapatillas de running de alto rendimiento con amortiguación reactiva ultraligera.",
    longDescription: "Diseñadas para corredores que buscan batir sus récords personales. Las Sonic Zoom Runner incorporan nuestra tecnología de espuma ZoomTech de doble densidad en la entresuela, proporcionando un retorno de energía del 85% en cada zancada. El empeine de malla técnica sin costuras garantiza máxima ventilación y un ajuste perfecto tipo calcetín.",
    price: 139.99,
    category: "Calzado",
    gradient: "from-blue-500 to-teal-500",
    rating: 4.9,
    reviewsCount: 88,
    specs: [
      { label: "Entresuela", value: "Espuma reactiva ZoomTech" },
      { label: "Drop", value: "8 mm" },
      { label: "Suela", value: "Goma de alta fricción antideslizante" },
      { label: "Tipo de Pisada", value: "Neutra" }
    ],
    featured: true,
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Helix Compression Tights",
    description: "Calzas de compresión graduada para soporte muscular y rápida recuperación.",
    longDescription: "Las calzas Helix Compression ofrecen soporte avanzado a los grupos musculares mayores (cuádriceps, isquiotibiales y pantorrillas), reduciendo la oscilación muscular y previniendo la fatiga. Su tejido elástico en 4 direcciones absorbe la humedad y cuenta con tratamiento antibacteriano para mantenerte fresco.",
    price: 69.99,
    category: "Pantalones",
    gradient: "from-indigo-600 to-blue-700",
    rating: 4.7,
    reviewsCount: 205,
    specs: [
      { label: "Compresión", value: "Compresión médica graduada (20-25 mmHg)" },
      { label: "Tejido", value: "82% Nylon, 18% Elastano" },
      { label: "Ajuste", value: "Cintura alta con cordón interior plano" },
      { label: "Bolsillos", value: "Bolsillo trasero con cierre para llaves/móvil" }
    ],
    featured: true,
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    name: "KeyForge Thermo Tee",
    description: "Polera térmica de manga larga y secado rápido para climas fríos.",
    longDescription: "Entrena al aire libre sin importar el clima. La KeyForge Thermo Tee cuenta con un tejido de microfibra cepillada en su interior que atrapa el calor corporal y libera la humedad al exterior. Su estructura elástica y costuras planas minimizan el roce y permiten total libertad de movimiento en tus entrenamientos.",
    price: 45.00,
    category: "Poleras",
    gradient: "from-amber-500 to-orange-600",
    rating: 4.6,
    reviewsCount: 63,
    specs: [
      { label: "Tecnología", value: "Interior cepillado ThermoWarm" },
      { label: "Costuras", value: "Planas (Flatlock) anti-roce" },
      { label: "Protección Solar", value: "UPF 50+ certificado" },
      { label: "Detalles", value: "Orificios para los pulgares en puños" }
    ],
    featured: false,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    name: "Lumen Hydration Vest",
    description: "Chaleco de hidratación ergonómico y ultra transpirable para Trail Running.",
    longDescription: "Diseñado en colaboración con corredores de montaña de élite. El chaleco Lumen cuenta con una capacidad de carga de 8 litros distribuida en 9 bolsillos de acceso rápido. Incluye dos botellas flexibles (soft flasks) de 500 ml cada una y un compartimento trasero compatible con bolsa de agua de hasta 2 litros.",
    price: 99.99,
    category: "Accesorios",
    gradient: "from-lime-400 to-emerald-600",
    rating: 4.8,
    reviewsCount: 42,
    specs: [
      { label: "Capacidad", value: "8 Litros de almacenamiento" },
      { label: "Hidratación", value: "Incluye 2x Soft Flasks de 500ml" },
      { label: "Material", value: "Malla elástica transpirable 3D Airmesh" },
      { label: "Ajuste", value: "Doble correa de esternón de tensión rápida" }
    ],
    featured: false,
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6",
    name: "Apex Grip Socks",
    description: "Calcetines deportivos antideslizantes de compresión media para máxima agilidad.",
    longDescription: "Evita resbalones dentro del calzado y previene ampollas. Los calcetines Apex Grip incorporan almohadillas de silicona ergonómicas en la planta del pie que aumentan la tracción. Con soporte de arco de compresión media y costuras invisibles en la puntera para un confort insuperable.",
    price: 19.99,
    category: "Accesorios",
    gradient: "from-pink-500 to-rose-600",
    rating: 4.5,
    reviewsCount: 112,
    specs: [
      { label: "Antideslizante", value: "Plancha de agarre de silicona médica" },
      { label: "Composición", value: "75% Algodón peinado, 20% Nylon, 5% Spandex" },
      { label: "Acolchado", value: "Puntera y talón reforzados" },
      { label: "Diseño", value: "Estructura anatómica izquierda/derecha" }
    ],
    featured: false,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
  }
];

import { ref } from 'vue';

const categoriesState = ref<string[]>(['Chaquetas', 'Calzado', 'Pantalones', 'Poleras', 'Accesorios']);
const productsState = ref<Product[]>(mockProducts);

export function useProducts() {
  const getProducts = (): Product[] => productsState.value;
  
  const getProductById = (id: string): Product | undefined => {
    return productsState.value.find(p => p.id === id);
  };
  
  const getCategories = (): string[] => {
    return categoriesState.value;
  };

  const loadProducts = async () => {
    try {
      const res = await $fetch<{ data: any[] }>('http://127.0.0.1:8000/api/products');
      if (res && Array.isArray(res.data)) {
        productsState.value = res.data.map(p => ({
          id: String(p.id),
          name: p.name,
          description: p.description,
          longDescription: p.longDescription,
          price: Number(p.price),
          category: p.category,
          gradient: p.gradient,
          rating: Number(p.rating),
          reviewsCount: Number(p.reviewsCount),
          specs: p.specs,
          featured: Boolean(p.featured),
          stock: Number(p.stock),
          imageUrl: p.imageUrl || ''
        }));
        
        // Dynamically extract categories list from the products
        categoriesState.value = Array.from(new Set(productsState.value.map(p => p.category)));
      }
    } catch (err) {
      console.warn('Could not load products from backend API, using local fallbacks.', err);
    }
  };

  const fetchProductById = async (id: string): Promise<Product | undefined> => {
    try {
      const res = await $fetch<{ data: any }>(`http://127.0.0.1:8000/api/products/${id}`);
      if (res && res.data) {
        const p = res.data;
        return {
          id: String(p.id),
          name: p.name,
          description: p.description,
          longDescription: p.longDescription,
          price: Number(p.price),
          category: p.category,
          gradient: p.gradient,
          rating: Number(p.rating),
          reviewsCount: Number(p.reviewsCount),
          specs: p.specs,
          featured: Boolean(p.featured),
          stock: Number(p.stock),
          imageUrl: p.imageUrl || ''
        };
      }
    } catch (err) {
      console.warn(`Could not load product ${id} from backend API, using local fallbacks.`, err);
    }
    // Fallback:
    return mockProducts.find(p => p.id === id);
  };

  const getFeaturedProducts = (): Product[] => {
    return productsState.value.filter(p => p.featured);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return productsState.value.filter(p => p.category === category);
  };

  return {
    getProducts,
    getProductById,
    getCategories,
    loadProducts,
    fetchProductById,
    getFeaturedProducts,
    getProductsByCategory
  };
}
