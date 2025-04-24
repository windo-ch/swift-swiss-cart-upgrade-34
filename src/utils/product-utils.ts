import { Product } from '../types/product';
import { products as storeProducts } from '../data/products/index';
import { seedProductsData } from './seed-products';

const SUPABASE_URL = "https://zbvdlkfnpufqfhrptfhz.supabase.co";
const DEFAULT_BUCKET = 'product-images';
const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

export const getProductImageUrl = (imageName: string): string => {
  if (!imageName) {
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's already a full URL with the correct Supabase domain, return it as is
  if (imageName.includes(SUPABASE_URL)) {
    return imageName;
  }
  
  // If it's a full URL but not from Supabase, return the placeholder
  if (imageName.startsWith('http')) {
    console.log(`Non-Supabase URL detected: ${imageName}, using placeholder`);
    return PLACEHOLDER_IMAGE;
  }
  
  // Remove any leading slashes to avoid double slashes in URL
  const cleanImageName = imageName.replace(/^\/+/, '');
  
  // Construct Supabase storage URL with proper format
  return `${SUPABASE_URL}/storage/v1/object/public/${DEFAULT_BUCKET}/${cleanImageName}`;
};

export const getStoredProducts = (): Product[] => {
  console.log("🔍 Getting stored products...");
  try {
    // First try to get products from localStorage that might have been modified in admin panel
    const storedProducts = localStorage.getItem('adminProducts');
    
    if (!storedProducts) {
      console.log("⚠️ No admin products found in localStorage");
      throw new Error("No admin products found");
    }
    
    let adminProducts: Product[];
    try {
      adminProducts = JSON.parse(storedProducts);
      
      // Validate that we have an array with products
      if (!Array.isArray(adminProducts) || adminProducts.length === 0) {
        console.log("⚠️ Invalid admin products format in localStorage");
        throw new Error("Invalid admin products format");
      }
      
      // Validate that at least the first product has required fields
      const firstProduct = adminProducts[0];
      if (!firstProduct.id || !firstProduct.name || firstProduct.price === undefined) {
        console.log("⚠️ Admin products missing required fields");
        throw new Error("Admin products missing required fields");
      }
      
      console.log(`🛒 Found ${adminProducts.length} valid admin products in localStorage`);
      
      // Ensure all products have required fields and proper formatting
      return adminProducts.map((product: Product) => ({
        ...product,
        id: String(product.id), // Ensure id is always a string
        name: product.name || 'Unnamed Product',
        price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price) || '0'),
        category: product.category || 'other',
        image: product.image || PLACEHOLDER_IMAGE,
        description: product.description || '',
        weight: product.weight || '',
        ingredients: product.ingredients || '',
        ageRestricted: product.ageRestricted || false,
        stock: product.stock !== undefined ? product.stock : 50
      }));
    } catch (parseError) {
      console.error("❌ Error parsing admin products:", parseError);
      throw parseError;
    }
  } catch (error) {
    console.error('❌ Error loading products from localStorage:', error);
    
    // If there's an error, seed new products
    console.log("🔄 Seeding new products due to error");
    seedProductsData();
    
    // Try to get the newly seeded products
    try {
      const newStoredProducts = localStorage.getItem('adminProducts');
      if (newStoredProducts) {
        const newProducts = JSON.parse(newStoredProducts);
        if (Array.isArray(newProducts) && newProducts.length > 0) {
          console.log(`✅ Successfully loaded ${newProducts.length} seeded products`);
          return newProducts;
        }
      }
    } catch (secondaryError) {
      console.error("❌ Error loading seeded products:", secondaryError);
    }
    
    // Ultimate fallback to default store products if all else fails
    console.log("⚠️ Using default store products as final fallback");
    const defaultProducts = storeProducts.map(product => ({
      ...product,
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      category: product.category,
      image: product.image || PLACEHOLDER_IMAGE,
      description: product.description || '',
      ageRestricted: product.ageRestricted || false,
      stock: 50
    }));
    
    // Save these default products to localStorage
    localStorage.setItem('adminProducts', JSON.stringify(defaultProducts));
    
    return defaultProducts;
  }
};
