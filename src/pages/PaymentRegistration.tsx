import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const PaymentRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation() as {
    state: { username?: string; id_pembayaran?: string };
  };
  const { username = "", id_pembayaran = "" } = location.state || {};
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [user, setUser] = useState(username);
  const [paymentId, setPaymentId] = useState(id_pembayaran);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!imageFile) throw new Error("Bukti transfer wajib diunggah");

      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (imageFile.size > maxSize) {
        throw new Error("Ukuran file maksimal 5MB");
      }

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("username", user);
      formData.append("id_pembayaran", paymentId);

      try {
        const response = await axios.post(
          "https://event-be-one.vercel.app/pembayaran/pendaftaran",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message || "Gagal mengunggah pembayaran");
        }
        throw new Error("Gagal mengunggah pembayaran");
      }
    },
    onSuccess: () => {
      toast.success("Bukti pembayaran berhasil diunggah");
      navigate("/", { replace: true });
    },
    onError: (err: any) => toast.error(err?.message || "Gagal mengunggah"),
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Card className="rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black italic">
              PENDAFTARAN <span className="text-vibrant-lime">BERHASIL</span>
            </CardTitle>
            <CardDescription>
              Silakan melakukan pembayaran dengan informasi berikut:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-muted/40 rounded-xl text-sm space-y-2">
              <div className="font-semibold text-base mb-3">
                Informasi Pembayaran
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">Bank:</span>
                  <span>Bank Jatim</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">No. Rekening:</span>
                  <span className="font-mono">0032836836</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Nama Rekening:</span>
                  <span>Andy Reza Zulkarnaen</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Jumlah Nominal:</span>
                  <span className="text-vibrant-lime font-semibold">
                    Rp 160.000
                  </span>
                </div>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pid">ID Pembayaran</Label>
                <Input
                  id="pid"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Upload Bukti Transfer (Max 5MB)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      const maxSize = 5 * 1024 * 1024; // 5MB
                      if (file.size > maxSize) {
                        toast.error("Ukuran file maksimal 5MB");
                        e.target.value = ""; // Clear the input
                        return;
                      }
                    }
                    setImageFile(file);
                  }}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full hover:scale-100"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Uploading..." : "Submit Payment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentRegistration;
