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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { User } from "@/types/user";
import UserCredentialsDialog from "@/components/ui/user/UserCredentialsDialog";

const Users = () => {
  const { toast } = useToast();
  const { user: currentUser, createUserCredentials } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserCredentials, setNewUserCredentials] = useState<{ email: string; password: string } | null>(null);
  
  // Initialize users with properly typed mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "buyer",
      status: "active",
      createdBy: currentUser?.id
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "supplier",
      status: "active",
      createdBy: currentUser?.id
    },
  ].filter(user => user.createdBy === currentUser?.id));

  const handleNewUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    if (user.createdBy !== currentUser?.id) {
      toast({
        title: "Acesso negado",
        description: "Você só pode editar usuários que você criou.",
        variant: "destructive",
      });
      return;
    }
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete?.createdBy !== currentUser?.id) {
      toast({
        title: "Acesso negado",
        description: "Você só pode deletar usuários que você criou.",
        variant: "destructive",
      });
      return;
    }
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuário excluído",
      description: "O usuário foi removido com sucesso.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userData: User = {
      id: editingUser?.id || String(Date.now()),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as UserRole,
      status: formData.get("status") as "active" | "inactive",
      createdBy: currentUser?.id
    };

    try {
      if (!editingUser) {
        const credentials = await createUserCredentials(userData);
        setNewUserCredentials(credentials);
        setUsers([...users, { ...userData, email: credentials.email }]);
      } else {
        setUsers(users.map(user => user.id === editingUser.id ? userData : user));
      }

      setShowForm(false);
      toast({
        title: editingUser ? "Usuário atualizado" : "Usuário criado",
        description: editingUser 
          ? "As informações do usuário foram atualizadas com sucesso."
          : "O novo usuário foi criado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive",
      });
    }
  };

  if (currentUser?.role !== "administrator") {
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
            <h1 className="text-2xl font-bold">Usuários</h1>
            <Button className="flex items-center gap-2" onClick={handleNewUser}>
              <Plus className="w-4 h-4" /> Novo Usuário
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
                    placeholder="Buscar usuários..."
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === "buyer" && "Comprador"}
                        {user.role === "supplier" && "Fornecedor"}
                        {user.role === "administrator" && "Administrador"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? "Editar Usuário" : "Novo Usuário"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">Nome</label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingUser?.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingUser?.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role">Função</label>
                  <Select name="role" defaultValue={editingUser?.role || "buyer"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Comprador</SelectItem>
                      <SelectItem value="supplier">Fornecedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="status">Status</label>
                  <Select name="status" defaultValue={editingUser?.status || "active"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingUser ? "Salvar" : "Criar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {newUserCredentials && (
            <UserCredentialsDialog
              isOpen={!!newUserCredentials}
              onClose={() => setNewUserCredentials(null)}
              credentials={newUserCredentials}
            />
          )}
        </div>
      </main>
    </div>
  );
};
