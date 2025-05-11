// types/Order.ts
import { z } from "zod";

const PriceMasterTestSchema = z.object({
  item_code: z.string(),
  TI_CODE: z.string(),
  TI_NAME: z.string(),
  TI_OTHER_CODE: z.string(),
  TI_OTHER_NAME: z.string(),
  LAB_CODE: z.string(),
  PRICE_GROUP_CODE: z.string(),
  TI_CATEGORY: z.string(),
  TI_ORDER_ENABLE: z.string(),
  TI_DATA_TYPE: z.string(),
  TI_TEST_GRP: z.string(),
  TI_SUB_GRP: z.string().nullable(),
  TI_UNIT: z.string(),
  TI_SPL_TYPE: z.string(),
  K1: z.string(),
  K2: z.string(),
  K3: z.string(),
  K4: z.string(),
  TI_ANZ_ORDER: z.string().nullable(),
  status: z.string(),
  status_desc: z.string(),
  is_deleted: z.number(),
});

// Lab schema
const LabSchema = z.object({
  id: z.string(),
  created_at: z.string(), // ISO date string
  updated_at: z.string(),
  deleted_at: z.nullable(z.string()), // nullable string
  created_by: z.nullable(z.string()),
  updated_by: z.nullable(z.string()),
  location: z.string(),
  code: z.string(),
  is_active: z.boolean(),
});

// CustomerItem schema for bundleAsal
const CustomerItemSchema = z.object({
  customer_name: z.string(),
  customer_code: z.string().optional(),
  group_price: z.string().optional(),
  customer_code_innomaster: z.string().optional(),
});

// Define the test item schema
const TestItemSchema = z.object({
  item_code: z.string(),
  item_name: z.string(),
  lis_code: z.string().optional(),
  detail_item: z
    .array(
      z.object({
        item_code: z.string(),
        item_name: z.string(),
      })
    )
    .optional(),
  count_detail: z.number().optional(),
});

// Order schema
export const OrderSchema = z.object({
  // Required Fields
  lab: LabSchema.refine(
    (obj) => Object.values(obj).some((val) => val !== undefined && val !== ""),
    {
      message: "Lab location is required",
    }
  ),
  pasien: z.string().min(1, "Patient type is required"),
  asal: CustomerItemSchema.refine(
    (obj) => Object.values(obj).some((val) => val !== undefined && val !== ""),
    {
      message: "Customer source is required",
    }
  ),
  dokter: z.string().min(1, "Doctor is required"),
  prioritas: z.string().min(1, "Priority is required"),
  nama_pasien: z.string().min(1, "Patient name is required"),
  tanggal_lahir: z.string().min(1, "Date of birth is required"),
  test: z.array(TestItemSchema).min(1, "At least one test is required"),
  priceTest: z.array(PriceMasterTestSchema).min(1, "Test pricing is required"),

  // Optional Fields
  antibiotik: z.string().optional(),
  // bundleAsal: CustomerItemSchema.optional(),
  tanggal_order: z.string().optional(),
  kalgen_id: z.string().optional(),
  keterangan_klinis: z.string().optional(),
  id_pasien: z.string().optional(),
  jenis_kelamin: z.string().optional(),
  no_rm: z.string().optional(),
  no_ktp: z.string().optional(),
  alamat_ktp: z.string().optional(),
  passport: z.string().optional(),
  file_input: z
    .custom<File | null>(
      (val) => {
        if (typeof window === "undefined") return true;
        return val === null || val instanceof File;
      },
      {
        message: "File must be a valid image file",
      }
    )
    .nullable()
    .optional(),
  kelurahan: z.string().optional(),
  kecamatan: z.string().optional(),
  kota: z.string().optional(),
  provinsi: z.string().optional(),
  domisili: z.string().optional(),
  sample: z.string().optional(),
  asal_jaringan: z.string().optional(),
  jumlah_slide: z.string().optional(),

  // Add the new location ID fields
  provinsi_id: z.string().optional(),
  kota_id: z.string().optional(),
  kecamatan_id: z.string().optional(),
  kelurahan_id: z.string().optional(),
});

// Define the type from the schema
export type FormOrderFields = z.infer<typeof OrderSchema>;
