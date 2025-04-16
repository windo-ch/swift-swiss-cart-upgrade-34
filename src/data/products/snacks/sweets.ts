
import { Product } from '../../../types/product';

export const sweets: Product[] = [
  {
    id: 29,
    name: 'Kinder Schokolade',
    image: 'kinder-schokolade-1-riegel-1-stueck.jpg',
    price: 0.70,
    category: 'sweets',
    description: 'Kinder Chocolate, price per piece',
    ageRestricted: false,
    ingredients: 'Zucker, Magermilchpulver, Kakaobutter, Kakaomasse, Milchpulver, Butterreinfett, Emulgator Lecithine, Vanillin.',
    weight: 'ca. 12.5g pro Riegel'
  },
  {
    id: 30,
    name: 'Kinder-Bueno',
    image: 'kinder-bueno-1-riegel-44g-250.jpg',
    price: 1.60,
    category: 'sweets',
    description: 'Kinder Bueno chocolate bar',
    ageRestricted: false,
    ingredients: 'Milchschokolade, Haselnusscreme, Waffel, Zucker, pflanzliches Fett, Haselnüsse, Vollmilchpulver, Kakaobutter, Kakaomasse, Emulgator Lecithine.',
    weight: '44g'
  },
  {
    id: 31,
    name: 'Kinder-Milchschnitte',
    image: 'kinder-milchschnitte-1-packung-28g-250.jpg',
    price: 1.20,
    category: 'sweets',
    description: 'Kinder Milk Slice',
    ageRestricted: false,
    ingredients: 'Frischmilch, pflanzliche Fette, Zucker, Weizenmehl, Magermilchpulver, Honig, Butterreinfett, Emulgator Mono- und Diglyceride von Speisefettsäuren, Aromen, Backtriebmittel Natriumhydrogencarbonat, Ammoniumcarbonat, Salz.',
    weight: '28g'
  },
  {
    id: 33,
    name: 'Oreo Original',
    image: 'oreo-original-154g-550.jpg',
    price: 4.90,
    category: 'sweets',
    description: 'Oreo Original cookies',
    ageRestricted: false,
    ingredients: 'Weizenmehl, Zucker, pflanzliches Öl, fettarmes Kakaopulver, Glukose-Fruktose-Sirup, Backtriebmittel Natriumhydrogencarbonat, Ammoniumhydrogencarbonat, Salz, Emulgator Sojalecithine, Aroma.',
    weight: '154g'
  }
];
