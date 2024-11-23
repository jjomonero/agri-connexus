import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            Unauthorized Access
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-gray-600">
            You don't have permission to access this page.
          </p>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;