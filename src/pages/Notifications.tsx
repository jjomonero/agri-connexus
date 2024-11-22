import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileText, ShoppingCart, Users, Check } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "contract",
      title: "New Contract Ready for Review",
      description: "Contract #123 with Farm Fresh Co. needs your attention",
      time: "2 hours ago",
      icon: FileText,
      unread: true,
    },
    {
      id: 2,
      type: "order",
      title: "Order Status Updated",
      description: "Order #456 has been delivered to Green Market",
      time: "5 hours ago",
      icon: ShoppingCart,
      unread: true,
    },
    {
      id: 3,
      type: "user",
      title: "New Supplier Registration",
      description: "Organic Farms Ltd. has joined the platform",
      time: "1 day ago",
      icon: Users,
      unread: false,
    },
    // Add more mock notifications as needed
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="outline" className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Mark All as Read
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      notification.unread ? "bg-primary-light" : "bg-white"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      notification.unread ? "bg-primary text-white" : "bg-gray-100"
                    }`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification.time}
                      </p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Notifications;