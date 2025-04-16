
import { Product } from '../../../types/product';
import { whiskey } from './whiskey';
import { vodka } from './vodka';
import { liqueur } from './liqueur';

export const spirits: Product[] = [
  ...whiskey,
  ...vodka,
  ...liqueur
];

export * from './whiskey';
export * from './vodka';
export * from './liqueur';
