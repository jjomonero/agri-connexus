import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { SupplierProduct } from "@/types/supplier";

interface ProductListProps {
  products: SupplierProduct[];
  onChange: (products: SupplierProduct[]) => void;
}

const ProductList = ({ products, onChange }: ProductListProps) => {
  const [newProduct, setNewProduct] = useState<Partial<SupplierProduct>>({});

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.stock && newProduct.price && newProduct.unit) {
      onChange([
        ...products,
        {
          id: Date.now().toString(),
          ...newProduct as SupplierProduct,
        },
      ]);
      setNewProduct({});
    }
  };

  const handleRemoveProduct = (id: string) => {
    onChange(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Produtos</h3>
      
      <div className="grid grid-cols-5 gap-4">
        <Input
          placeholder="Nome do Produto"
          value={newProduct.name || ""}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Estoque"
          value={newProduct.stock || ""}
          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Capacidade"
          value={newProduct.productionCapacity || ""}
          onChange={(e) => setNewProduct({ ...newProduct, productionCapacity: Number(e.target.value) })}
        />
        <Select
          value={newProduct.unit}
          onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Unidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kg">Quilogramas (kg)</SelectItem>
            <SelectItem value="unit">Unidades</SelectItem>
            <SelectItem value="box">Caixas</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="grid grid-cols-4 gap-4 flex-1">
              <span>{product.name}</span>
              <span>Estoque: {product.stock} {product.unit}</span>
              <span>Capacidade: {product.productionCapacity} {product.unit}</span>
              <span>R$ {product.price?.toFixed(2)}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveProduct(product.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;