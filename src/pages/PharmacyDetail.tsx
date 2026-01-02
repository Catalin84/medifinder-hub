import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { SearchFilters } from '@/components/SearchFilters';
import { mockPharmacies, mockProducts } from '@/data/mockData';
import { 
  MapPin, Phone, Mail, Clock, ArrowLeft, 
  ExternalLink, Package, Percent 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PharmacyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const pharmacy = mockPharmacies.find(p => p.id === id);
  const pharmacyProducts = mockProducts.filter(p => p.pharmacyId === id);

  const filteredProducts = useMemo(() => {
    let results = [...pharmacyProducts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(query));
    }

    if (typeFilter !== 'all') {
      results = results.filter(p => p.type === typeFilter);
    }

    if (priceFilter !== 'all') {
      if (priceFilter === 'promo') {
        results = results.filter(p => p.oldPrice !== null && p.oldPrice > p.newPrice);
      } else if (priceFilter === 'low-high') {
        results.sort((a, b) => a.newPrice - b.newPrice);
      } else if (priceFilter === 'high-low') {
        results.sort((a, b) => b.newPrice - a.newPrice);
      }
    }

    return results;
  }, [pharmacyProducts, searchQuery, priceFilter, typeFilter]);

  if (!pharmacy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Farmacia nu a fost găsită
          </h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la farmacii
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const promoCount = pharmacyProducts.filter(p => p.oldPrice !== null).length;
  const otcCount = pharmacyProducts.filter(p => p.type === 'OTC').length;
  const rxCount = pharmacyProducts.filter(p => p.type === 'RX').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Înapoi la farmacii
        </Link>

        {/* Pharmacy Header */}
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-card ring-4 ring-card shadow-lg flex-shrink-0">
                <img
                  src={pharmacy.logo}
                  alt={pharmacy.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {pharmacy.name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`tel:${pharmacy.phone}`} className="text-sm hover:text-primary transition-colors">
                      {pharmacy.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`mailto:${pharmacy.email}`} className="text-sm hover:text-primary transition-colors">
                      {pharmacy.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{pharmacy.schedule}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
            <div className="p-4 text-center">
              <p className="text-xl font-bold text-foreground">{pharmacyProducts.length}</p>
              <p className="text-xs text-muted-foreground">Produse</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-bold text-otc-badge">{otcCount}</p>
              <p className="text-xs text-muted-foreground">OTC</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-bold text-rx-badge">{rxCount}</p>
              <p className="text-xs text-muted-foreground">RX</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-bold text-accent">{promoCount}</p>
              <p className="text-xs text-muted-foreground">Promoții</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Produse disponibile
            </h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <Package className="w-3 h-3 mr-1" />
                {filteredProducts.length} produse
              </Badge>
            </div>
          </div>

          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            showTypeFilter
            placeholder="Caută produs..."
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nu am găsit produse
            </h3>
            <p className="text-muted-foreground">
              Încearcă să modifici criteriile de căutare
            </p>
          </div>
        )}

        {/* API Info */}
        <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            API Public
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Accesează lista produselor acestei farmacii în format JSON:
          </p>
          <code className="block p-3 bg-card rounded-lg text-sm text-primary border border-border overflow-x-auto">
            GET /api/farmacie/{pharmacy.id}/produse
          </code>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 FarmaciiLocal. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default PharmacyDetail;
