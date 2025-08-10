import { useMemo, useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const RegisterRunning = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialCategory =
    params.get("category")?.toLowerCase() === "10k" ? "10k" : "5k";

  const [formData, setFormData] = useState({
    nik: "",
    nama_lengkap: "",
    email: "",
    no_wa: "",
    alamat: "",
    tanggal_lahir: "",
    kota_domisili: "",
    golongan_darah: "",
    no_kontak_darurat: "",
    riwayat_penyakit: "",
    location_race_pack: "1",
    ukuran_jersey: "all",
    harga: "",
    tipe: initialCategory === "10k" ? 10 : 5,
  });

  const [birthDate, setBirthDate] = useState<Date>();

  const price = useMemo(
    () => (formData.tipe === 10 ? "180000" : "160000"),
    [formData.tipe]
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        harga: price,
        tanggal_lahir: birthDate ? format(birthDate, "dd/MM/yyyy") : "",
      };
      try {
        const response = await axios.post(
          "https://event-be-one.vercel.app/peserta/pendaftaran",
          payload,
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
          throw new Error(message || "Failed to submit registration");
        }
        throw new Error("Failed to submit registration");
      }
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Pendaftaran berhasil! Lanjut ke pembayaran.");
      const idPembayaran = data?.data?.id_pembayaran ?? data?.id ?? "";
      navigate(
        "/pembayaran/pendaftaran?id_pembayaran=" +
          data?.data?.id_pembayaran +
          "&email=" +
          formData.email +
          "&category=" +
          formData.tipe,
        {
          state: { username: formData.email, id_pembayaran: idPembayaran },
        }
      );
    },
    onError: (err: any) => {
      toast.error(err?.message || "Gagal mengirim pendaftaran");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate birth date
    if (!birthDate) {
      toast.error("Tanggal lahir harus diisi");
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
              REGISTRATION <span className="text-vibrant-lime">FORM</span>
            </CardTitle>
            <CardDescription className="text-base">
              Lengkapi data peserta sesuai KTP dengan benar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Input
                    id="nik"
                    value={formData.nik}
                    onChange={(e) => handleInputChange("nik", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={formData.nama_lengkap}
                    onChange={(e) =>
                      handleInputChange("nama_lengkap", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wa">No. WhatsApp</Label>
                  <Input
                    id="wa"
                    value={formData.no_wa}
                    onChange={(e) => handleInputChange("no_wa", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Input
                    id="alamat"
                    value={formData.alamat}
                    onChange={(e) =>
                      handleInputChange("alamat", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Lahir</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? (
                          format(birthDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pilih tanggal lahir</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        initialFocus
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domisili">Kota Domisili</Label>
                  <Input
                    id="domisili"
                    value={formData.kota_domisili}
                    onChange={(e) =>
                      handleInputChange("kota_domisili", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Golongan Darah</Label>
                  <Select
                    value={formData.golongan_darah}
                    onValueChange={(v) =>
                      handleInputChange("golongan_darah", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih golongan darah" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "AB", "O"].map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="darurat">Kontak Darurat</Label>
                  <Input
                    id="darurat"
                    value={formData.no_kontak_darurat}
                    onChange={(e) =>
                      handleInputChange("no_kontak_darurat", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="penyakit">Riwayat Penyakit (opsional)</Label>
                <Input
                  id="penyakit"
                  value={formData.riwayat_penyakit}
                  onChange={(e) =>
                    handleInputChange("riwayat_penyakit", e.target.value)
                  }
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Lokasi Pengambilan Race Pack</Label>
                  <Select
                    value={formData.location_race_pack}
                    onValueChange={(v) =>
                      handleInputChange("location_race_pack", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Kantor Kejaksaan</SelectItem>
                      <SelectItem value="2">Cafe Kopi Naga 99</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select
                    value={String(formData.tipe)}
                    onValueChange={(v) =>
                      handleInputChange("tipe", Number(v) as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5K (Rp 160.000)</SelectItem>
                      <SelectItem value="10">10K (Rp 180.000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-muted/40 rounded-xl text-sm flex items-center justify-between">
                <span className="font-semibold">Total Harga</span>
                <span className="text-vibrant-lime font-black">
                  Rp {Number(price).toLocaleString("id-ID")}
                </span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full hover:scale-100"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterRunning;
