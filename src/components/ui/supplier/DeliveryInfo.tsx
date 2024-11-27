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
import { Switch } from "@/components/ui/switch";
import { DeliveryVehicle } from "@/types/supplier";

const formSchema = z.object({
  hasOwnVehicle: z.boolean(),
  capacity: z.number().min(0),
  maxDistance: z.number().min(0),
});

interface DeliveryInfoProps {
  initialData?: DeliveryVehicle;
  onChange: (data: DeliveryVehicle) => void;
}

const DeliveryInfo = ({ initialData, onChange }: DeliveryInfoProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasOwnVehicle: initialData?.hasOwnVehicle || false,
      capacity: initialData?.capacity || 0,
      maxDistance: initialData?.maxDistance || 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onChange({
      hasOwnVehicle: values.hasOwnVehicle,
      capacity: values.capacity,
      maxDistance: values.maxDistance,
    });
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="hasOwnVehicle"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Possui veículo próprio?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("hasOwnVehicle") && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade do Veículo (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distância Máxima (km)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </form>
    </Form>
  );
};

export default DeliveryInfo;