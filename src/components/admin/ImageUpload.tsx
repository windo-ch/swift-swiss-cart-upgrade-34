
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getProductImageUrl } from '../../utils/product-utils';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  existingImageUrl?: string;
}

const ImageUpload = ({ onImageUploaded, existingImageUrl }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const { toast } = useToast();
  const placeholderImage = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';
  
  // Process existing image URL to show correctly in preview
  const processedExistingUrl = existingImageUrl ? getProductImageUrl(existingImageUrl) : '';

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log("Uploading file to Supabase:", fileName);
      
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      console.log("Upload successful, data:", data);

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log("Generated public URL:", publicUrl);
      
      // Store the complete Supabase URL
      onImageUploaded(publicUrl);
      
      toast({
        title: "Bild erfolgrich ueglade",
        description: "S'Bild isch erfolgrich gspeicheret worde.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Fehler bim Uelade",
        description: "S'Bild het nöd chöne glade werde. Bitte nomol probiere.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {processedExistingUrl && (
        <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={hasImageError ? placeholderImage : processedExistingUrl} 
            alt="Product preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Error loading image preview: ${processedExistingUrl}`);
              setHasImageError(true);
            }}
          />
        </div>
      )}
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="animate-spin">
                <Upload className="h-8 w-8 text-gray-500" />
              </div>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Klick zum Uelade</span> oder zieh es Bild da ane
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
