
import { Product } from '../../../types/product';
import { chips } from './chips';
import { sweets } from './sweets';
import { otherSnacks } from './other-snacks';

export const snacks: Product[] = [
  ...chips,
  ...sweets,
  ...otherSnacks
];

export * from './chips';
export * from './sweets';
export * from './other-snacks';
