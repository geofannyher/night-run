import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AdminUser {
  id: number;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export const useAuth = (redirectTo: string = "/login-admin") => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminUser = localStorage.getItem("admin_user");
        if (!adminUser) {
          toast.error("Access denied. Please login first.");
          navigate(redirectTo, { replace: true });
          return;
        }

        const userData = JSON.parse(adminUser);
        if (!userData || !userData.id) {
          throw new Error("Invalid user data");
        }

        setUser(userData);
      } catch (error) {
        localStorage.removeItem("admin_user");
        toast.error("Session expired. Please login again.");
        navigate(redirectTo, { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, redirectTo]);

  const logout = () => {
    localStorage.removeItem("admin_user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return { user, isLoading, logout, isAuthenticated: !!user };
};

export default useAuth;
