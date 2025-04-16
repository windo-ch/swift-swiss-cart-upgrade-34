
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, { message: 'Name muess mindestens 3 Zeiche ha' }),
  price: z.coerce.number().min(0.1, { message: 'Priis muess grösser als 0 si' }),
  category: z.string({ required_error: 'Bitte wähl e Kategorie us' }),
  description: z.string().min(10, { message: 'Beschribig muess mindestens 10 Zeiche ha' }),
  image: z.string().min(1, { message: 'Bitte lad es Bild ufe' }),
  weight: z.string().min(1, { message: 'Bitte gib s Gwicht/Inhalt a' }),
  ingredients: z.string().optional(),
  stock: z.coerce.number().nonnegative({ message: 'Lagerbestand muess e Zahl grösser als 0 si' }).default(0),
  ageRestricted: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productSchema>;
