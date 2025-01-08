import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { ContractType } from "@/types/contract";

interface ContractActionsProps {
  onNewContract: (type: ContractType) => void;
}

export const ContractActions = ({ onNewContract }: ContractActionsProps) => {
  const { user } = useAuth();

  if (user?.role !== "administrator") {
    return null;
  }

  return (
    <div className="flex gap-4">
      <Button onClick={() => onNewContract("buyer")} className="flex items-center gap-2">
        <Plus className="w-4 h-4" /> Novo Contrato de Compra
      </Button>
      <Button onClick={() => onNewContract("supplier")} variant="outline" className="flex items-center gap-2">
        <Plus className="w-4 h-4" /> Novo Contrato de Fornecimento
      </Button>
    </div>
  );
};