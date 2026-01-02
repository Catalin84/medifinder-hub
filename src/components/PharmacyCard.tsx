import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pharmacy } from '@/types/pharmacy';
import { Link } from 'react-router-dom';

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  index: number;
}

export function PharmacyCard({ pharmacy, index }: PharmacyCardProps) {
  return (
    <Card
      className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 ring-2 ring-border group-hover:ring-primary/30 transition-all">
            <img
              src={pharmacy.logo}
              alt={pharmacy.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {pharmacy.name}
              </h3>
              {pharmacy.distance !== undefined && (
                <span className="text-xs font-medium text-primary bg-secondary px-2 py-1 rounded-full flex-shrink-0">
                  {pharmacy.distance} km
                </span>
              )}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                <span className="truncate">{pharmacy.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>{pharmacy.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                <span className="truncate">{pharmacy.schedule}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-border/50">
          <Link to={`/pharmacy/${pharmacy.id}`}>
            <Button className="w-full group/btn">
              Vezi Detalii
              <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
