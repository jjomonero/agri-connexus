import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileContract, 
  ShoppingCart,
  Bell,
  Wallet,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Buyers & Suppliers", path: "/users" },
    { icon: FileContract, label: "Contracts", path: "/contracts" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Wallet, label: "Finance", path: "/finance" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg"></div>
        <h1 className="text-xl font-bold text-primary">AgriConnect</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-2 py-3 text-gray-700 hover:bg-primary-light rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;