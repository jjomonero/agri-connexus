import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrdersTable from "@/components/ui/dashboard/OrdersTable";
import { Search, Filter } from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "ORD-001",
      buyer: "Green Market",
      supplier: "Farm Fresh Co.",
      items: "Tomatoes, Lettuce, Carrots",
      total: "R$ 2,500.00",
      status: "In Transit",
      date: "2024-02-15",
    },
    {
      id: "ORD-002",
      buyer: "Fresh Foods Ltd",
      supplier: "Organic Farms",
      items: "Potatoes, Onions",
      total: "R$ 1,800.00",
      status: "Delivered",
      date: "2024-02-14",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Orders</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search and Filter Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" /> Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <OrdersTable orders={orders} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Orders;