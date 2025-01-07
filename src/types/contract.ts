export interface ContractParty {
  id: string;
  name: string;
  role: "buyer" | "supplier" | "platform";
  responsibilities: string[];
  percentage?: number;
}

export interface ContractProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  description?: string;
  unit: string;
}

export interface PaymentTerms {
  method: "cash" | "credit_card" | "bank_transfer" | "installments";
  installments?: number;
  dueDate: string;
  totalAmount: number;
  fees?: number;
}

export interface DeliverySchedule {
  frequency: "weekly" | "monthly" | "biweekly";
  startDate: string;
  endDate: string;
  specificDays?: string[];
  timeWindow?: {
    start: string;
    end: string;
  };
}

export interface ContractPenalties {
  lateDeliveryFee: number;
  qualityIssueFee: number;
  contractBreachFee: number;
  latePenaltyPercentage: number;
}

export interface Contract {
  id: string;
  title: string;
  parties: ContractParty[];
  products: ContractProduct[];
  paymentTerms: PaymentTerms;
  deliverySchedule: DeliverySchedule;
  penalties: ContractPenalties;
  status: "draft" | "pending_approval" | "active" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  signatures?: {
    buyerId?: string;
    supplierId?: string;
    platformId?: string;
    signedAt?: string;
  };
  notes?: string;
}

export type ContractType = "buyer" | "supplier";

export interface ContractFormProps {
  type: ContractType;
  onSubmit: (data: Partial<Contract>) => void;
  initialData?: Partial<Contract>;
  onClose: () => void;
}