import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Apa saja yang termasuk dalam biaya pendaftaran?",
      answer:
        "Biaya pendaftaran mencakup jersey eksklusif event, nomor BIB (bahan Albatros + peniti), akses water station sesuai kategori, refreshment di garis finish, dan medali untuk finisher pertama (300 orang untuk 5K dan 200 orang untuk 10K).",
    },
    {
      question: "Kapan periode pendaftaran Night Run 2025?",
      answer:
        "Pendaftaran dibuka mulai 1 Agustus 2025 dan ditutup pada 5 September 2025, atau lebih cepat jika kuota terpenuhi.",
    },
    {
      question: "Bagaimana cara mendaftar?",
      answer:
        "Kunjungi landing page resmi Night Run Kejaksaan Negeri Jember, isi formulir pendaftaran, lakukan pembayaran via Virtual Account, dan konfirmasi pembayaran akan dikirimkan via email. E-ticket akan dikirim ke WhatsApp Anda.",
    },
    {
      question: "Kapan dan di mana pengambilan Race Pack?",
      answer:
        "Race Pack dapat diambil pada 4-5 September 2025 pukul 10.00 - 20.00 WIB di Kantor Kejaksaan Negeri Jember atau Cafe Kopi Naga 99. Harap membawa fotokopi KTP/identitas, e-ticket, dan surat pernyataan sehat. Jika diwakilkan, sertakan surat kuasa.",
    },
    {
      question: "Apakah jersey bisa ditukar jika ukurannya tidak pas?",
      answer:
        "Tidak, jersey yang sudah diterima tidak dapat ditukar. Jersey yang diberikan adalah ukuran All Size",
    },
    {
      question: "Apakah ada batasan usia peserta?",
      answer:
        "Tidak ada batasan usia spesifik, namun peserta harus dalam kondisi sehat jasmani dan rohani. Anak-anak dianjurkan didampingi oleh orang tua atau wali.",
    },
    {
      question: "Apa yang terjadi jika hujan saat event?",
      answer:
        "Event akan tetap berjalan meskipun hujan. Namun, jika cuaca ekstrem membahayakan keselamatan peserta, panitia dapat menunda atau membatalkan acara.",
    },
    {
      question: "Fasilitas apa saja yang tersedia di rute lari?",
      answer:
        "Tersedia water station di pertengahan dan garis finish untuk 5K dan 10K, medical team, refreshment di garis finish, photobooth, dan hiburan di panggung utama.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          FREQUENTLY ASKED <span className="text-vibrant-lime">QUESTIONS</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl px-6"
            >
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
