import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Truck, CheckCircle2 } from "lucide-react";

interface OrderTrackerProps {
  order: {
    id: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const OrderTracker = ({ order, isOpen, onClose }: OrderTrackerProps) => {
  const steps = [
    {
      title: "Em Preparação",
      description: "Pedido está sendo preparado pelo fornecedor",
      icon: Package2,
      completed: true,
    },
    {
      title: "Em Trânsito",
      description: "Pedido está a caminho do destino",
      icon: Truck,
      completed: order.status === "In Transit" || order.status === "Delivered",
    },
    {
      title: "Entregue",
      description: "Pedido foi entregue com sucesso",
      icon: CheckCircle2,
      completed: order.status === "Delivered",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rastreamento do Pedido {order.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 pb-8">
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-8 left-4 w-0.5 h-full -ml-[2px] ${
                        step.completed ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
                <div className="pb-8">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderTracker;