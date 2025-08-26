const RegistrationDetailsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          REGISTRATION <span className="text-vibrant-lime">DETAILS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                Cara & Periode Pendaftaran
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Daftar melalui landing page resmi yang telah disediakan.
                </li>
                <li>
                  Pendaftaran dibuka 1 Agustus 2025, ditutup 5 September 2025.
                </li>
              </ul>
            </div>

            <div className="p-6 bg-background rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Alur Pendaftaran</h3>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>
                  Kunjungi website resmi “Night Run Kejaksaan Negeri Jember”.
                </li>
                <li>Isi data pribadi pada formulir yang tersedia.</li>
                <li>Lakukan pembayaran melalui Virtual Account.</li>
                <li>Konfirmasi pembayaran akan dikirim melalui email.</li>
                <li>E-Ticket akan dikirimkan melalui Whatsapp.</li>
              </ol>
            </div>

            <div className="p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Biaya Pendaftaran</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>5K senilai Rp 160.000,-</li>
                <li>10K senilai Rp 180.000,-</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-background rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Race Pack</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>No BIB</li>
                <li>Jersey</li>
              </ul>
            </div>

            <div className="p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Race Pack Collection</h3>
              <p className="text-muted-foreground">
                Tanggal 4-5 September 2025, bertempat di Kantor Kejaksaan dan
                Cafe Kopi Naga 99, Jam 10.00 - 20.00 WIB
              </p>
            </div>

            <div className="p-6 bg-background rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                Persyaratan Pengambilan
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Sesuaikan jadwal dan venue pengambilan RPC.</li>
                <li>Wajib menyertakan FC KTP/ identitas yang masih berlaku.</li>
                <li>Wajib menunjukkan e-ticket yang dikirimkan oleh tim.</li>
                <li>
                  Wajib menyertakan surat kuasa (jika pengambilan RPC
                  diwakilkan).
                </li>
              </ul>
            </div>

            <div className="p-6 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Catatan</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Jersey tidak bisa ditukar.</li>
                <li>Jersey diberikan ukuran All Size.</li>
                <li>Cek nama dan nomor BIB.</li>
                <li>Cek kelengkapan Race Pack.</li>
                <li>
                  Biaya pemulihan kesehatan runner ditanggung masing-masing.
                </li>
              </ul>
            </div>

            <div className="p-6 bg-background rounded-2xl">
              <h3 className="text-xl font-bold mb-3">
                Refreshment & Water Station
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  All finisher berhak mendapatkan refreshment (produk sponsor,
                  Isotonik, Buah/ Snack, Air Mineral, dll).
                </li>
                <li>
                  Water Station:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      5K: 2 Water Station, di pertengahan dan garis finish.
                    </li>
                    <li>
                      10K: 2 Water Station, di pertengahan dan garis finish.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationDetailsSection;
