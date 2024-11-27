export interface ContractParty {
  name: string;
  role: "buyer" | "supplier" | "company";
  responsibilities: string[];
}

export interface ContractProduct {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentTerms {
  method: "cash" | "installments" | "billing";
  daysToPayAfterDelivery: number;
  lateFees: {
    percentage: number;
    gracePeriod: number;
  };
}

export interface DeliverySchedule {
  frequency: "daily" | "weekly" | "monthly";
  specificDays?: string[];
  timeWindow?: {
    start: string;
    end: string;
  };
}

export interface ContractPenalties {
  lateDeliveryFee: number;
  productQualityFee: number;
  contractBreachFee: number;
}

export interface BaseContract {
  id: string;
  title: string;
  parties: ContractParty[];
  products: ContractProduct[];
  paymentTerms: PaymentTerms;
  deliverySchedule: DeliverySchedule;
  penalties: ContractPenalties;
  startDate: Date;
  endDate: Date;
  status: "draft" | "active" | "completed" | "cancelled";
}