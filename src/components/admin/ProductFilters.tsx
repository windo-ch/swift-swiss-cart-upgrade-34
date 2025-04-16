
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SlidersHorizontal } from 'lucide-react';
import { categories } from '@/data/categories-data';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}: ProductFiltersProps) => {
  return (
    <Accordion type="single" collapsible className="mb-4">
      <AccordionItem value="filters">
        <AccordionTrigger className="py-2">
          <div className="flex items-center">
            <SlidersHorizontal size={16} className="mr-2" />
            Erweiterte Filter
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Kategorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle Kategorien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kategorien</SelectItem>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Sortieren nach</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sortieren nach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price">Preis (aufsteigend)</SelectItem>
                  <SelectItem value="price-desc">Preis (absteigend)</SelectItem>
                  <SelectItem value="stock">Lagerbestand (aufsteigend)</SelectItem>
                  <SelectItem value="stock-desc">Lagerbestand (absteigend)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductFilters;
