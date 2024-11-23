import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileText, ShoppingCart, Users, Check, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Notification {
  id: number;
  type: "contract" | "order" | "user" | "financial";
  title: string;
  description: string;
  time: string;
  icon: any;
  unread: boolean;
  forRoles: ("buyer" | "supplier" | "administrator")[];
}

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "contract",
      title: "Novo Contrato para Revisão",
      description: "Contrato #123 com Farm Fresh Co. precisa de sua atenção",
      time: "2 horas atrás",
      icon: FileText,
      unread: true,
      forRoles: ["buyer", "supplier", "administrator"]
    },
    {
      id: 2,
      type: "order",
      title: "Status do Pedido Atualizado",
      description: "Pedido #456 foi entregue ao Green Market",
      time: "5 horas atrás",
      icon: ShoppingCart,
      unread: true,
      forRoles: ["buyer", "supplier"]
    },
    {
      id: 3,
      type: "user",
      title: "Novo Fornecedor Registrado",
      description: "Organic Farms Ltd. entrou na plataforma",
      time: "1 dia atrás",
      icon: Users,
      unread: false,
      forRoles: ["administrator"]
    },
    {
      id: 4,
      type: "financial",
      title: "Nova Transação Registrada",
      description: "Pagamento do contrato #123 foi processado",
      time: "3 horas atrás",
      icon: DollarSign,
      unread: true,
      forRoles: ["administrator"]
    }
  ]);

  const filteredNotifications = notifications.filter(
    notification => notification.forRoles.includes(user?.role || "buyer")
  );

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false
    })));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Notificações</h1>
            <Button variant="outline" className="flex items-center gap-2" onClick={markAllAsRead}>
              <Check className="w-4 h-4" /> Marcar todas como lidas
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notificações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      notification.unread ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      notification.unread ? "bg-blue-500 text-white" : "bg-gray-100"
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
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
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