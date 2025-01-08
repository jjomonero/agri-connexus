import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

interface ContractSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ContractSearch = ({ searchTerm, onSearchChange }: ContractSearchProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};