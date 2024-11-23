import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Search, Plus, Filter, FileText, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ContractForm from "@/components/ui/dashboard/ContractForm";
import ContractViewer from "@/components/ui/dashboard/ContractViewer";

const Contracts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const contracts = [
    {
      id: 1,
      title: "Acordo de Fornecimento - Q1 2024",
      buyer: "Green Market",
      supplier: "Farm Fresh Co.",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "Ativo",
      type: "Fornecimento",
      value: "R$ 150.000,00",
      pdfUrl: "/contracts/sample-contract.pdf",
      signatures: {
        buyer: {
          name: "João Silva",
          date: "2024-01-01 14:30:00",
        },
        supplier: {
          name: "Maria Santos",
          date: "2024-01-01 15:45:00",
        },
      },
    },
    {
      id: 2,
      title: "Contrato de Produção Sazonal",
      buyer: "Fresh Foods Ltd",
      supplier: "Organic Farms",
      startDate: "2024-02-01",
      endDate: "2024-07-31",
      status: "Pendente",
      type: "Produção",
      value: "R$ 280.000,00"
    },
  ];

  const handleNewContract = () => {
    setShowForm(true);
  };

  const handleViewContract = (contract: any) => {
    setSelectedContract(contract);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Contratos</h1>
            <Button className="flex items-center gap-2" onClick={handleNewContract}>
              <Plus className="w-4 h-4" /> Novo Contrato
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Busca e Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar contratos..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título do Contrato</TableHead>
                    <TableHead>Comprador</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
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
                      <TableCell>{contract.buyer}</TableCell>
                      <TableCell>{contract.supplier}</TableCell>
                      <TableCell>{contract.type}</TableCell>
                      <TableCell>{contract.value}</TableCell>
                      <TableCell>{contract.startDate}</TableCell>
                      <TableCell>{contract.endDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            contract.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {contract.status}
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

          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Contrato</DialogTitle>
              </DialogHeader>
              <ContractForm onClose={() => setShowForm(false)} />
            </DialogContent>
          </Dialog>

          {selectedContract && (
            <ContractViewer
              contractId={selectedContract.id}
              contractUrl={selectedContract.pdfUrl}
              isOpen={!!selectedContract}
              onClose={() => setSelectedContract(null)}
              signatures={selectedContract.signatures}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Contracts;
