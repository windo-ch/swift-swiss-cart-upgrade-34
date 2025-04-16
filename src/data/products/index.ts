
import { Product } from '../../types/product';
import { drinks } from './drinks';
import { energyDrinks } from './energy-drinks';
import { snacks } from './snacks';
import { nonFood } from './non-food';
import { tobacco } from './tobacco';
import { alcohol } from './alcohol';
import { spirits } from './spirits';

export const products: Product[] = [
  ...drinks,
  ...energyDrinks,
  ...snacks,
  ...nonFood,
  ...tobacco,
  ...alcohol,
  ...spirits
];

export * from './drinks';
export * from './energy-drinks';
export * from './snacks';
export * from './non-food';
export * from './tobacco';
export * from './alcohol';
export * from './spirits';
