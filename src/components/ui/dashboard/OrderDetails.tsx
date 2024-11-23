import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsProps {
  order: {
    id: string;
    buyer: string;
    supplier: string;
    items: string;
    total: string;
    status: string;
    date: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails = ({ order, isOpen, onClose }: OrderDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido {order.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-2">Informações Gerais</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Comprador</p>
                  <p className="font-medium">{order.buyer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fornecedor</p>
                  <p className="font-medium">{order.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium">{order.total}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-semibold mb-2">Itens do Pedido</h4>
              <p>{order.items}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-semibold mb-2">Status Atual</h4>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "In Transit"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;