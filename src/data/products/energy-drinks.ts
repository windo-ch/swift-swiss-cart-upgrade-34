
import { Product } from '../../types/product';

export const energyDrinks: Product[] = [
  {
    id: 5,
    name: 'Red Bull Energy Drink',
    image: 'red-bull-energy-drink-250ml-787.jpg',
    price: 3.50,
    category: 'energy',
    description: 'Red Bull Original energy drink',
    ageRestricted: false,
    ingredients: 'Wasser, Saccharose, Glucose, Säureregulator (Natriumcitrate, Magnesiumcarbonat), Kohlensäure, Zitronensäure, Taurin (0.4%), Koffein (0.03%), Vitamine, Aromen, Farbstoffe.',
    weight: '250ml'
  },
  {
    id: 20,
    name: 'Red Bull Sugarfree',
    image: 'red-bull-sugarfree-250ml-787.jpg',
    price: 3.50,
    category: 'energy',
    description: 'Red Bull Sugarfree energy drink',
    ageRestricted: false,
    ingredients: 'Wasser, Säureregulator (Natriumcitrate, Magnesiumcarbonat), Kohlensäure, Zitronensäure, Taurin (0.4%), Süßungsmittel (Acesulfam K, Aspartam), Koffein (0.03%), Vitamine, Aromen, Farbstoffe.',
    weight: '250ml'
  },
  {
    id: 21,
    name: 'Arizona Green Tea',
    image: 'arizona-green-tea-500ml-787.jpg',
    price: 3.50,
    category: 'energy',
    description: 'Arizona Green Tea with honey and ginseng',
    ageRestricted: false,
    ingredients: 'Wasser, Zucker, Honig, Grüner Tee, Ginseng, Zitronensäure, natürliche Aromen.',
    weight: '500ml',
    isNew: true
  }
];
