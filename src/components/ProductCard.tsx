import { ExternalLink, FileText, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/pharmacy';

interface ProductCardProps {
  product: Product;
  index: number;
}

const RX_PLACEHOLDER = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&grayscale';

export function ProductCard({ product, index }: ProductCardProps) {
  const hasPromotion = product.oldPrice !== null && product.oldPrice > product.newPrice;
  const discount = hasPromotion
    ? Math.round(((product.oldPrice! - product.newPrice) / product.oldPrice!) * 100)
    : 0;

  const displayImages = product.type === 'RX' 
    ? [RX_PLACEHOLDER] 
    : product.images.length > 0 
      ? product.images.slice(0, 4) 
      : ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop'];

  return (
    <Card
      className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative">
        {/* Image Gallery */}
        <div className="aspect-square bg-muted overflow-hidden">
          {displayImages.length === 1 ? (
            <img
              src={displayImages[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="grid grid-cols-2 h-full gap-0.5">
              {displayImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} - ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge
            className={product.type === 'RX' ? 'rx-badge' : 'otc-badge'}
          >
            {product.type}
          </Badge>
          {hasPromotion && (
            <Badge className="promo-badge">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* RX Overlay */}
        {product.type === 'RX' && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center p-4">
            <div className="text-center">
              <FileText className="w-8 h-8 text-primary-foreground mx-auto mb-2" />
              <p className="text-primary-foreground text-sm font-medium">
                Medicament eliberat pe bază de rețetă
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Stoc: {product.stock} unități
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-primary">
            {product.newPrice.toFixed(2)} RON
          </span>
          {hasPromotion && (
            <span className="text-sm text-muted-foreground line-through">
              {product.oldPrice!.toFixed(2)} RON
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(product.prospectLink, '_blank')}
        >
          <FileText className="w-4 h-4 mr-2" />
          Prospect
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
