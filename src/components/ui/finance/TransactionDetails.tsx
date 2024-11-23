import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface TransactionParty {
  id: string;
  name: string;
  role: string;
  percentage: number;
  amount: number;
}

export interface TransactionDetailsProps {
  transaction: {
    id: string;
    description: string;
    type: "income" | "expense";
    amount: string;
    status: "pending" | "completed" | "failed";
    date: string;
    contractId?: string;
    products: Product[];
    parties: TransactionParty[];
    profitMargin: number;
    totalAmount: number;
    fees: number;
    notes?: string;
  };
  open: boolean;
  onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Detalhes da Transação #{transaction.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Status:</dt>
                      <dd className={`${
                        transaction.status === "completed" 
                          ? "text-green-600"
                          : transaction.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                        {transaction.status === "completed" ? "Concluído" :
                         transaction.status === "pending" ? "Pendente" : "Falhou"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Data:</dt>
                      <dd>{new Date(transaction.date).toLocaleDateString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Tipo:</dt>
                      <dd className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                        {transaction.type === "income" ? "Receita" : "Despesa"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Valor Total:</dt>
                      <dd className="font-mono">{formatCurrency(transaction.totalAmount)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Margem de Lucro:</dt>
                      <dd className="font-mono text-green-600">
                        {transaction.profitMargin.toFixed(2)}%
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Taxas:</dt>
                      <dd className="font-mono text-red-600">{formatCurrency(transaction.fees)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partes Envolvidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transaction.parties.map((party) => (
                      <div key={party.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{party.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {party.role === "buyer" ? "Comprador" : "Fornecedor"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Percentual:</span>
                          <span>{party.percentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Valor:</span>
                          <span className="font-mono">{formatCurrency(party.amount)}</span>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">Preço Unit.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-right">{product.quantity}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(product.unitPrice)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(product.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {transaction.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Observações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{transaction.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;