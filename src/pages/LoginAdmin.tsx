import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  ArrowLeft,
  Mail,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          "https://event-be-one.vercel.app/user/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message || "Login failed");
        }
        throw new Error("Login failed");
      }
    },
    onSuccess: (data: any) => {
      toast.success("Login successful! Redirecting to dashboard...");
      // Store user data if needed
      localStorage.setItem("admin_user", JSON.stringify(data.data));
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Invalid credentials");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-vibrant-lime hover:text-vibrant-lime/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Brand heading in Index style */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight italic">
              <span>WELCOME</span>
              <br />
              <span>ADMIN</span>
              <br />
              <span className="text-vibrant-lime">PORTAL</span>
            </h1>
            <div className="space-y-3 text-muted-foreground max-w-lg">
              <p>
                Halaman ini khusus untuk administrator. Peserta tidak perlu
                membuat akun atau login di sini.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-vibrant-lime" />
                  Kelola data pendaftaran dan informasi acara
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-vibrant-lime" />
                  Akses terbatas untuk petugas berwenang
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Login form card */}
          <div className="w-full max-w-md lg:ml-auto">
            <Card className="rounded-3xl overflow-hidden ring-1 ring-border shadow-xl bg-background">
              <div className="h-2 bg-gradient-to-r from-vibrant-lime via-vibrant-lime/70 to-electric-purple" />
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 bg-vibrant-lime/10 rounded-full ring-1 ring-vibrant-lime/20 flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-vibrant-lime" />
                </div>
                <CardTitle className="text-2xl font-black italic">
                  ADMIN <span className="text-vibrant-lime">LOGIN</span>
                </CardTitle>
                <CardDescription>Only for authorized personnel</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Username</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="user"
                        type="text"
                        value={formData.user}
                        onChange={(e) =>
                          handleInputChange("user", e.target.value)
                        }
                        placeholder="Enter admin username"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Enter admin password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
