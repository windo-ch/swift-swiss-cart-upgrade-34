import { supabase } from '@/integrations/supabase/client';
import { initializeSupabaseProducts } from './supabase-seed';

const PRODUCTS_TABLE = 'products';

/**
 * Diagnose Supabase connection and products
 */
export const diagnoseSuapbaseConnection = async (): Promise<string> => {
  let report = '';
  
  try {
    // Test basic connection using a simple query
    const { count, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      if (error.message.includes('does not exist')) {
        report += `❌ Products table does not exist: ${error.message}\n`;
      } else {
        report += `❌ Supabase connection error: ${error.message}\n`;
      }
    } else {
      report += '✅ Supabase connection successful\n';
      report += `✅ Found ${count} products in Supabase\n`;
    }
    
    // Check products count with a simpler approach
    try {
      // If products exist, get a sample of products for debugging
      if (count && count > 0) {
        const { data: sampleProducts, error: sampleError } = await supabase
          .from(PRODUCTS_TABLE)
          .select('*')
          .limit(3);
          
        if (sampleError) {
          report += `❌ Error fetching sample products: ${sampleError.message}\n`;
        } else if (sampleProducts && sampleProducts.length > 0) {
          report += '📋 Sample product structure:\n';
          report += '```\n';
          report += JSON.stringify(sampleProducts[0], null, 2) + '\n';
          report += '```\n';
          
          // Check for critical fields
          const sampleProduct = sampleProducts[0];
          const criticalFields = [
            { name: 'id', value: sampleProduct.id },
            { name: 'name', value: sampleProduct.name },
            { name: 'price', value: sampleProduct.price },
            { name: 'category', value: sampleProduct.category },
            { name: 'agerestricted', value: sampleProduct.agerestricted },
            { name: 'stock', value: sampleProduct.stock }
          ];
          
          report += '🔍 Critical fields check:\n';
          criticalFields.forEach(field => {
            report += `  ${field.name}: ${field.value !== undefined && field.value !== null ? '✅' : '❌'} (${field.value})\n`;
          });
        }
      }
      
      if (count === 0) {
        // Try to initialize products
        report += '🔄 Attempting to initialize products...\n';
        const success = await initializeSupabaseProducts();
        
        if (success) {
          report += '✅ Products initialized successfully\n';
          
          // Check products count again
          const { count: newCount, error: newCountError } = await supabase
            .from(PRODUCTS_TABLE)
            .select('*', { count: 'exact', head: true });
          
          if (newCountError) {
            report += `❌ Error counting products after initialization: ${newCountError.message}\n`;
          } else {
            report += `✅ Now have ${newCount} products in Supabase\n`;
          }
        } else {
          report += '❌ Failed to initialize products\n';
        }
      }
    } catch (countCheckError) {
      report += `❌ Error checking products: ${countCheckError instanceof Error ? countCheckError.message : String(countCheckError)}\n`;
    }
    
    // Check bucket existence
    try {
      const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('product-images');
      
      if (bucketError) {
        report += `❌ Product images bucket error: ${bucketError.message}\n`;
        
        // Try to create the bucket
        report += '🔄 Attempting to create product-images bucket...\n';
        const { error: createBucketError } = await supabase.storage.createBucket('product-images', {
          public: true
        });
        
        if (createBucketError) {
          report += `❌ Error creating bucket: ${createBucketError.message}\n`;
        } else {
          report += '✅ Created product-images bucket successfully\n';
        }
      } else {
        report += '✅ Product images bucket exists\n';
        
        // List files in the bucket
        const { data: fileList, error: fileListError } = await supabase.storage
          .from('product-images')
          .list();
        
        if (fileListError) {
          report += `❌ Error listing files in bucket: ${fileListError.message}\n`;
        } else {
          report += `✅ Found ${fileList.length} files in product-images bucket\n`;
          
          if (fileList.length > 0) {
            report += '📋 Files in bucket:\n';
            fileList.slice(0, 5).forEach(file => {
              const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${file.name}`;
              report += `  - ${file.name} (${file.created_at}): ${url}\n`;
            });
            
            if (fileList.length > 5) {
              report += `  ... and ${fileList.length - 5} more files\n`;
            }
          }
        }
      }
    } catch (bucketError) {
      report += `❌ Error checking storage bucket: ${bucketError instanceof Error ? bucketError.message : String(bucketError)}\n`;
    }
    
    // Check if the frontend product hook is working
    try {
      report += '\n🔍 Testing product fetch from frontend perspective:\n';
      const { data: products, error: productsError } = await supabase
        .from(PRODUCTS_TABLE)
        .select('*')
        .limit(1);
        
      if (productsError) {
        report += `❌ Error fetching products: ${productsError.message}\n`;
      } else if (!products || products.length === 0) {
        report += '❌ No products returned from frontend fetch test\n';
      } else {
        report += '✅ Successfully fetched products from frontend perspective\n';
      }
    } catch (frontendError) {
      report += `❌ Error in frontend fetch test: ${frontendError instanceof Error ? frontendError.message : String(frontendError)}\n`;
    }
    
    return report;
  } catch (error) {
    return `❌ Fatal error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

/**
 * Get a detailed diagnostic report of the Supabase setup
 */
export const getSupabaseDiagnostics = async (): Promise<string> => {
  const report = await diagnoseSuapbaseConnection();
  return report;
}; 