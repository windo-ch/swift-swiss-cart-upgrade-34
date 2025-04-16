
import { Product } from '../../../types/product';
import { softDrinks } from './soft-drinks';
import { mineralWater } from './mineral-water';
import { iceTea } from './ice-tea';
import { juiceDrinks } from './juice-drinks';

// Combine all drink subcategories
export const drinks: Product[] = [
  ...softDrinks,
  ...mineralWater,
  ...iceTea,
  ...juiceDrinks,
];

// Export each subcategory for individual access
export * from './soft-drinks';
export * from './mineral-water';
export * from './ice-tea';
export * from './juice-drinks';
