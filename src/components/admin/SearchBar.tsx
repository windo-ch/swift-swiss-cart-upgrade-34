
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileDown, Plus, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport?: () => void;
  onToggleRestricted?: () => void;
  showRestricted?: boolean;
  showFilters?: boolean;
  title?: string;
}

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onExport,
  onToggleRestricted,
  showRestricted = false,
  showFilters = true,
  title = "Produkte verwalten"
}: SearchBarProps) => {
  const navigate = useNavigate();
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button 
          variant="default" 
          size="sm"
          className="bg-brings-primary hover:bg-brings-primary/90"
          onClick={() => navigate('/admin')}
        >
          <Plus size={16} className="mr-1" />
          Neues Produkt
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
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
        
        <div className="flex gap-2 shrink-0">
          {showFilters && onToggleRestricted && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onToggleRestricted}
              className={showRestricted ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
              title={showRestricted ? "18+ Produkte ausblenden" : "18+ Produkte anzeigen"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </Button>
          )}
          
          {onExport && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onExport}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
