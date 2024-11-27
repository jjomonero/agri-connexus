export interface ContractParty {
  id: string;
  name: string;
  role: "buyer" | "supplier";
  percentage: number;
}

export interface ContractProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Contract {
  id: string;
  buyerId: string;
  supplierId: string;
  products: ContractProduct[];
  parties: ContractParty[];
  deliverySchedule: {
    frequency: "weekly" | "monthly";
    startDate: string;
    endDate: string;
  };
  terms: {
    paymentConditions: string;
    penalties: string;
    responsibilities: string;
  };
  status: "draft" | "pending_approval" | "active" | "completed" | "cancelled";
  totalAmount: number;
  profitMargin: number;
  createdAt: string;
  updatedAt: string;
}