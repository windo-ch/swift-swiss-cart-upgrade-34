
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Save } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
}

const SearchBar = ({ searchTerm, onSearchChange, onExport }: SearchBarProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Alli Produkt</h2>
      <div className="flex gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Produkt sueche..."
            className="pl-10 w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={onExport}
          className="flex items-center"
        >
          <Save size={16} className="mr-2" />
          Produkt exportiere
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
