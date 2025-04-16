
import { Product } from '../../../types/product';
import { beer } from './beer';
import { wine } from './wine';

export const alcohol: Product[] = [
  ...beer,
  ...wine
];

export * from './beer';
export * from './wine';
