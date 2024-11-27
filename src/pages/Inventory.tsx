import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import InventoryTable from "@/components/ui/dashboard/InventoryTable";
import SupplierForm from "@/components/ui/supplier/SupplierForm";
import { Plus } from "lucide-react";
import { Supplier } from "@/types/supplier";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Inventory = () => {
  const { toast } = useToast();
  const [showSupplierForm, setShowSupplierForm] = useState(false);

  const handleAddSupplier = async (data: Partial<Supplier>) => {
    try {
      // Aqui você faria a chamada API para salvar o fornecedor
      console.log("Supplier data:", data);
      
      toast({
        title: "Fornecedor cadastrado com sucesso",
        description: "O cadastro será analisado pela administração.",
      });
      
      setShowSupplierForm(false);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar fornecedor",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Gestão de Estoque e Fornecedores</h1>
            <div className="flex gap-4">
              <Button onClick={() => setShowSupplierForm(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Novo Fornecedor
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estoque Atual</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <InventoryTable />
            </CardContent>
          </Card>

          <Dialog open={showSupplierForm} onOpenChange={setShowSupplierForm}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Cadastro de Fornecedor</DialogTitle>
              </DialogHeader>
              <SupplierForm onSubmit={handleAddSupplier} />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Inventory;