
import { Product } from '../../../types/product';

export const wine: Product[] = [
  {
    id: 62,
    name: 'Bluesecco Blu Rosé Rubicone IGT',
    image: 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-bluesecco-rose-187ml-300x300.png',
    price: 4.20,
    category: 'alcohol',
    description: 'Bluesecco Blu Rosé sparkling wine from the Rubicone region, Italy',
    ageRestricted: true,
    ingredients: 'Trauben, Sulfite.',
    weight: '187ml'
  },
  {
    id: 63,
    name: 'Bluesecco Blu Trevenezie IGT',
    image: 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-ch-bluesecco-white-187ml-300x300.png',
    price: 4.20,
    category: 'alcohol',
    description: 'Bluesecco Blu sparkling wine from the Trevenezie region, Italy',
    ageRestricted: true,
    ingredients: 'Trauben, Sulfite.',
    weight: '187ml'
  }
];
