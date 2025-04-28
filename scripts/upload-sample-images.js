// Script to upload sample product images to Supabase storage
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

dotenv.config();

// Constants
const BUCKET_NAME = 'product-images';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env file');
  process.exit(1);
}

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Sample product images to upload
const productImages = [
  {
    name: 'gobrings-ch-Coca-Cola-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/coke-600.png',
  },
  {
    name: 'gobrings-ch-Coca-Cola-Zero-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/coke-zero-600.png',
  },
  {
    name: 'gobrings-ch-Fanta-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/fanta-600.png',
  },
  {
    name: 'gobrings-ch-RedBull-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/redbull-600.png',
  },
  {
    name: 'gobrings-ch-Sprite-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/sprite-600.png',
  },
  {
    name: 'gobrings-ch-San-Pellegrino-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/san-pellegrino-600.png',
  },
  {
    name: 'gobrings-ch-Heineken-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/heineken-600.png',
  },
  {
    name: 'gobrings-ch-Corona-6pack-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/corona-600.png',
  },
  {
    name: 'gobrings-ch-Feldschlosschen-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/feldschlosschen-600.png',
  },
  {
    name: 'gobrings-ch-Ballantines-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/ballentines-600.png',
  },
  {
    name: 'gobrings-ch-Jack-Daniels-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/jack-daniels-600.png',
  },
  {
    name: 'gobrings-ch-Absolut-Vodka-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/absolut-600.png',
  },
  {
    name: 'gobrings-ch-Bombay-Sapphire-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/bombay-600.png',
  },
  {
    name: 'gobrings-ch-Zweifel-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/zweifel-600.png',
  },
  {
    name: 'gobrings-ch-Pringles-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/pringles-600.png',
  },
  {
    name: 'gobrings-ch-Haribo-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/haribo-600.png',
  },
  {
    name: 'gobrings-ch-Toblerone-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/toblerone-600.png',
  },
  {
    name: 'gobrings-ch-Lindt-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/lindt-600.png',
  },
  {
    name: 'gobrings-ch-Oreo-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/oreos-600.png',
  },
  {
    name: 'gobrings-ch-Marlboro-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/marlboro-600.png',
  },
  {
    name: 'gobrings-ch-Camel-300x300.png',
    url: 'https://brings-delivery.ch/cdn/shop/files/camel-600.png',
  },
];

// Make sure the bucket exists
const createBucketIfNotExists = async () => {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`Creating bucket: ${BUCKET_NAME}`);
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
      });
      
      if (error) {
        console.error('Error creating bucket:', error);
        return false;
      }
      
      console.log(`✅ Bucket ${BUCKET_NAME} created successfully`);
    } else {
      console.log(`✅ Bucket ${BUCKET_NAME} already exists`);
    }
    
    return true;
  } catch (error) {
    console.error('Error checking/creating bucket:', error);
    return false;
  }
};

// Upload a single image
const uploadImage = async (image) => {
  try {
    console.log(`Downloading ${image.url}...`);
    const response = await fetch(image.url);
    
    if (!response.ok) {
      console.error(`Error downloading ${image.url}: ${response.statusText}`);
      return false;
    }
    
    const imageBuffer = await response.arrayBuffer();
    
    console.log(`Uploading ${image.name}...`);
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(image.name, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      });
    
    if (error) {
      console.error(`Error uploading ${image.name}:`, error);
      return false;
    }
    
    console.log(`✅ Successfully uploaded ${image.name}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${image.name}:`, error);
    return false;
  }
};

// Main function to upload all images
const uploadAllImages = async () => {
  console.log('Starting image upload process...');
  
  // Ensure bucket exists
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    console.error('Failed to ensure bucket exists. Aborting.');
    return false;
  }
  
  // Upload images
  let successCount = 0;
  let failCount = 0;
  
  for (const image of productImages) {
    const success = await uploadImage(image);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\nUpload complete: ${successCount} successful, ${failCount} failed`);
  console.log(`Storage URL prefix: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`);
  
  return successCount > 0;
};

// Execute the upload
uploadAllImages()
  .then(success => {
    if (success) {
      console.log('✅ Image upload process completed successfully!');
    } else {
      console.error('❌ Image upload process failed!');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error during upload:', error);
    process.exit(1);
  }); 