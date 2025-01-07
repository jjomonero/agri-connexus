import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Supplier, SupplierFormData } from "@/types/supplier";
import ProductList from "./ProductList";
import DeliveryInfo from "./DeliveryInfo";
import AvailabilitySchedule from "./AvailabilitySchedule";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  productionFrequency: z.enum(["daily", "weekly", "monthly"]),
  restockFrequency: z.enum(["daily", "weekly", "monthly"]),
});

interface SupplierFormProps {
  onSubmit: (data: Partial<Supplier>) => void;
  initialData?: Partial<Supplier>;
}

const SupplierForm = ({ onSubmit, initialData }: SupplierFormProps) => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialData?.products || []);
  const [vehicle, setVehicle] = useState(initialData?.vehicle);
  const [availability, setAvailability] = useState(initialData?.availability);
  
  const form = useForm<SupplierFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      productionFrequency: initialData?.productionFrequency || "weekly",
      restockFrequency: initialData?.restockFrequency || "weekly",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit({
        ...values,
        products,
        vehicle,
        availability,
        status: "pending",
      });
      
      toast({
        title: "Fornecedor cadastrado com sucesso",
        description: "O cadastro será analisado pela administração.",
      });
    } catch (error) {
      toast({
        title: "Erro ao cadastrar fornecedor",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Fornecedor</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="productionFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência de Produção</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="restockFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência de Reabastecimento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ProductList
          products={products}
          onChange={setProducts}
        />

        <DeliveryInfo
          initialData={initialData?.vehicle}
          onChange={setVehicle}
        />

        <AvailabilitySchedule
          initialData={initialData?.availability}
          onChange={setAvailability}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">
            {initialData ? "Atualizar" : "Cadastrar"} Fornecedor
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SupplierForm;