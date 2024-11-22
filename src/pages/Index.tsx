import { Users, FileContract, ShoppingCart, TrendingUp } from "lucide-react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import StatCard from "@/components/ui/dashboard/StatCard";
import RecentActivity from "@/components/ui/dashboard/RecentActivity";

const Index = () => {
  const stats = [
    {
      title: "Total Buyers",
      value: "156",
      icon: <Users className="w-6 h-6 text-primary" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Active Contracts",
      value: "43",
      icon: <FileContract className="w-6 h-6 text-primary" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Pending Orders",
      value: "28",
      icon: <ShoppingCart className="w-6 h-6 text-primary" />,
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      trend: { value: 15, isPositive: true },
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            {/* Additional dashboard widgets can be added here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;