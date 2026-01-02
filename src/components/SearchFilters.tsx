import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  typeFilter?: string;
  onTypeFilterChange?: (filter: string) => void;
  showTypeFilter?: boolean;
  placeholder?: string;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  typeFilter,
  onTypeFilterChange,
  showTypeFilter = false,
  placeholder = 'Caută medicament...',
}: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = priceFilter !== 'all' || (typeFilter && typeFilter !== 'all');

  const clearFilters = () => {
    onSearchChange('');
    onPriceFilterChange('all');
    if (onTypeFilterChange) {
      onTypeFilterChange('all');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant={hasActiveFilters ? 'default' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filtre
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-lg animate-fade-in">
          <Select value={priceFilter} onValueChange={onPriceFilterChange}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Sortare preț" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate prețurile</SelectItem>
              <SelectItem value="low-high">Preț crescător</SelectItem>
              <SelectItem value="high-low">Preț descrescător</SelectItem>
              <SelectItem value="promo">Doar promoții</SelectItem>
            </SelectContent>
          </Select>

          {showTypeFilter && onTypeFilterChange && (
            <Select value={typeFilter || 'all'} onValueChange={onTypeFilterChange}>
              <SelectTrigger className="w-[180px] bg-card">
                <SelectValue placeholder="Tip produs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate tipurile</SelectItem>
                <SelectItem value="OTC">OTC (Fără rețetă)</SelectItem>
                <SelectItem value="RX">RX (Cu rețetă)</SelectItem>
              </SelectContent>
            </Select>
          )}

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Șterge filtrele
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
