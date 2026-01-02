import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { PharmacyCard } from '@/components/PharmacyCard';
import { SearchFilters } from '@/components/SearchFilters';
import { LocationBanner } from '@/components/LocationBanner';
import { mockPharmacies, mockProducts } from '@/data/mockData';
import { Pill, Building2 } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [location, setLocation] = useState('București');

  const filteredPharmacies = useMemo(() => {
    let results = [...mockPharmacies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter((pharmacy) => {
        // Check pharmacy name
        if (pharmacy.name.toLowerCase().includes(query)) return true;
        
        // Check products in this pharmacy
        const pharmacyProducts = mockProducts.filter(p => p.pharmacyId === pharmacy.id);
        return pharmacyProducts.some(p => p.name.toLowerCase().includes(query));
      });
    }

    if (priceFilter !== 'all') {
      results = results.filter((pharmacy) => {
        const pharmacyProducts = mockProducts.filter(p => p.pharmacyId === pharmacy.id);
        
        if (priceFilter === 'promo') {
          return pharmacyProducts.some(p => p.oldPrice !== null && p.oldPrice > p.newPrice);
        }
        return pharmacyProducts.length > 0;
      });

      if (priceFilter === 'low-high') {
        results.sort((a, b) => {
          const aMin = Math.min(...mockProducts.filter(p => p.pharmacyId === a.id).map(p => p.newPrice));
          const bMin = Math.min(...mockProducts.filter(p => p.pharmacyId === b.id).map(p => p.newPrice));
          return aMin - bMin;
        });
      } else if (priceFilter === 'high-low') {
        results.sort((a, b) => {
          const aMax = Math.max(...mockProducts.filter(p => p.pharmacyId === a.id).map(p => p.newPrice));
          const bMax = Math.max(...mockProducts.filter(p => p.pharmacyId === b.id).map(p => p.newPrice));
          return bMax - aMax;
        });
      }
    }

    return results;
  }, [searchQuery, priceFilter]);

  const stats = {
    pharmacies: mockPharmacies.length,
    products: mockProducts.length,
    promotions: mockProducts.filter(p => p.oldPrice !== null).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Pill className="w-4 h-4" />
            Catalog Farmacii Locale
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Găsește medicamentele
            <span className="text-primary block md:inline"> aproape de tine</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Caută și compară prețurile medicamentelor la farmaciile din zona ta. 
            Promoții exclusive și informații actualizate în timp real.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 text-center border border-border shadow-card">
            <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.pharmacies}</p>
            <p className="text-sm text-muted-foreground">Farmacii</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border shadow-card">
            <Pill className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.products}</p>
            <p className="text-sm text-muted-foreground">Produse</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border shadow-card">
            <span className="text-xl mb-2 block">🎉</span>
            <p className="text-2xl font-bold text-accent">{stats.promotions}</p>
            <p className="text-sm text-muted-foreground">Promoții</p>
          </div>
        </div>

        {/* Location Banner */}
        <div className="mb-8">
          <LocationBanner currentLocation={location} onLocationChange={setLocation} />
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            placeholder="Caută farmacie sau medicament..."
          />
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Farmacii disponibile
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredPharmacies.length} rezultate
          </span>
        </div>

        {filteredPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPharmacies.map((pharmacy, index) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nu am găsit rezultate
            </h3>
            <p className="text-muted-foreground">
              Încearcă să modifici criteriile de căutare
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 FarmaciiLocal. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
