import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Camera, Mail, Home, Copy } from "lucide-react";
import { toast } from "sonner";

const RegisterSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Get parameters from URL
  const id = searchParams.get("id") || "";
  const username = searchParams.get("username") || "";

  // Copy payment ID to clipboard
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      toast.success("ID Pembayaran berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Gagal menyalin ID Pembayaran");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Card className="rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-black italic">
              PEMBAYARAN <span className="text-green-500">BERHASIL!</span>
            </CardTitle>
            <CardDescription className="font-semibold text-xl text-green-600">
              Terima kasih telah melakukan pembayaran
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Information */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-semibold text-lg mb-3 text-green-800">
                Detail Pembayaran
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-700">Username:</span>
                  <span className="font-semibold">{username || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-700">
                    ID Pembayaran:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">
                      {id || "N/A"}
                    </span>
                    {id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyId}
                        className="h-6 w-6 p-0"
                      >
                        <Copy
                          className={`w-3 h-3 ${
                            copied ? "text-green-500" : ""
                          }`}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-lg mb-3 text-blue-800 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Langkah Selanjutnya
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-medium text-blue-800 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Cek Email Anda
                    </p>
                    <p className="text-blue-600">
                      Admin akan mengecek pembayaran dan detail pesanan akan
                      dikirim ke email Anda dalam 1-2 jam. Periksa folder spam
                      jika tidak ada di inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <h3 className="font-semibold text-lg mb-2 text-yellow-800">
                Status Verifikasi
              </h3>
              <p className="text-sm text-yellow-700">
                Pembayaran Anda sedang dalam proses verifikasi. Tim kami akan
                memverifikasi bukti transfer dalam waktu 1x24 jam. Anda akan
                mendapat konfirmasi melalui email setelah verifikasi selesai.
              </p>
            </div>

            {/* Contact Information */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Butuh Bantuan?
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Jika ada pertanyaan atau kendala, silakan hubungi kami:
              </p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">WhatsApp:</span> +62
                  851-8336-0304
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => navigate("/")}
                className="flex-1 hover:scale-100"
                size="lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterSuccess;
