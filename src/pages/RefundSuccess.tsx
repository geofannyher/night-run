import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Mail, Home, Clock } from "lucide-react";

const RefundSuccess = () => {
  const location = useLocation() as {
    state: { email?: string; nik?: string };
  };
  const navigate = useNavigate();

  const { email = "", nik = "" } = location.state || {};

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Card className="rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-black italic">
              PENGAJUAN REFUND <span className="text-green-500">BERHASIL!</span>
            </CardTitle>
            <CardDescription className="font-semibold text-xl text-green-600">
              Terima kasih telah mengajukan refund
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Information */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-semibold text-lg mb-3 text-green-800">
                Detail Pengajuan
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-700">Email:</span>
                  <span className="font-semibold">{email || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-700">NIK:</span>
                  <span className="font-mono font-semibold">
                    {nik || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Process Information */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-lg mb-3 text-blue-800 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Proses Selanjutnya
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-medium text-blue-800 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Verifikasi Data
                    </p>
                    <p className="text-blue-600">
                      Tim kami akan memverifikasi data pengajuan refund Anda
                      dalam 3-5 hari kerja. Anda akan mendapat konfirmasi
                      melalui email setelah verifikasi selesai.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <h3 className="font-semibold text-lg mb-2 text-yellow-800">
                Status Pengajuan
              </h3>
              <p className="text-sm text-yellow-700">
                Pengajuan refund Anda sedang dalam proses verifikasi. Setelah
                disetujui, dana akan dikembalikan sesuai metode yang dipilih .
                Proses pencairan dana membutuhkan waktu 7-14 hari kerja setelah
                persetujuan.
              </p>
            </div>

            {/* Contact Information */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Butuh Bantuan?
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Jika ada pertanyaan tentang status refund, silakan hubungi kami:
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

export default RefundSuccess;
