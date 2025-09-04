import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LogOut,
  Users,
  Trophy,
  Eye,
  Check,
  X,
  DollarSign,
  CreditCard,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  MessageCircle,
  CheckCheck,
  CircleAlert,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Pembayaran {
  id: number;
  peserta_id: number;
  metode_pembayaran: string;
  jumlah_pembayaran: number;
  bukti_pembayaran: string | null;
  status_pembayaran: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface RefundData {
  id: number;
  nik: string;
  email: string;
  no_wa: string;
  pesertaId: number;
  pembayaranId: number;
  jumlah_refund: number;
  alasan: string;
  metode_refund: string;
  nama_bank: string;
  no_rekening: string;
  nama_rekening: string;
  status: string;
  catatan_admin: string | null;
  bukti_refund: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

interface UserData {
  id: number;
  nik: string;
  nama_lengkap: string;
  email: string;
  no_wa: string;
  alamat: string;
  tanggal_lahir: string;
  kota_domisili: string;
  golongan_darah: string;
  no_kontak_darurat: string;
  riwayat_penyakit: string;
  location_race_pack: string;
  ukuran_jersey: string;
  tipe: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  pembayaran: Pembayaran;
  refunds: RefundData[];
}

interface PaymentData {
  pembayaran: Pembayaran;
}

const AdminDashboard = () => {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [selectedPayment, setSelectedPayment] = useState<Pembayaran | null>(
    null
  );
  const [selectedUserData, setSelectedUserData] = useState<UserData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedRefundData, setSelectedRefundData] =
    useState<RefundData | null>(null);
  const [refundCatatanAdmin, setRefundCatatanAdmin] = useState("");
  const [refundBuktiFile, setRefundBuktiFile] = useState<File | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserData>>({});
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  // Fetch payment data from API - moved before early returns
  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://event-be-one.vercel.app/peserta/list"
        );
        return response.data.data as UserData[];
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Failed to fetch data"
          );
        }
        throw new Error("Failed to fetch data");
      }
    },
    enabled: isAuthenticated, // Only run query when authenticated
  });

  // Fetch analytics data from API
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://event-be-one.vercel.app/pembayaran/analitik"
        );
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Failed to fetch analytics data"
          );
        }
        throw new Error("Failed to fetch analytics data");
      }
    },
    enabled: isAuthenticated, // Only run query when authenticated
  });

  // Update payment status mutation - moved before early returns
  const updatePaymentMutation = useMutation({
    mutationFn: async (id_pembayaran: number) => {
      try {
        const response = await axios.put(
          "https://event-be-one.vercel.app/pembayaran/update-status",
          {
            id_pembayaran,
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Failed to update payment status"
          );
        }
        throw new Error("Failed to update payment status");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Status pembayaran berhasil diperbarui");
      setIsModalOpen(false);
      setSelectedPayment(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui status pembayaran");
    },
  });

  // Reject payment mutation
  const rejectPaymentMutation = useMutation({
    mutationFn: async (id_pembayaran: number) => {
      try {
        const response = await axios.put(
          "https://event-be-one.vercel.app/pembayaran/tolak",
          {
            id: id_pembayaran,
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message || "Gagal menolak pembayaran");
        }
        throw new Error("Gagal menolak pembayaran");
      }
    },
    onSuccess: () => {
      toast.success("Pembayaran berhasil ditolak");
      queryClient.invalidateQueries({ queryKey: ["paymentData"] });
      setIsModalOpen(false);
      setShowRejectConfirm(false);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Gagal menolak pembayaran");
      setShowRejectConfirm(false);
    },
  });

  // Approve refund mutation
  const approveRefundMutation = useMutation({
    mutationFn: async (refundId: number) => {
      const formData = new FormData();
      if (refundCatatanAdmin) {
        formData.append("catatan_admin", refundCatatanAdmin);
      }
      if (refundBuktiFile) {
        formData.append("bukti_refund", refundBuktiFile);
      }

      try {
        const response = await axios.post(
          `https://event-be-one.vercel.app/refund/update-status/${refundId}`,
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
          throw new Error(message || "Gagal menyetujui refund");
        }
        throw new Error("Gagal menyetujui refund");
      }
    },
    onSuccess: () => {
      toast.success("Refund berhasil disetujui");
      queryClient.invalidateQueries({ queryKey: ["paymentData"] });
      setIsRefundModalOpen(false);
      setRefundCatatanAdmin("");
      setRefundBuktiFile(null);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Gagal menyetujui refund");
    },
  });

  // Reject refund mutation
  const rejectRefundMutation = useMutation({
    mutationFn: async (refundId: number) => {
      const payload: { catatan_admin?: string } = {};
      if (refundCatatanAdmin) {
        payload.catatan_admin = refundCatatanAdmin;
      }

      try {
        const response = await axios.put(
          `https://event-be-one.vercel.app/refund/update-status-reject/${refundId}`,
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
          throw new Error(message || "Gagal menolak refund");
        }
        throw new Error("Gagal menolak refund");
      }
    },
    onSuccess: () => {
      toast.success("Refund berhasil ditolak");
      queryClient.invalidateQueries({ queryKey: ["paymentData"] });
      setIsRefundModalOpen(false);
      setRefundCatatanAdmin("");
      setRefundBuktiFile(null);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Gagal menolak refund");
    },
  });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vibrant-lime mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memverifikasi autentikasi...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, the hook will redirect automatically
  if (!isAuthenticated) {
    return null;
  }

  const handleViewPayment = (userData: UserData) => {
    setSelectedPayment(userData.pembayaran);
    setSelectedUserData(userData);
    setEditFormData(userData);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleViewRefund = (userData: UserData) => {
    setSelectedRefundData(userData.refunds[0]);
    setSelectedUserData(userData);
    setIsRefundModalOpen(true);
    setRefundCatatanAdmin("");
    setRefundBuktiFile(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditInputChange = (field: keyof UserData, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePreview = (imageSrc: string) => {
    setPreviewImageSrc(imageSrc);
    setImagePreviewOpen(true);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleSaveEdit = async () => {
    try {
      // Prepare the request body according to API specification
      const requestBody = {
        id: editFormData.id,
        nik: "",
        nama_lengkap: editFormData.nama_lengkap || "",
        email: editFormData.email || "",
        no_wa: editFormData.no_wa || "",
        alamat: editFormData.alamat || "",
        tanggal_lahir: editFormData.tanggal_lahir || "",
        kota_domisili: editFormData.kota_domisili || "",
        golongan_darah: editFormData.golongan_darah || "",
        no_kontak_darurat: editFormData.no_kontak_darurat || "",
        riwayat_penyakit: editFormData.riwayat_penyakit || "",
        location_race_pack: editFormData.location_race_pack || "",
      };

      console.log("Updating user data:", requestBody);

      // Make API call to update user data
      const response = await axios.put(
        "https://event-be-one.vercel.app/peserta/update-peserta",
        requestBody
      );

      if (response.data.status === 200) {
        toast.success("Data berhasil diperbarui!");
        setIsEditing(false);

        // Update local data
        if (selectedUserData) {
          setSelectedUserData({ ...selectedUserData, ...editFormData });
        }

        // Refresh data to get latest from server
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      } else {
        throw new Error(response.data.message || "Gagal memperbarui data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Gagal memperbarui data. Silakan coba lagi."
        );
      } else {
        toast.error("Gagal memperbarui data. Silakan coba lagi.");
      }
    }
  };

  const handleUpdatePaymentStatus = () => {
    if (selectedPayment) {
      updatePaymentMutation.mutate(selectedPayment.id);
    }
  };

  const handleRejectPayment = () => {
    setShowRejectConfirm(true);
  };

  const handleConfirmReject = () => {
    if (selectedPayment) {
      rejectPaymentMutation.mutate(selectedPayment.id);
      setShowRejectConfirm(false);
    }
  };

  const handleWhatsAppContact = (userData: UserData) => {
    // Use WhatsApp number from API
    let whatsappNumber: string;

    if (userData.no_wa) {
      // Ensure number starts with 62 (Indonesia country code)
      whatsappNumber = userData.no_wa.startsWith("08")
        ? "62" + userData.no_wa.substring(1)
        : userData.no_wa.startsWith("62")
        ? userData.no_wa
        : "62" + userData.no_wa;
    } else {
      // Fallback to dummy number
      whatsappNumber = "6289123456789";
    }

    const message =
      userData?.pembayaran?.status_pembayaran &&
      userData.pembayaran.bukti_pembayaran
        ? `Halo, ${userData.nama_lengkap}!
Saya dari Tim Admin Night Run Kejaksaan Negeri Jember.

Detail Pendaftaran Anda: 
ID Peserta: #${userData.id}
Nama: ${userData.nama_lengkap}
Kategori: ${userData.tipe}K
Jumlah: Rp ${userData.pembayaran.jumlah_pembayaran.toLocaleString("id-ID")}
Status: Lunas

Terima kasih! Pembayaran Anda sudah kami konfirmasi.         

PENGUMUMAN PENTING
Dengan penuh rasa hormat, kami informasikan bahwa pelaksanaan acara Adhyaksa Night Run DITUNDA hingga waktu yang akan diberitahukan kembali.

Keputusan ini diambil demi menjaga kenyamanan bersama, mengingat situasi saat ini yang belum sepenuhnya kondusif. Kesehatan, keamanan, dan kenyamanan seluruh peserta adalah prioritas utama.

Mari kita nantikan waktu terbaik untuk berlari dan merayakan kebersamaan dengan semangat yang sama.`
        : `Halo ${
            userData.nama_lengkap
          }! Saya dari Tim Admin Night Run Kejaksaan Negeri Jember.

Mengenai pembayaran pendaftaran Anda:
• ID Peserta: #${userData.id}
• Nama: ${userData.nama_lengkap}
• Kategori: ${userData.tipe}K
• Jumlah: Rp ${userData.pembayaran.jumlah_pembayaran.toLocaleString("id-ID")}
• Status: ${
            userData.pembayaran.status_pembayaran
              ? "Lunas"
              : userData.pembayaran.bukti_pembayaran
              ? "Menunggu Verifikasi"
              : "Belum Bayar"
          }

${
  userData.pembayaran.status_pembayaran
    ? "Terima kasih! Pembayaran Anda sudah dikonfirmasi.\nKami tunggu kehadiran Anda di acara Night Run! 🏃‍♂️ Salam olahraga! 💪"
    : userData.pembayaran.bukti_pembayaran
    ? "Terima kasih telah mengirimkan bukti pembayaran. Kami sedang memproses dan akan mengkonfirmasi pembayaran Anda segera. Mohon bersabar menunggu konfirmasi dari tim kami. 🙏"
    : `Maaf, pembayaran Anda belum kami terima. Mohon untuk melengkapi pembayaran melalui link berikut:

https://night-run.vercel.app/pembayaran/pendaftaran?id_pembayaran=${userData.pembayaran.id}&email=${userData.email}&category=${userData.tipe}

Jika sudah melakukan pembayaran, mohon kirimkan bukti pembayaran yang jelas. Jika ada kendala, silakan hubungi kami.

Terima kasih! 🙏`
}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  // Export participants data
  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get(
        "https://event-be-one.vercel.app/peserta/export",
        {
          responseType: "blob", // Important for file downloads
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Set filename - you can customize this based on response headers if available
      const contentDisposition = response.headers["content-disposition"];
      let filename = "participants_export.xlsx"; // default filename

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Data peserta berhasil diekspor!");
    } catch (error) {
      console.error("Export error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Gagal mengekspor data");
      } else {
        toast.error("Gagal mengekspor data");
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Calculate stats from payment data
  const stats = {
    total: paymentData?.length || 0,
    // Determine category based on tipe field
    fiveK: paymentData?.filter((item) => item.tipe === "5").length || 0,
    tenK: paymentData?.filter((item) => item.tipe === "10").length || 0,
    paid:
      paymentData?.filter((item) => item.pembayaran.status_pembayaran === true)
        .length || 0,
    pending:
      paymentData?.filter((item) => item.pembayaran.status_pembayaran === false)
        .length || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black">
                DASBOR <span className="text-vibrant-lime">ADMIN</span>
              </h1>
              {user && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selamat datang kembali, {user.name}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Loading state */}
        {(isPaymentLoading || isAnalyticsLoading) && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vibrant-lime"></div>
            <span className="ml-2 text-muted-foreground">Memuat data...</span>
          </div>
        )}

        {/* Error state */}
        {(error || analyticsError) && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">
              Gagal memuat data. Silakan coba lagi.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Registrations */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Pendaftaran
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </Card>

          {/* Approved Payments */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Approved
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData?.jumlahSuccessTransaksi || 0}
                </p>
              </div>
            </div>
          </Card>

          {/* Total Users (Participants) */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </Card>

          {/* Revenue */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.floor(
                    (analyticsData?.totalPendapatan?._sum?.jumlah_pembayaran ||
                      0) / 1000
                  )}
                  K
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Pelari 5K
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.fiveK}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Pelari 10K
                </p>
                <p className="text-3xl font-bold text-gray-900">{stats.tenK}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <X className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData?.jumlahPendingTransaksi || 0}
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* Export Section */}
        <Card className="mb-8 hover:scale-100 hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-vibrant-blue" />
              Ekspor Data Peserta
            </CardTitle>
            <CardDescription>
              Unduh daftar lengkap semua peserta terdaftar beserta detail
              pembayaran dalam format Excel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  Ekspor meliputi: Detail peserta, status pembayaran, tanggal
                  pendaftaran, dan informasi kategori
                </p>
                <p className="text-xs text-muted-foreground">
                  Format file: Excel (.xlsx) • Diperbarui secara real-time
                </p>
              </div>
              <Button
                onClick={handleExportData}
                disabled={isExporting || !isAuthenticated}
                className="lg:ml-4 lg:min-w-[140px] h-10"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Mengekspor...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Ekspor Data
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Catatan Pembayaran</CardTitle>
            <CardDescription>
              Daftar semua catatan pembayaran untuk acara lari
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[10px]">ID</TableHead>
                  <TableHead className="min-w-[120px]">Nama Peserta</TableHead>
                  <TableHead className="min-w-[80px]">Kategori</TableHead>
                  <TableHead className="min-w-[120px]">Jumlah</TableHead>
                  <TableHead className="min-w-[100px]">Metode</TableHead>
                  <TableHead className="min-w-[200px]">Status</TableHead>
                  <TableHead className="min-w-[140px]">
                    Tanggal Dibuat
                  </TableHead>
                  <TableHead className="min-w-[100px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData && paymentData.length > 0 ? (
                  paymentData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        #{item.pembayaran.id}
                      </TableCell>
                      <TableCell>{item.nama_lengkap}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.tipe === "5" ? "default" : "secondary"}
                        >
                          {item.tipe}K
                        </Badge>
                      </TableCell>
                      <TableCell>
                        Rp{" "}
                        {item.pembayaran.jumlah_pembayaran.toLocaleString(
                          "id-ID"
                        )}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.pembayaran.metode_pembayaran}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            item?.refunds.length > 0
                              ? "bg-purple-500"
                              : item.pembayaran.status_pembayaran
                              ? "bg-green-500"
                              : !item.pembayaran.status_pembayaran &&
                                item.pembayaran.bukti_pembayaran
                              ? "bg-gray-500"
                              : !item?.pembayaran.bukti_pembayaran
                              ? "bg-red-500"
                              : "flex items-center justify-center"
                          )}
                        >
                          {item?.refunds.length > 0 &&
                          item?.refunds[0]?.status == "PENDING"
                            ? "Perlu Approval Refund"
                            : item?.refunds.length > 0 &&
                              item?.refunds[0]?.status == "APPROVED"
                            ? "Sudah di Approve"
                            : item.pembayaran.status_pembayaran
                            ? "Lunas"
                            : item.pembayaran.bukti_pembayaran
                            ? "Menunggu Verifikasi"
                            : "Belum Bayar"}
                          {item?.refunds.length > 0 &&
                          item?.refunds[0]?.status == "PENDING" ? (
                            <CircleAlert className="ml-2" />
                          ) : item?.refunds.length > 0 &&
                            item?.refunds[0]?.status == "APPROVED" ? (
                            <Check className="ml-2" />
                          ) : (
                            <></>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(item.pembayaran.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            disabled={Number(item.no_wa) == 0}
                            variant="outline"
                            size="sm"
                            onClick={() => handleWhatsAppContact(item)}
                            className={cn(
                              Number(item.no_wa) === 0
                                ? "text-gray-600"
                                : "text-green-600 border-green-600 hover:bg-green-50"
                            )}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            WA
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewPayment(item)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Lihat
                          </Button>
                          {item?.refunds.length > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewRefund(item)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Refund
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-12 text-muted-foreground"
                    >
                      {isPaymentLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vibrant-lime mr-2"></div>
                          Memuat catatan pembayaran...
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mb-3">
                            <Users className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium mb-1">
                            Tidak ada catatan pembayaran ditemukan
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Catatan pembayaran akan muncul di sini setelah
                            peserta mulai mendaftar
                          </p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>Detail Peserta & Pembayaran</DialogTitle>
                  <DialogDescription>
                    {isEditing
                      ? "Edit data peserta"
                      : "Tinjau data peserta dan kelola pembayaran"}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {selectedUserData && (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                {/* User Data Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Data Peserta
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      {isEditing ? (
                        <Input
                          id="nama"
                          value={editFormData.nama_lengkap || ""}
                          onChange={(e) =>
                            handleEditInputChange(
                              "nama_lengkap",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">
                          {selectedUserData.nama_lengkap}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nik">NIK</Label>
                      {isEditing ? (
                        <Input
                          id="nik"
                          value={editFormData.nik || ""}
                          onChange={(e) =>
                            handleEditInputChange("nik", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{selectedUserData.nik}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editFormData.email || ""}
                          onChange={(e) =>
                            handleEditInputChange("email", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{selectedUserData.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="no_wa">No. WhatsApp</Label>
                      {isEditing ? (
                        <Input
                          id="no_wa"
                          value={editFormData.no_wa || ""}
                          onChange={(e) =>
                            handleEditInputChange("no_wa", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{selectedUserData.no_wa}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat</Label>
                      {isEditing ? (
                        <Input
                          id="alamat"
                          value={editFormData.alamat || ""}
                          onChange={(e) =>
                            handleEditInputChange("alamat", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">
                          {selectedUserData.alamat}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Tanggal Lahir</Label>
                      <p className="text-sm py-2">
                        {selectedUserData.tanggal_lahir}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Data Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Data Pembayaran
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        ID Pembayaran
                      </label>
                      <p className="text-sm">
                        {selectedUserData.pembayaran.id}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Kategori
                      </label>
                      <Badge variant="secondary">
                        {selectedUserData.tipe}K
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Jumlah
                      </label>
                      <p className="text-sm">
                        Rp{" "}
                        {selectedUserData.pembayaran.jumlah_pembayaran.toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Status
                      </label>
                      <Badge
                        variant={
                          selectedUserData.pembayaran.status_pembayaran
                            ? "default"
                            : selectedUserData.pembayaran.bukti_pembayaran
                            ? "secondary"
                            : "destructive"
                        }
                        className="ml-2"
                      >
                        {selectedUserData.pembayaran.status_pembayaran
                          ? "Lunas"
                          : selectedUserData.pembayaran.bukti_pembayaran
                          ? "Menunggu Verifikasi"
                          : "Belum Bayar"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Payment Proof Image */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Bukti Pembayaran
                  </label>
                  <div className="mt-2">
                    {selectedUserData.pembayaran.bukti_pembayaran ? (
                      <div className="relative">
                        <div
                          className="relative cursor-pointer group rounded-lg border overflow-hidden"
                          onClick={() =>
                            handleImagePreview(
                              selectedUserData.pembayaran.bukti_pembayaran
                            )
                          }
                        >
                          <img
                            src={selectedUserData.pembayaran.bukti_pembayaran}
                            alt="Bukti pembayaran"
                            className="w-full h-auto max-h-[300px] object-contain"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex items-center justify-center text-white">
                              <ZoomIn className="w-6 h-6 mr-2" />
                              <span>Preview</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <ZoomIn className="w-3 h-3" />
                          <span>
                            Klik gambar untuk preview dengan zoom lengkap
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                        <p className="text-muted-foreground text-sm">
                          Belum ada bukti pembayaran yang diunggah
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex gap-2 w-full justify-end">
              {isEditing ? (
                <>
                  <Button
                    className="h-10"
                    variant="outline"
                    onClick={handleEditToggle}
                  >
                    Batal
                  </Button>
                  <Button className="h-10" onClick={handleSaveEdit}>
                    Simpan Perubahan
                  </Button>
                </>
              ) : (
                <>
                  {selectedUserData &&
                    !selectedUserData.pembayaran.status_pembayaran &&
                    selectedUserData.pembayaran.bukti_pembayaran && (
                      <>
                        <Button
                          onClick={handleRejectPayment}
                          disabled={rejectPaymentMutation.isPending}
                          variant="destructive"
                          className="h-10"
                        >
                          {rejectPaymentMutation.isPending ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Menolak...
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Tolak Pembayaran
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={handleUpdatePaymentStatus}
                          disabled={updatePaymentMutation.isPending}
                          className="bg-vibrant-lime h-10 hover:scale-100 hover:bg-vibrant-lime/80"
                        >
                          {updatePaymentMutation.isPending ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Menyetujui...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Setujui Pembayaran
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  <Button
                    variant="outline"
                    className="h-10"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Tutup
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Custom Image Preview Dialog with Zoom */}
        <Dialog open={imagePreviewOpen} onOpenChange={setImagePreviewOpen}>
          <DialogContent className="max-w-6xl max-h-[95vh] p-0">
            <div className="relative w-full h-[90vh] overflow-hidden bg-black/5 rounded-lg">
              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 5}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleResetZoom}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
                onClick={() => setImagePreviewOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Zoom Level Indicator */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round(zoomLevel * 100)}%
                </div>
              </div>

              {/* Image Container */}
              <div
                className="w-full h-full flex items-center justify-center cursor-move overflow-hidden"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  cursor:
                    zoomLevel > 1
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                }}
              >
                <img
                  src={previewImageSrc}
                  alt="Preview bukti pembayaran"
                  className="max-w-none transition-transform duration-200 select-none"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${
                      imagePosition.x / zoomLevel
                    }px, ${imagePosition.y / zoomLevel}px)`,
                    maxHeight: zoomLevel <= 1 ? "80vh" : "none",
                    maxWidth: zoomLevel <= 1 ? "100%" : "none",
                  }}
                  draggable={false}
                />
              </div>

              {/* Instructions */}
              {zoomLevel > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white/90 px-3 py-2 rounded-lg text-xs text-center flex items-center gap-2">
                    <Move className="w-3 h-3" />
                    <span>Drag to pan • Scroll to zoom</span>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Refund Modal */}
        <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Detail Pengajuan Refund
              </DialogTitle>
              <DialogDescription>
                Informasi lengkap pengajuan refund dari peserta
              </DialogDescription>
            </DialogHeader>

            {selectedRefundData && selectedUserData && (
              <div className="space-y-6">
                {/* Refund Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-purple-800">
                      Informasi Refund
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">ID Refund:</span>
                        <span className="font-mono">
                          {selectedRefundData.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <Badge
                          variant={
                            selectedRefundData.status === "APPROVED"
                              ? "default"
                              : selectedRefundData.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedRefundData.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Jumlah Refund:</span>
                        <span className="font-semibold text-purple-700">
                          Rp{" "}
                          {selectedRefundData.jumlah_refund.toLocaleString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Tanggal Pengajuan:</span>
                        <span>
                          {new Date(
                            selectedRefundData.createdAt
                          ).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-purple-800">
                      Data Peserta
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Nama:</span>
                        <span>{selectedUserData.nama_lengkap}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">NIK:</span>
                        <span className="font-mono">
                          {selectedRefundData.nik}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>{selectedRefundData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">No. WhatsApp:</span>
                        <span>{selectedRefundData.no_wa}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refund Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-semibold">Alasan Refund</Label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm">{selectedRefundData.alasan}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Metode Refund</Label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm capitalize">
                          {selectedRefundData.metode_refund.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-semibold">
                        {selectedRefundData.metode_refund === "transfer_bank"
                          ? "Nama Bank"
                          : "Provider E-Wallet"}
                      </Label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm">
                          {selectedRefundData.nama_bank}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">
                        {selectedRefundData.metode_refund === "transfer_bank"
                          ? "No. Rekening"
                          : "No. HP/E-Wallet"}
                      </Label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-mono">
                          {selectedRefundData.no_rekening}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">
                      {selectedRefundData.metode_refund === "transfer_bank"
                        ? "Nama Pemilik Rekening"
                        : "Nama Penerima"}
                    </Label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm">
                        {selectedRefundData.nama_rekening}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                {selectedRefundData.status === "PENDING" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-lg text-blue-800">
                      Tindakan Admin
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="catatan_admin">
                          Catatan Admin (Opsional)
                        </Label>
                        <Textarea
                          id="catatan_admin"
                          value={refundCatatanAdmin}
                          onChange={(e) =>
                            setRefundCatatanAdmin(e.target.value)
                          }
                          placeholder="Tambahkan catatan untuk peserta..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bukti_refund">Bukti Refund *</Label>
                        <Input
                          id="bukti_refund"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setRefundBuktiFile(file);
                          }}
                          className="cursor-pointer file:cursor-pointer"
                        />
                        {refundBuktiFile && (
                          <p className="text-xs text-green-600">
                            ✓ File terpilih: {refundBuktiFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Existing Admin Notes */}
                {selectedRefundData.catatan_admin && (
                  <div className="space-y-2">
                    <Label className="font-semibold">Catatan Admin</Label>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm">
                        {selectedRefundData.catatan_admin}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="gap-2">
              {selectedRefundData?.status === "PENDING" && (
                <>
                  <Button
                    onClick={() =>
                      selectedRefundData &&
                      rejectRefundMutation.mutate(selectedRefundData.id)
                    }
                    disabled={
                      rejectRefundMutation.isPending ||
                      approveRefundMutation.isPending
                    }
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {rejectRefundMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Menolak...
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Tolak Refund
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() =>
                      selectedRefundData &&
                      approveRefundMutation.mutate(selectedRefundData.id)
                    }
                    disabled={
                      approveRefundMutation.isPending ||
                      rejectRefundMutation.isPending
                    }
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {approveRefundMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Menyetujui...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Setujui Refund
                      </>
                    )}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => setIsRefundModalOpen(false)}
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Confirmation Dialog */}
        <AlertDialog
          open={showRejectConfirm}
          onOpenChange={setShowRejectConfirm}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penolakan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menolak pembayaran ini? Tindakan ini
                tidak dapat dibatalkan dan peserta akan menerima notifikasi
                bahwa pembayaran mereka ditolak.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmReject}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Ya, Tolak Pembayaran
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
