/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseISO, isValid, format } from "date-fns";

/**
 * Helper function untuk menggabungkan class Tailwind dengan optimal.
 * clsx digunakan untuk conditional class, sedangkan twMerge untuk menghapus duplikasi.
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

export const formatTglOrder = (tglOrder: string | null | undefined) => {
  if (!tglOrder) return ""; // Kembalikan object kosong

  // Pecah tanggal dan waktu dari format "08 Jan 2024 15:40"
  const datePart = tglOrder.substring(0, 11); // "08 Jan 2024"
  const timePart = tglOrder.substring(12); // "15:40"

  return `${datePart}\n${timePart}`; // Menggunakan newline (\n)
};

export function formatToday(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}

export function convertDateToDDMMYYYY(dateString: string): string {
  try {
    const parsedDate = parseISO(dateString); // parse ISO string
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd-MM-yyyy"); // format ke dd-MM-yyyy
    } else {
      // Kalau tidak valid, return hari ini
      return format(new Date(), "dd-MM-yyyy");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Kalau error saat parsing, juga return hari ini
    return format(new Date(), "dd-MM-yyyy");
  }
}
export function transformToSubmitTransaksi(data: any): any {
  return {
    feeder_id: "", // Asumsikan id_pasien sebagai feeder_id
    lab_loc_id: data?.lab,
    patient_type: data?.pasien, // Static value, bisa diubah jika perlu
    customer_id: data?.asal || "",
    clinician_id: data?.dokter || "",
    status_order: "draf", // Static value
    priority: data?.prioritas,
    medicine48h: data?.antibiotik || "",
    clinical_notes: data?.keterangan_klinis || "",
    id_patient: data?.id_pasien || "",
    payer: "", // Tidak tersedia, isi dengan default
    invoice_address: data?.alamat_ktp || "",
    notes: "",
    outsource: "", // Tidak tersedia, isi dengan default
    pa_number: "", // Tidak tersedia
  };
}
