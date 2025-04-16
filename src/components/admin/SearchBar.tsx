
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Filter, Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  onToggleRestricted?: () => void;
  showRestricted?: boolean;
}

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onExport,
  onToggleRestricted,
  showRestricted = false
}: SearchBarProps) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Suche nach Produkten oder Kategorien..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onToggleRestricted}
        className={showRestricted ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
        title={showRestricted ? "18+ Produkte ausblenden" : "18+ Produkte anzeigen"}
      >
        <Filter className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onExport}
        className="flex items-center gap-1"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default SearchBar;
