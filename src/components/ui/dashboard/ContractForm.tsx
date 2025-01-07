import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ContractParties } from "@/components/ui/contract/ContractParties";
import { PaymentTerms } from "@/components/ui/contract/PaymentTerms";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Contract } from "@/types/contract";

const contractSchema = z.object({
  title: z.string().min(2, {
    message: "O título do contrato deve ter pelo menos 2 caracteres.",
  }),
  buyerName: z.string().min(2, {
    message: "Nome do comprador é obrigatório.",
  }),
  supplierName: z.string().min(2, {
    message: "Nome do fornecedor é obrigatório.",
  }),
  buyerResponsibilities: z.string(),
  supplierResponsibilities: z.string(),
  startDate: z.date({
    required_error: "Data de início é obrigatória.",
  }),
  endDate: z.date({
    required_error: "Data de término é obrigatória.",
  }),
  paymentMethod: z.enum(["cash", "installments", "billing"]),
  daysToPayAfterDelivery: z.number().min(0),
  lateFeePercentage: z.number().min(0).max(100),
  description: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres.",
  }),
  value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Valor deve ser um número positivo",
  }),
});

interface ContractFormProps {
  onClose: () => void;
  type: "buyer" | "supplier";
  onSubmit: (data: Partial<Contract>) => Promise<void>;
}

const ContractForm = ({ onClose, type, onSubmit }: ContractFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      title: "",
      buyerName: "",
      supplierName: "",
      buyerResponsibilities: "",
      supplierResponsibilities: "",
      paymentMethod: "cash",
      daysToPayAfterDelivery: 0,
      lateFeePercentage: 2,
      description: "",
      value: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof contractSchema>) => {
    try {
      await onSubmit(values);
      toast({
        title: "Contrato criado com sucesso",
        description: `O contrato do tipo ${type === "buyer" ? "comprador" : "fornecedor"} foi registrado.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar o contrato. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <h2 className="text-lg font-semibold">
          {type === "buyer" ? "Contrato com Comprador" : "Contrato com Fornecedor"}
        </h2>

        <ContractParties control={form.control} type={type === "buyer" ? "buyer" : "supplier"} />
        
        <PaymentTerms control={form.control} />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Criar Contrato</Button>
        </div>
      </form>
    </Form>
  );
};

export default ContractForm;