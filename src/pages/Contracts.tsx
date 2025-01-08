import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ContractForm from "@/components/ui/dashboard/ContractForm";
import ContractViewer from "@/components/ui/dashboard/ContractViewer";
import { Contract, ContractType } from "@/types/contract";
import { ContractActions } from "@/components/ui/contract/ContractActions";
import { ContractSearch } from "@/components/ui/contract/ContractSearch";

const Contracts = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [contractType, setContractType] = useState<ContractType>("buyer");

  const contracts = [
    {
      id: "1",
      title: "Acordo de Fornecimento - Q1 2024",
      parties: [
        { id: "1", name: "Green Market", role: "buyer" as const, responsibilities: [] },
        { id: "2", name: "Farm Fresh Co.", role: "supplier" as const, responsibilities: [] }
      ],
      products: [
        {
          id: "1",
          name: "Tomate Orgânico",
          quantity: 100,
          price: 5.99,
          total: 599,
          unit: "kg"
        }
      ],
      status: "active" as const,
      totalAmount: 599,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      paymentTerms: {
        method: "cash" as const,
        dueDate: "2024-03-31",
        totalAmount: 599
      },
      deliverySchedule: {
        frequency: "weekly" as const,
        startDate: "2024-01-01",
        endDate: "2024-03-31"
      },
      penalties: {
        lateDeliveryFee: 50,
        qualityIssueFee: 100,
        contractBreachFee: 500,
        latePenaltyPercentage: 2
      }
    }
  ];

  const handleNewContract = (type: ContractType) => {
    if (user?.role !== "administrator") {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem criar novos contratos.",
        variant: "destructive",
      });
      return;
    }
    setContractType(type);
    setShowForm(true);
  };

  const handleViewContract = (contract: Contract) => {
    // Verifica se o usuário tem permissão para ver o contrato
    const canViewContract = 
      user?.role === "administrator" ||
      (user?.role === "buyer" && contract.parties.some(p => p.role === "buyer")) ||
      (user?.role === "supplier" && contract.parties.some(p => p.role === "supplier"));

    if (!canViewContract) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para visualizar este contrato.",
        variant: "destructive",
      });
      return;
    }

    setSelectedContract({
      ...contract,
      signatures: {
        buyerId: contract.signatures?.buyerId,
        supplierId: contract.signatures?.supplierId,
        platformId: contract.signatures?.platformId,
        signedAt: contract.signatures?.signedAt
      }
    });
  };

  const handleCreateContract = async (data: Partial<Contract>) => {
    if (user?.role !== "administrator") {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem criar contratos.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would make an API call to create the contract
      console.log("Creating contract:", data);
      
      toast({
        title: "Contrato criado com sucesso",
        description: "O contrato foi enviado para aprovação.",
      });
      
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Erro ao criar contrato",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Contratos</h1>
            <ContractActions onNewContract={handleNewContract} />
          </div>

          <ContractSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título do Contrato</TableHead>
                    <TableHead>Comprador</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">
                        {contract.title}
                      </TableCell>
                      <TableCell>
                        {contract.parties.find(p => p.role === "buyer")?.name}
                      </TableCell>
                      <TableCell>
                        {contract.parties.find(p => p.role === "supplier")?.name}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(contract.totalAmount)}
                      </TableCell>
                      <TableCell>{contract.deliverySchedule.startDate}</TableCell>
                      <TableCell>{contract.deliverySchedule.endDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            contract.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {contract.status === "active" ? "Ativo" : "Pendente"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleViewContract(contract)}
                          >
                            <FileText className="w-4 h-4" /> Ver
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" /> Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {user?.role === "administrator" && (
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    {contractType === "buyer" ? "Novo Contrato de Compra" : "Novo Contrato de Fornecimento"}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do contrato para {contractType === "buyer" ? "compra" : "fornecimento"} de produtos
                  </DialogDescription>
                </DialogHeader>
                <ContractForm
                  type={contractType}
                  onSubmit={handleCreateContract}
                  onClose={() => setShowForm(false)}
                />
              </DialogContent>
            </Dialog>
          )}

          {selectedContract && (
            <ContractViewer
              contractId={Number(selectedContract.id)}
              contractUrl={`https://api.example.com/contracts/${selectedContract.id}/pdf`}
              isOpen={!!selectedContract}
              onClose={() => setSelectedContract(null)}
              signatures={{
                buyer: selectedContract.signatures?.buyerId ? {
                  name: selectedContract.parties.find(p => p.role === "buyer")?.name || "",
                  date: selectedContract.signatures.signedAt || ""
                } : undefined,
                supplier: selectedContract.signatures?.supplierId ? {
                  name: selectedContract.parties.find(p => p.role === "supplier")?.name || "",
                  date: selectedContract.signatures.signedAt || ""
                } : undefined
              }}
              contractDetails={{
                products: selectedContract.products.map(p => ({
                  id: p.id,
                  name: p.name,
                  quantity: p.quantity,
                  unit: p.unit
                })),
                deliveryDate: selectedContract.deliverySchedule.startDate,
                deliveryAddress: "Address"
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Contracts;