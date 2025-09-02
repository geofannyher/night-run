import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Upload, X, Eye } from "lucide-react";

const PaymentRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation() as {
    state: { username?: string; id_pembayaran?: string };
  };
  const [searchParams] = useSearchParams();

  // Get data from location.state (from registration flow) or URL params (from WhatsApp link)
  const { username = "", id_pembayaran = "" } = location.state || {};
  const emailFromParams = searchParams.get("email") || "";
  const idPembayaranFromParams = searchParams.get("id_pembayaran") || "";
  const categoryFromParams = searchParams.get("category") || "";

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [category, setCategory] = useState("");

  // Initialize form data on component mount
  useEffect(() => {
    // Priority: URL params (from WhatsApp) > location.state (from registration)
    setUser(emailFromParams || username);
    setPaymentId(idPembayaranFromParams || id_pembayaran);
    setCategory(categoryFromParams);
  }, [
    emailFromParams,
    username,
    idPembayaranFromParams,
    id_pembayaran,
    categoryFromParams,
  ]);

  // Cleanup function for URL objects
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

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
      // Navigate to success page with user parameters
      navigate(`/register-success?id=${encodeURIComponent(paymentId)}&username=${encodeURIComponent(user)}`, { replace: true });
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
            <CardDescription className="font-semibold text-2xl">
              Tinggal{" "}
              <span className="text-vibrant-lime">1 Langkah lagi !</span>
            </CardDescription>
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
                  <span className="font-medium">Kategori:</span>
                  <span className="font-semibold">
                    {category ? `${category}K` : "5K"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Jumlah Nominal:</span>
                  <span className="text-vibrant-lime font-semibold">
                    {category === "10" ? "Rp 180.000" : "Rp 160.000"}
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
                <div className="relative">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer file:cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        const maxSize = 5 * 1024 * 1024; // 5MB
                        if (file.size > maxSize) {
                          toast.error("Ukuran file maksimal 5MB");
                          e.target.value = ""; // Clear the input
                          return;
                        }

                        // Create preview URL
                        const previewUrl = URL.createObjectURL(file);
                        setImagePreview(previewUrl);
                      } else {
                        setImagePreview(null);
                      }
                      setImageFile(file);
                    }}
                    required
                  />
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-2">
                  <Label>Preview Bukti Transfer</Label>
                  <div className="relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Preview bukti transfer"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{imageFile?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {imageFile && (
                            <>
                              Ukuran:{" "}
                              {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                            </>
                          )}
                        </p>
                        <p className="text-xs text-green-600">
                          ✓ File siap untuk diunggah
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full hover:scale-100"
                disabled={mutation.isPending}
                size="lg"
              >
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Mengunggah Bukti Transfer...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Payment
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentRegistration;
