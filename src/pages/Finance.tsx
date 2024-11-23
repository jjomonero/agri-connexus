import { useState } from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Transaction {
  id: string;
  description: string;
  type: "income" | "expense";
  amount: string;
  status: "pending" | "completed" | "failed";
  date: string;
  contractId?: string;
}

const Finance = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Pagamento do Contrato #123",
      type: "income",
      amount: "R$ 2.500,00",
      status: "completed",
      date: "2024-02-15",
      contractId: "123"
    },
    {
      id: "2",
      description: "Taxa de Serviço",
      type: "expense",
      amount: "R$ 150,00",
      status: "completed",
      date: "2024-02-15"
    },
  ]);

  const updateTransactionStatus = (transactionId: string, newStatus: Transaction["status"]) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: newStatus }
        : transaction
    ));
  };

  if (user?.role !== "administrator") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <h1 className="text-2xl font-bold text-red-600">Acesso não autorizado</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Financeiro</h1>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" /> Exportar Relatório
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45.231,89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 12.234,00</div>
                <p className="text-xs text-muted-foreground">
                  4 faturas pendentes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crescimento Mensal</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">
                  Em comparação ao mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="income">Receitas</TabsTrigger>
                  <TabsTrigger value="expenses">Despesas</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {transaction.description}
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1">
                              {transaction.type === "income" ? (
                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-500" />
                              )}
                              {transaction.type === "income" ? "Receita" : "Despesa"}
                            </span>
                          </TableCell>
                          <TableCell className={
                            transaction.type === "income" 
                              ? "text-green-600"
                              : "text-red-600"
                          }>
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {transaction.status === "completed" ? "Concluído" :
                               transaction.status === "pending" ? "Pendente" : "Falhou"}
                            </span>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateTransactionStatus(transaction.id, "completed")}
                              disabled={transaction.status === "completed"}
                            >
                              Atualizar Status
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Finance;