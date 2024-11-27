import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface PaymentTermsProps {
  control: any;
}

export const PaymentTerms = ({ control }: PaymentTermsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Forma de Pagamento</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="cash">À Vista</SelectItem>
                <SelectItem value="installments">Parcelado</SelectItem>
                <SelectItem value="billing">Faturamento</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="daysToPayAfterDelivery"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prazo para Pagamento (dias úteis)</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lateFeePercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Multa por Atraso (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};