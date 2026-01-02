import { MapPin, Pill, Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:shadow-glow transition-shadow">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">
              Farmacii<span className="text-primary">Local</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Farmacii
            </Link>
            <Link
              to="/admin"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm">
              Autentificare
            </Button>
            <Button size="sm">Înregistrare Farmacie</Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="w-4 h-4" />
                Farmacii
              </Link>
              <Link
                to="/admin"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/admin') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Autentificare
                </Button>
                <Button size="sm" className="flex-1">
                  Înregistrare
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
