import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  lastUpdated: string;
  reserved?: number;
}

const InventoryTable = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Organic Tomatoes",
      quantity: 500,
      unit: "kg",
      price: 4.99,
      lastUpdated: "2024-03-15",
      reserved: 50,
    },
    {
      id: "2",
      name: "Fresh Lettuce",
      quantity: 300,
      unit: "unit",
      price: 2.50,
      lastUpdated: "2024-03-15",
      reserved: 30,
    },
  ]);

  const handleStockUpdate = (productId: string, type: 'increase' | 'decrease') => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const newQuantity = type === 'increase' 
          ? product.quantity + 1 
          : Math.max(0, product.quantity - 1);
        
        toast({
          title: "Estoque Atualizado",
          description: `${product.name} estoque ${type === 'increase' ? 'aumentado' : 'diminuído'} para ${newQuantity} ${product.unit}`,
        });

        return {
          ...product,
          quantity: newQuantity,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return product;
    }));
  };

  const handleDelete = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: "Produto Removido",
        description: `${product.name} foi removido do inventário.`,
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Produto</TableHead>
          <TableHead>Quantidade Disponível</TableHead>
          <TableHead>Quantidade Reservada</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Preço (R$)</TableHead>
          <TableHead>Última Atualização</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.reserved || 0}</TableCell>
            <TableCell>{product.unit}</TableCell>
            <TableCell>{product.price.toFixed(2)}</TableCell>
            <TableCell>{product.lastUpdated}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStockUpdate(product.id, 'increase')}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStockUpdate(product.id, 'decrease')}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;