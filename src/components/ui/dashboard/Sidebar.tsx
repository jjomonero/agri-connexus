import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  FileText,
  ShoppingCart,
  Bell,
  TrendingUp,
  Settings,
  Package,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      href: "/",
      title: "Dashboard",
      icon: TrendingUp,
      roles: ["administrator", "supplier", "buyer"],
    },
    {
      href: "/users",
      title: "Users",
      icon: Users,
      roles: ["administrator"],
    },
    {
      href: "/contracts",
      title: "Contracts",
      icon: FileText,
      roles: ["administrator", "supplier", "buyer"],
    },
    {
      href: "/orders",
      title: "Orders",
      icon: ShoppingCart,
      roles: ["administrator", "supplier", "buyer"],
    },
    {
      href: "/notifications",
      title: "Notifications",
      icon: Bell,
      roles: ["administrator", "supplier", "buyer"],
    },
    {
      href: "/finance",
      title: "Finance",
      icon: TrendingUp,
      roles: ["administrator"],
    },
    {
      href: "/inventory",
      title: "Inventory",
      icon: Package,
      roles: ["administrator", "supplier"],
    },
    {
      href: "/settings",
      title: "Settings",
      icon: Settings,
      roles: ["administrator", "supplier", "buyer"],
    },
  ];

  return (
    <div className="fixed left-0 h-screen w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div className="flex flex-col h-full">
        <div className="space-y-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Supply Chain</h2>
            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
          </div>

          <nav className="space-y-2">
            {menuItems
              .filter((item) => item.roles.includes(user?.role || ""))
              .map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
          </nav>
        </div>

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={logout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;