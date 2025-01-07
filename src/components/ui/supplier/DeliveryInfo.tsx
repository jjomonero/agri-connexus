import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DeliveryVehicle } from "@/types/supplier";

interface DeliveryInfoProps {
  initialData?: DeliveryVehicle;
  onChange: (vehicle: DeliveryVehicle) => void;
}

const DeliveryInfo = ({ initialData, onChange }: DeliveryInfoProps) => {
  const [hasOwnVehicle, setHasOwnVehicle] = useState(initialData?.hasOwnVehicle || false);
  const [capacity, setCapacity] = useState(initialData?.capacity || 0);
  const [maxDistance, setMaxDistance] = useState(initialData?.maxDistance || 0);

  const handleChange = (field: keyof DeliveryVehicle, value: any) => {
    const updatedData = {
      hasOwnVehicle,
      capacity,
      maxDistance,
      [field]: value,
    };
    
    if (field === "hasOwnVehicle") {
      setHasOwnVehicle(value);
    } else if (field === "capacity") {
      setCapacity(Number(value));
    } else if (field === "maxDistance") {
      setMaxDistance(Number(value));
    }

    onChange(updatedData);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informações de Entrega</h3>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="hasOwnVehicle"
          checked={hasOwnVehicle}
          onCheckedChange={(checked) => handleChange("hasOwnVehicle", checked)}
        />
        <Label htmlFor="hasOwnVehicle">Possui veículo próprio</Label>
      </div>

      {hasOwnVehicle && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade de Carga (kg)</Label>
            <Input
              id="capacity"
              type="number"
              min="0"
              value={capacity}
              onChange={(e) => handleChange("capacity", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDistance">Distância Máxima (km)</Label>
            <Input
              id="maxDistance"
              type="number"
              min="0"
              value={maxDistance}
              onChange={(e) => handleChange("maxDistance", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;