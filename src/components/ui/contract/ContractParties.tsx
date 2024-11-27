import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContractPartiesProps {
  control: any;
  type: "buyer" | "supplier";
}

export const ContractParties = ({ control, type }: ContractPartiesProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`${type}Name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{type === "buyer" ? "Nome do Comprador" : "Nome do Fornecedor"}</FormLabel>
            <FormControl>
              <Input placeholder={`Digite o nome do ${type === "buyer" ? "comprador" : "fornecedor"}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${type}Responsibilities`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Responsabilidades</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite as responsabilidades separadas por vírgula"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};