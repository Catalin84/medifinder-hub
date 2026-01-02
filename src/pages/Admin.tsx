import { useState } from 'react';
import { Header } from '@/components/Header';
import { mockPharmacies, mockProducts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Building2, Package, Plus, Pencil, Trash2, 
  RefreshCw, Search, ImagePlus, Link as LinkIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/pharmacy';

const Admin = () => {
  const { toast } = useToast();
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for product
  const [productForm, setProductForm] = useState({
    name: '',
    type: 'OTC' as 'OTC' | 'RX',
    oldPrice: '',
    newPrice: '',
    stock: '',
    prospectLink: '',
    images: ['', '', '', ''],
  });

  const pharmacyProducts = selectedPharmacy
    ? mockProducts.filter(p => p.pharmacyId === selectedPharmacy)
    : [];

  const filteredProducts = searchQuery
    ? pharmacyProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pharmacyProducts;

  const handleOpenProductDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        type: product.type,
        oldPrice: product.oldPrice?.toString() || '',
        newPrice: product.newPrice.toString(),
        stock: product.stock.toString(),
        prospectLink: product.prospectLink,
        images: [...product.images, '', '', '', ''].slice(0, 4),
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        type: 'OTC',
        oldPrice: '',
        newPrice: '',
        stock: '',
        prospectLink: '',
        images: ['', '', '', ''],
      });
    }
    setIsProductDialogOpen(true);
  };

  const handleSaveProduct = () => {
    // In a real app, this would save to the backend
    toast({
      title: editingProduct ? 'Produs actualizat' : 'Produs adăugat',
      description: `${productForm.name} a fost ${editingProduct ? 'actualizat' : 'adăugat'} cu succes.`,
    });
    setIsProductDialogOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would delete from the backend
    toast({
      title: 'Produs șters',
      description: 'Produsul a fost șters cu succes.',
      variant: 'destructive',
    });
  };

  const handleRefreshStock = () => {
    toast({
      title: 'Stoc actualizat',
      description: 'Stocul a fost actualizat cu succes.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Panou Administrare
          </h1>
          <p className="text-muted-foreground">
            Gestionează farmaciile și produsele din catalogul tău
          </p>
        </div>

        <Tabs defaultValue="pharmacies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="pharmacies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Farmacii
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produse
            </TabsTrigger>
          </TabsList>

          {/* Pharmacies Tab */}
          <TabsContent value="pharmacies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Lista Farmacii</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adaugă Farmacie
              </Button>
            </div>

            <div className="grid gap-4">
              {mockPharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      <img
                        src={pharmacy.logo}
                        alt={pharmacy.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{pharmacy.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {pharmacy.address}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">
                            {mockProducts.filter(p => p.pharmacyId === pharmacy.id).length} produse
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selectează Farmacia</CardTitle>
                <CardDescription>
                  Alege o farmacie pentru a gestiona produsele
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedPharmacy || ''}
                  onValueChange={setSelectedPharmacy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează farmacia" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPharmacies.map((pharmacy) => (
                      <SelectItem key={pharmacy.id} value={pharmacy.id}>
                        {pharmacy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {selectedPharmacy && (
              <>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Caută produs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleRefreshStock}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Actualizează Stoc
                    </Button>
                    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleOpenProductDialog()}>
                          <Plus className="w-4 h-4 mr-2" />
                          Adaugă Produs
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {editingProduct ? 'Editează Produs' : 'Adaugă Produs Nou'}
                          </DialogTitle>
                          <DialogDescription>
                            Completează informațiile despre produs
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Nume Produs</Label>
                            <Input
                              id="name"
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              placeholder="Ex: Paracetamol 500mg"
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="type">Tip Produs</Label>
                            <Select
                              value={productForm.type}
                              onValueChange={(value: 'OTC' | 'RX') => 
                                setProductForm({ ...productForm, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="OTC">OTC (Fără rețetă)</SelectItem>
                                <SelectItem value="RX">RX (Cu rețetă)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="oldPrice">Preț Vechi (RON)</Label>
                              <Input
                                id="oldPrice"
                                type="number"
                                step="0.01"
                                value={productForm.oldPrice}
                                onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                                placeholder="Opțional"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="newPrice">Preț Nou (RON) *</Label>
                              <Input
                                id="newPrice"
                                type="number"
                                step="0.01"
                                value={productForm.newPrice}
                                onChange={(e) => setProductForm({ ...productForm, newPrice: e.target.value })}
                                placeholder="Ex: 25.99"
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="stock">Stoc</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={productForm.stock}
                              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                              placeholder="Ex: 100"
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="prospectLink">Link Prospect</Label>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="prospectLink"
                                value={productForm.prospectLink}
                                onChange={(e) => setProductForm({ ...productForm, prospectLink: e.target.value })}
                                placeholder="https://..."
                                className="pl-9"
                              />
                            </div>
                          </div>

                          {productForm.type === 'OTC' && (
                            <div className="grid gap-2">
                              <Label>Poze Produs (până la 4)</Label>
                              <div className="grid grid-cols-2 gap-3">
                                {productForm.images.map((img, index) => (
                                  <div key={index} className="relative">
                                    <ImagePlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                      value={img}
                                      onChange={(e) => {
                                        const newImages = [...productForm.images];
                                        newImages[index] = e.target.value;
                                        setProductForm({ ...productForm, images: newImages });
                                      }}
                                      placeholder={`URL Poză ${index + 1}`}
                                      className="pl-9"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                            Anulează
                          </Button>
                          <Button onClick={handleSaveProduct}>
                            {editingProduct ? 'Salvează' : 'Adaugă'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produs</TableHead>
                        <TableHead>Tip</TableHead>
                        <TableHead>Preț</TableHead>
                        <TableHead>Stoc</TableHead>
                        <TableHead className="text-right">Acțiuni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge className={product.type === 'RX' ? 'rx-badge' : 'otc-badge'}>
                                {product.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary">
                                  {product.newPrice.toFixed(2)} RON
                                </span>
                                {product.oldPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    {product.oldPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.stock > 20 ? 'secondary' : 'destructive'}>
                                {product.stock}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleOpenProductDialog(product)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            {searchQuery ? 'Nu s-au găsit produse' : 'Nu există produse'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 FarmaciiLocal. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
