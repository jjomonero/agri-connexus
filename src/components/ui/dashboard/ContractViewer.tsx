import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ContractViewerProps {
  contractId: number;
  contractUrl: string;
  isOpen: boolean;
  onClose: () => void;
  signatures?: {
    buyer?: { name: string; date: string };
    supplier?: { name: string; date: string };
  };
}

const ContractViewer = ({
  contractId,
  contractUrl,
  isOpen,
  onClose,
  signatures,
}: ContractViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleSignContract = async () => {
    setLoading(true);
    try {
      // Here you would integrate with a digital signature service
      // Example services: DocuSign, SignNow, HelloSign
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Contrato assinado com sucesso",
        description: "Sua assinatura digital foi registrada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao assinar contrato",
        description: "Ocorreu um erro ao processar sua assinatura. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Visualização do Contrato</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto">
            <Document
              file={contractUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center"
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                disabled={pageNumber >= numPages}
              >
                Próxima
              </Button>
              <span className="self-center text-sm text-muted-foreground">
                Página {pageNumber} de {numPages}
              </span>
            </div>

            {(user?.role === "buyer" || user?.role === "supplier") && !signatures?.[user.role] && (
              <Button onClick={handleSignContract} disabled={loading}>
                {loading ? "Processando..." : "Assinar Digitalmente"}
              </Button>
            )}
          </div>

          {signatures && Object.keys(signatures).length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Assinaturas:</h4>
              <div className="grid grid-cols-2 gap-4">
                {signatures.buyer && (
                  <div className="text-sm">
                    <p className="font-medium">Comprador:</p>
                    <p>{signatures.buyer.name}</p>
                    <p className="text-muted-foreground">{signatures.buyer.date}</p>
                  </div>
                )}
                {signatures.supplier && (
                  <div className="text-sm">
                    <p className="font-medium">Fornecedor:</p>
                    <p>{signatures.supplier.name}</p>
                    <p className="text-muted-foreground">{signatures.supplier.date}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractViewer;