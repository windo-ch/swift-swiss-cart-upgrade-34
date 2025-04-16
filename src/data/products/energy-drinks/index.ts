
import { Product } from '../../../types/product';
import { energyDrinks } from './energy-drinks';

export const allEnergyDrinks: Product[] = [
  ...energyDrinks
];

export * from './energy-drinks';
