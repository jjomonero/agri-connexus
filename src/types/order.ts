export interface OrderProduct {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderDelivery {
  date: string;
  address: string;
  status: "pending" | "in_transit" | "delivered";
}

export interface Order {
  id: string;
  buyerId: string;
  supplierId: string;
  products: OrderProduct[];
  deliveries: OrderDelivery[];
  frequency: "weekly" | "monthly";
  status: "pending" | "approved" | "in_progress" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}