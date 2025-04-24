import { supabase } from '@/integrations/supabase/client';

/**
 * Check if the 'product-images' bucket exists, and create it if it doesn't
 */
export const initializeImageStorage = async (): Promise<{
  success: boolean;
  message: string;
  bucketExists: boolean;
  isPublic: boolean;
}> => {
  try {
    // Check if the bucket exists
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('product-images');
    
    if (bucketError) {
      // Create the bucket if it doesn't exist
      if (bucketError.message.includes('not found')) {
        const { data: newBucket, error: createError } = await supabase.storage.createBucket('product-images', {
          public: true
        });
        
        if (createError) {
          return {
            success: false,
            message: `Failed to create product-images bucket: ${createError.message}`,
            bucketExists: false,
            isPublic: false
          };
        }
        
        return {
          success: true,
          message: 'Successfully created product-images bucket',
          bucketExists: true,
          isPublic: true
        };
      }
      
      return {
        success: false,
        message: `Error checking product-images bucket: ${bucketError.message}`,
        bucketExists: false,
        isPublic: false
      };
    }
    
    // Check if the bucket is public
    const isPublic = bucketData.public || false;
    
    // If the bucket exists but is not public, update it
    if (!isPublic) {
      const { error: updateError } = await supabase.storage.updateBucket('product-images', {
        public: true
      });
      
      if (updateError) {
        return {
          success: false,
          message: `Failed to update product-images bucket to public: ${updateError.message}`,
          bucketExists: true,
          isPublic: false
        };
      }
      
      return {
        success: true,
        message: 'Successfully updated product-images bucket to public',
        bucketExists: true,
        isPublic: true
      };
    }
    
    return {
      success: true,
      message: 'Product-images bucket exists and is public',
      bucketExists: true,
      isPublic: true
    };
  } catch (error) {
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
      bucketExists: false,
      isPublic: false
    };
  }
};

/**
 * Upload a placeholder image to the product-images bucket if it doesn't exist
 */
export const uploadPlaceholderImage = async (): Promise<{
  success: boolean;
  message: string;
  url?: string;
}> => {
  try {
    // Initialize the storage bucket first
    const bucketInit = await initializeImageStorage();
    
    if (!bucketInit.success) {
      return {
        success: false,
        message: bucketInit.message
      };
    }
    
    // Check if the placeholder image already exists
    const { data: fileList, error: listError } = await supabase.storage
      .from('product-images')
      .list();
    
    if (listError) {
      return {
        success: false,
        message: `Error listing files in product-images bucket: ${listError.message}`
      };
    }
    
    const placeholderExists = fileList.some(file => file.name === 'gobrings-product-placeholder.png');
    
    // If placeholder already exists, return its URL
    if (placeholderExists) {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/gobrings-product-placeholder.png`;
      return {
        success: true,
        message: 'Placeholder image already exists',
        url
      };
    }
    
    // Placeholder doesn't exist, create a simple placeholder image
    // For this example, we'll create a 1x1 transparent PNG (smallest possible image)
    // In a real scenario, you would upload an actual placeholder image file
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const imageBuffer = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));
    
    // Upload the placeholder image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload('gobrings-product-placeholder.png', imageBuffer, {
        contentType: 'image/png',
        upsert: true
      });
    
    if (uploadError) {
      return {
        success: false,
        message: `Error uploading placeholder image: ${uploadError.message}`
      };
    }
    
    const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/gobrings-product-placeholder.png`;
    return {
      success: true,
      message: 'Successfully uploaded placeholder image',
      url
    };
  } catch (error) {
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}; 