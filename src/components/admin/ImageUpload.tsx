import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  existingImageUrl?: string;
}

const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

const ImageUpload = ({ onImageUploaded, existingImageUrl }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { toast } = useToast();
  
  useEffect(() => {
    if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
      setHasImageError(false);
    } else {
      setPreviewUrl('');
    }
  }, [existingImageUrl]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setHasImageError(false);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      
      console.log("Uploading file to Supabase Storage:", fileName);
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      console.log("Upload successful, data:", data);

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      console.log("Generated public URL:", publicUrl);
      
      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);
      
      toast({
        title: "Bild erfolgrich ueglade",
        description: "S'Bild isch erfolgrich gspeicheret worde.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setHasImageError(true);
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
      {previewUrl && (
        <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={hasImageError ? PLACEHOLDER_IMAGE : previewUrl} 
            alt="Product preview"
            className="w-full h-full object-cover"
            onError={() => {
              console.error(`Error loading image preview: ${previewUrl}`);
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
