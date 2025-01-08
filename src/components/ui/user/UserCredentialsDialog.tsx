import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface UserCredentialsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  credentials: {
    email: string;
    password: string;
  };
}

const UserCredentialsDialog = ({ isOpen, onClose, credentials }: UserCredentialsDialogProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopyCredentials = () => {
    const text = `Email: ${credentials.email}\nSenha: ${credentials.password}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credenciais do Usuário</DialogTitle>
          <DialogDescription>
            Guarde estas informações em um local seguro. A senha não poderá ser recuperada depois.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={credentials.email} readOnly />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                readOnly
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
          </div>

          <Button onClick={handleCopyCredentials} className="w-full">
            Copiar Credenciais
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserCredentialsDialog;