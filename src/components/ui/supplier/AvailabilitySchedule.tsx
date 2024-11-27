import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SupplierAvailability } from "@/types/supplier";

const DAYS = [
  { id: "monday", label: "Segunda" },
  { id: "tuesday", label: "Terça" },
  { id: "wednesday", label: "Quarta" },
  { id: "thursday", label: "Quinta" },
  { id: "friday", label: "Sexta" },
  { id: "saturday", label: "Sábado" },
  { id: "sunday", label: "Domingo" },
];

const formSchema = z.object({
  days: z.array(z.string()),
  hours: z.object({
    start: z.string(),
    end: z.string(),
  }),
});

interface AvailabilityScheduleProps {
  initialData?: SupplierAvailability;
  onChange: (data: SupplierAvailability) => void;
}

const AvailabilitySchedule = ({ initialData, onChange }: AvailabilityScheduleProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      days: initialData?.days || [],
      hours: initialData?.hours || { start: "08:00", end: "18:00" },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onChange(values);
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Dias Disponíveis</FormLabel>
          <div className="grid grid-cols-4 gap-4">
            {DAYS.map((day) => (
              <FormField
                key={day.id}
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(day.id)}
                        onCheckedChange={(checked) => {
                          const updatedDays = checked
                            ? [...field.value, day.id]
                            : field.value?.filter((d) => d !== day.id);
                          field.onChange(updatedDays);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {day.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hours.start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário Inicial</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hours.end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário Final</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default AvailabilitySchedule;