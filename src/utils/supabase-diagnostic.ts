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
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('count(*)')
      .limit(1)
      .single();
    
    if (error) {
      if (error.message.includes('does not exist')) {
        report += `❌ Products table does not exist: ${error.message}\n`;
      } else {
        report += `❌ Supabase connection error: ${error.message}\n`;
      }
    } else {
      report += '✅ Supabase connection successful\n';
    }
    
    // Check products count with a simpler approach
    try {
      const { count, error: countError } = await supabase
        .from(PRODUCTS_TABLE)
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        report += `❌ Error counting products: ${countError.message}\n`;
      } else {
        report += `✅ Found ${count} products in Supabase\n`;
        
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
        }
      }
    } catch (bucketError) {
      report += `❌ Error checking storage bucket: ${bucketError instanceof Error ? bucketError.message : String(bucketError)}\n`;
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