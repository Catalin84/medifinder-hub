import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface LocationBannerProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

export function LocationBanner({ currentLocation, onLocationChange }: LocationBannerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const detectLocation = () => {
    setIsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd reverse geocode these coordinates
          onLocationChange('București (detectat automat)');
          setIsLoading(false);
        },
        () => {
          onLocationChange('București');
          setIsLoading(false);
        }
      );
    } else {
      onLocationChange('București');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Locația ta curentă</p>
            <p className="font-semibold text-foreground">{currentLocation}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={detectLocation}
          disabled={isLoading}
          className="flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 mr-2" />
          )}
          Detectează locația
        </Button>
      </div>
    </div>
  );
}
