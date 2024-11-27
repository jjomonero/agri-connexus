export interface SupplierProduct {
  id: string;
  name: string;
  stock: number;
  productionCapacity: number;
  price: number;
  unit: string;
}

export interface DeliveryVehicle {
  hasOwnVehicle: boolean;
  capacity: number;
  maxDistance: number;
}

export interface SupplierAvailability {
  days: string[];
  hours: {
    start: string;
    end: string;
  };
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  products: SupplierProduct[];
  productionFrequency: "daily" | "weekly" | "monthly";
  restockFrequency: "daily" | "weekly" | "monthly";
  availability: SupplierAvailability;
  vehicle: DeliveryVehicle;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}