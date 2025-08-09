import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo
    if (formData.email === "admin@running.com" && formData.password === "admin123") {
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
    } else {
      toast.error("Invalid email or password. Try admin@running.com / admin123");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-vibrant-blue hover:text-vibrant-blue/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-vibrant-blue/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-vibrant-blue" />
            </div>
            <CardTitle className="text-2xl font-black">
              ADMIN <span className="text-vibrant-blue">LOGIN</span>
            </CardTitle>
            <CardDescription>
              This page is only for administrators
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium text-center">Demo Credentials:</p>
                <p className="text-center text-muted-foreground">
                  Email: admin@running.com<br />
                  Password: admin123
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginAdmin;