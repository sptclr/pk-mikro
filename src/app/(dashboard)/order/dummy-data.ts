export type OrderData = {
  id: string;
  kalgenId: string;
  tglOrder: string;
  pasien: string;
  prioritas: string;
  dokter: string;
  lokasiLab: string;
  status: string;
};

export const dummyData: OrderData[] = [
  {
    id: "1",
    kalgenId: "A2501E0000068",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Ahmad",
    prioritas: "Cito",
    dokter: "Dr. Chanda Wic...",
    lokasiLab: "Lab PK",
    status: "Tervalidasi"
  },
  {
    id: "2",
    kalgenId: "A2501E0000067",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Waluyo",
    prioritas: "Rutin",
    dokter: "Dr. Salini Wong",
    lokasiLab: "Lab MB",
    status: "Draf"
  },
  {
    id: "3",
    kalgenId: "A2501E0000066",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Imam Malik",
    prioritas: "Rutin",
    dokter: "Dr. Chanda Wic...",
    lokasiLab: "Lab MB",
    status: "Batal Validasi"
  },
  {
    id: "4",
    kalgenId: "A2501E0000065",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Sintha Mulya",
    prioritas: "Cito",
    dokter: "Dr. Salini Wong",
    lokasiLab: "Lab MB",
    status: "Batal Validasi"
  },
  {
    id: "5",
    kalgenId: "A2501E0000064",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Attilah Yasmin",
    prioritas: "Rutin",
    dokter: "Dr. Contoh",
    lokasiLab: "Lab MB",
    status: "Selesai"
  },
  {
    id: "6",
    kalgenId: "A2501E0000063",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Santiago",
    prioritas: "Rutin",
    dokter: "Dr. Erlang Wijaya",
    lokasiLab: "Lab PK",
    status: "Draf"
  },
  {
    id: "7",
    kalgenId: "A2501E0000062",
    tglOrder: "08 Jan 2024 15:40 WIB",
    pasien: "Jajang Rahman",
    prioritas: "Cito",
    dokter: "Dr. Bobi Nasution",
    lokasiLab: "Lab PK",
    status: "Selesai"
  }
];

export const totalCount = 51;
