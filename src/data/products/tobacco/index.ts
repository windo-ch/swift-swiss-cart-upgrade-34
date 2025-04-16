
import { Product } from '../../../types/product';
import { cigarettes } from './cigarettes';
import { rollingTobacco } from './rolling-tobacco';
import { rollingPapers } from './rolling-papers';

export const tobacco: Product[] = [
  ...cigarettes,
  ...rollingTobacco,
  ...rollingPapers
];

export * from './cigarettes';
export * from './rolling-tobacco';
export * from './rolling-papers';
