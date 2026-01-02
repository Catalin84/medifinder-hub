export interface Pharmacy {
  id: string;
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  schedule: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface Product {
  id: string;
  pharmacyId: string;
  name: string;
  type: 'OTC' | 'RX';
  oldPrice: number | null;
  newPrice: number;
  stock: number;
  prospectLink: string;
  images: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'pharmacy' | 'admin';
  pharmacyId?: string;
}
