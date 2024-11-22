import { NavLink } from "react-router-dom";
import {
  Users,
  FileText,
  ShoppingCart,
  Bell,
  DollarSign,
  Settings,
  Package,
  LayoutDashboard,
} from "lucide-react";

const Sidebar = () => {
  const links = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/users", icon: Users, label: "Users" },
    { to: "/contracts", icon: FileText, label: "Contracts" },
    { to: "/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/inventory", icon: Package, label: "Inventory" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/finance", icon: DollarSign, label: "Finance" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="flex items-center mb-8">
        <h1 className="text-xl font-bold">AgriConnexus</h1>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;