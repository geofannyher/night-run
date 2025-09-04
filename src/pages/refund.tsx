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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const RefundPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: "",
    email: "",
    pesertaId: "",
    alasan: "",
    metode_refund: "",
    no_rekening: "",
    nama_rekening: "",
    nama_bank: "",
    e_wallet_provider: "",
    nowa: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        pesertaId: Number(formData.pesertaId),
      };

      try {
        const response = await axios.post(
          "https://c5662d946bf5.ngrok-free.app/refund/pengajuan",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message || "Gagal mengajukan refund");
        }
        throw new Error("Gagal mengajukan refund");
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Pengajuan Refund Berhasil");
      // Navigate to success page
      navigate("/refund-success", {
        state: {
          email: formData.email,
          nik: formData.nik,
        },
      });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Gagal mengajukan refund");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.nik ||
      !formData.email ||
      !formData.pesertaId ||
      !formData.alasan
    ) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    if (
      formData.metode_refund === "transfer_bank" &&
      (!formData.no_rekening || !formData.nama_rekening || !formData.nama_bank)
    ) {
      toast.error("Mohon lengkapi semua data rekening untuk transfer bank");
      return;
    }

    if (formData.metode_refund === "e_wallet" && !formData.e_wallet_provider) {
      toast.error("Mohon pilih provider e-wallet");
      return;
    }

    mutation.mutate();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-vibrant-lime hover:text-vibrant-lime/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <Card className="rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black italic">
              PENGAJUAN <span className="text-vibrant-lime">REFUND</span>
            </CardTitle>
            <CardDescription className="text-base">
              Lengkapi form berikut untuk mengajukan refund pendaftaran
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NIK and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK *</Label>
                  <Input
                    id="nik"
                    value={formData.nik}
                    onChange={(e) => handleInputChange("nik", e.target.value)}
                    placeholder="Masukkan NIK sesuai KTP"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Peserta ID and WhatsApp */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <>
                    <Label htmlFor="pesertaId">ID Peserta *</Label>
                    <p className="text-xs text-red-500 italic">
                      ID Peserta dapat di cek di Email
                    </p>
                  </>
                  <Input
                    id="pesertaId"
                    type="number"
                    value={formData.pesertaId}
                    onChange={(e) =>
                      handleInputChange("pesertaId", e.target.value)
                    }
                    placeholder="Masukkan ID Peserta"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nowa">No. WhatsApp</Label>
                  <Input
                    id="nowa"
                    value={formData.nowa}
                    onChange={(e) => handleInputChange("nowa", e.target.value)}
                    placeholder="628xxxxxxxxxx"
                  />
                </div>
              </div>

              {/* Alasan Refund */}
              <div className="space-y-2">
                <Label htmlFor="alasan">Alasan Refund *</Label>
                <Textarea
                  id="alasan"
                  value={formData.alasan}
                  onChange={(e) => handleInputChange("alasan", e.target.value)}
                  placeholder="Jelaskan alasan mengapa Anda ingin mengajukan refund"
                  className="min-h-[100px]"
                  required
                />
              </div>

              {/* Metode Refund */}
              <div className="space-y-2">
                <Label>Metode Refund *</Label>
                <Select
                  value={formData.metode_refund}
                  onValueChange={(value) =>
                    handleInputChange("metode_refund", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metode refund" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transfer_bank">Transfer Bank</SelectItem>
                    <SelectItem value="e_wallet">E-Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bank Details - Show only if transfer_bank is selected */}
              {formData.metode_refund === "transfer_bank" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="space-y-2">
                    <Label>Nama Bank *</Label>
                    {/* <Select
                      value={formData.nama_bank}
                      onValueChange={(value) =>
                        handleInputChange("nama_bank", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BCA">BCA</SelectItem>
                        <SelectItem value="Mandiri">Mandiri</SelectItem>
                        <SelectItem value="BNI">BNI</SelectItem>
                        <SelectItem value="BRI">BRI</SelectItem>
                        <SelectItem value="CIMB Niaga">CIMB Niaga</SelectItem>
                        <SelectItem value="Danamon">Danamon</SelectItem>
                        <SelectItem value="Permata">Permata</SelectItem>
                        <SelectItem value="BTN">BTN</SelectItem>
                        <SelectItem value="Bank Jatim">Bank Jatim</SelectItem>
                        <SelectItem value="BSI">BSI</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select> */}
                    <div className="space-y-2">
                      <Label htmlFor="nama_bank">Nama Bank *</Label>
                      <Input
                        id="nama_bank"
                        value={formData.nama_bank}
                        onChange={(e) =>
                          handleInputChange("nama_bank", e.target.value)
                        }
                        placeholder="Masukkan nama bank BCA, Mandiri ...."
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="no_rekening">No. Rekening *</Label>
                      <Input
                        id="no_rekening"
                        value={formData.no_rekening}
                        onChange={(e) =>
                          handleInputChange("no_rekening", e.target.value)
                        }
                        placeholder="Masukkan nomor rekening"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nama_rekening">
                        Nama Pemilik Rekening *
                      </Label>
                      <Input
                        id="nama_rekening"
                        value={formData.nama_rekening}
                        onChange={(e) =>
                          handleInputChange("nama_rekening", e.target.value)
                        }
                        placeholder="Nama sesuai rekening bank"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* E-Wallet Details - Show only if e_wallet is selected */}
              {formData.metode_refund === "e_wallet" && (
                <div className="space-y-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="space-y-2">
                    <Label>Provider E-Wallet *</Label>
                    <Select
                      value={formData.nama_bank}
                      onValueChange={(value) =>
                        handleInputChange("nama_bank", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih provider e-wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SHOPEE">ShopeePay</SelectItem>
                        <SelectItem value="DANA">DANA</SelectItem>
                        <SelectItem value="GOPAY">GoPay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nowa_ewallet">No. HP/E-Wallet *</Label>
                    <Input
                      id="nowa_ewallet"
                      value={formData.no_rekening}
                      onChange={(e) =>
                        handleInputChange("no_rekening", e.target.value)
                      }
                      placeholder="628xxxxxxxxxx"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nowa_ewallet">Nama Penerima</Label>
                    <Input
                      id="nowa_ewallet"
                      value={formData.nama_rekening}
                      onChange={(e) =>
                        handleInputChange("nama_rekening", e.target.value)
                      }
                      placeholder="Nama Penerima"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Information Box */}
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="font-semibold text-lg mb-2 text-yellow-800">
                  Informasi Penting
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>
                    • Proses refund akan diverifikasi dalam 3-5 hari kerja
                  </li>
                  <li>• Refund akan dikurangi biaya administrasi 10%</li>
                  <li>• Pastikan data yang dimasukkan sudah benar</li>
                  <li>• Anda akan mendapat konfirmasi melalui email</li>
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 hover:scale-100"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Mengajukan Refund...
                  </>
                ) : (
                  "Ajukan Refund"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPage;
