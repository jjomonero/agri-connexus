import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import InventoryTable from "@/components/ui/dashboard/InventoryTable";
import InventoryForm from "@/components/ui/dashboard/InventoryForm";
import { Plus } from "lucide-react";

const Inventory = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = () => {
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <Button onClick={handleAddProduct} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <InventoryForm onClose={() => setShowForm(false)} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Current Inventory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <InventoryTable />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Inventory;