
import React from 'react';
import { Filter } from 'lucide-react';
import { categories } from '../../data/categories-data';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, setActiveCategory }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="w-full mb-6">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full border rounded-lg bg-white shadow-sm"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
          <div className="flex items-center">
            <Filter size={18} className="text-brings-primary mr-2" />
            <span className="font-medium">Filter nach Kategorie</span>
          </div>
          <span className="text-sm text-gray-500">
            {isOpen ? 'Verbergen' : 'Anzeigen'}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-brings-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span> {category.name}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CategoryFilter;
