import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SupplierAvailability } from "@/types/supplier";

interface AvailabilityScheduleProps {
  initialData?: SupplierAvailability;
  onChange: (availability: SupplierAvailability) => void;
}

const DAYS_OF_WEEK = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const AvailabilitySchedule = ({ initialData, onChange }: AvailabilityScheduleProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(initialData?.days || []);
  const [hours, setHours] = useState({
    start: initialData?.hours?.start || "08:00",
    end: initialData?.hours?.end || "18:00",
  });

  const handleDayToggle = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    
    setSelectedDays(updatedDays);
    onChange({
      days: updatedDays,
      hours,
    });
  };

  const handleHoursChange = (type: "start" | "end", value: string) => {
    const updatedHours = { ...hours, [type]: value };
    setHours(updatedHours);
    onChange({
      days: selectedDays,
      hours: updatedHours,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Disponibilidade para Entregas</h3>
      
      <div className="space-y-2">
        <Label>Dias Disponíveis</Label>
        <div className="grid grid-cols-2 gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={day}
                checked={selectedDays.includes(day)}
                onCheckedChange={() => handleDayToggle(day)}
              />
              <Label htmlFor={day}>{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Horário Inicial</Label>
          <Input
            id="startTime"
            type="time"
            value={hours.start}
            onChange={(e) => handleHoursChange("start", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">Horário Final</Label>
          <Input
            id="endTime"
            type="time"
            value={hours.end}
            onChange={(e) => handleHoursChange("end", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySchedule;