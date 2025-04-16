
import { Product } from '../../../types/product';
import { hygiene } from './hygiene';
import { disposables } from './disposables';

export const nonFood: Product[] = [
  ...hygiene,
  ...disposables
];

export * from './hygiene';
export * from './disposables';
