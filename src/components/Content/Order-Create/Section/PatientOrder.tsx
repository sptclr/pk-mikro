/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Input from "@/components/Input/Input";
import InputAutocomplete from "@/components/InputAutoComplete/InputAutoComplete";
import InputDate from "@/components/InputDate/InputDate";
import InputFile from "@/components/InputFile/InputFile";
import SectionLayout from "@/components/Layouts/SectionLayout";
import Select from "@/components/Select/Select";
import TextArea from "@/components/Textarea/Textarea";

import { FormOrderFields } from "@/types/Order";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  useCitySearch,
  useDistrictSearch,
  useProvinceSearch,
  useSubdistrictSearch,
} from "@/app/(dashboard)/order/create/hooks/useFetchLocations";

type PatientFormProps = {
  register: UseFormRegister<FormOrderFields>;
  setValue: UseFormSetValue<FormOrderFields>;
  watch: UseFormWatch<FormOrderFields>;
  errors: FieldErrors<FormOrderFields>;
  control: Control<FormOrderFields>;
  patientSearch?: {
    options: any[];
    isLoading: boolean;
    error: any;
    handleSearchChange: (value: string) => void;
    handleSelect: (option: any) => void;
  };
  locationData?: {
    provinceId?: string | null;
    cityId?: string | null;
    districtId?: string | null;
    subdistrictId?: string | null;
  };
};

export const PatientOrder = ({
  register,
  setValue,
  errors,
  watch,
  control,
  patientSearch,
  locationData,
}: PatientFormProps) => {
  // Watch for location IDs to create dependency chains
  const provinceId = watch("provinsi_id");
  const cityId = watch("kota_id");
  const districtId = watch("kecamatan_id");

  // Use the location search hooks
  const province = useProvinceSearch();
  const city = useCitySearch(provinceId);
  const district = useDistrictSearch(cityId);
  const subdistrict = useSubdistrictSearch(districtId);

  // Update display values when we get the actual names
  useEffect(() => {
    if (provinceId && province.rawData) {
      const selectedProvince = province.rawData.find(
        (item) => item.id === provinceId
      );
      if (selectedProvince) {
        setValue("provinsi", selectedProvince.name);
      }
    }
  }, [provinceId, province.rawData, setValue]);

  useEffect(() => {
    if (cityId && city.rawData) {
      const selectedCity = city.rawData.find((item) => item.id === cityId);
      if (selectedCity) {
        setValue("kota", selectedCity.name);
      }
    }
  }, [cityId, city.rawData, setValue]);

  useEffect(() => {
    if (districtId && district.rawData) {
      const selectedDistrict = district.rawData.find(
        (item) => item.id === districtId
      );
      if (selectedDistrict) {
        setValue("kecamatan", selectedDistrict.name);
      }
    }
  }, [districtId, district.rawData, setValue]);

  useEffect(() => {
    if (watch("kelurahan_id") && subdistrict.rawData) {
      const selectedSubdistrict = subdistrict.rawData.find(
        (item) => item.id === watch("kelurahan_id")
      );
      if (selectedSubdistrict) {
        setValue("kelurahan", selectedSubdistrict.name);
      }
    }
  }, [watch("kelurahan_id"), subdistrict.rawData, setValue]);

  return (
    <SectionLayout>
      <h2 className="text-2xl font-bold text-anarya-title mb-6">
        Informasi Pasien
      </h2>

      <div className="flex gap-11 mb-4">
        {/* left */}
        <div className="flex flex-col gap-4 w-1/2">
          {patientSearch ? (
            <InputAutocomplete
              label="Nama"
              required
              placeholder="Cari nama pasien..."
              value={watch("nama_pasien")}
              onSearchChange={patientSearch.handleSearchChange}
              onOptionSelect={patientSearch.handleSelect}
              options={patientSearch.options}
              isLoading={patientSearch.isLoading}
              error={errors.nama_pasien?.message ?? undefined}
            />
          ) : (
            <Input
              {...register("nama_pasien")}
              label="Nama"
              required
              placeholder="Nama Pasien"
              value={watch("nama_pasien")}
              onChange={(val) => setValue("nama_pasien", val.target.value)}
              error={errors.nama_pasien?.message ?? undefined}
            />
          )}

          <Input
            {...register("id_pasien")}
            label="ID Pasien"
            disabled
            placeholder="-"
            value={watch("id_pasien")}
            onChange={(val) => setValue("id_pasien", val.target.value)}
            error={errors.id_pasien?.message ?? undefined}
          />

          <InputDate
            label="Tanggal Lahir"
            name="tanggal_lahir"
            value={watch("tanggal_lahir") || ""}
            onChange={(val) => setValue("tanggal_lahir", val)}
            // Memastikan nilai disimpan dalam format DD-MM-YYYY
            valueFormat="dd-MM-yyyy"
            required
            control={control}
            error={errors.tanggal_lahir?.message ?? undefined}
          />

          <Select
            {...register("jenis_kelamin")}
            label="Jenis Kelamin"
            options={["L", "P"].map((val) => ({
              value: val,
              label: val === "L" ? "Pria" : "Wanita",
            }))}
            placeholder="Pilih Jenis Kelamin"
            value={watch("jenis_kelamin")}
            maxDisplayOptions={3}
            onChange={(val) => setValue("jenis_kelamin", val)}
          />

          <Input
            {...register("no_rm")}
            label="No. RM"
            placeholder="0123456789"
            value={watch("no_rm")}
            onChange={(val) => setValue("no_rm", val.target.value)}
            error={errors.no_rm?.message ?? undefined}
          />
        </div>

        {/* right */}
        <div className="flex flex-col gap-4 w-1/2">
          <Input
            {...register("no_ktp")}
            label="No. KTP"
            placeholder="Nomor KTP"
            value={watch("no_ktp")}
            onChange={(val) => setValue("no_ktp", val.target.value)}
            error={errors.no_ktp?.message ?? undefined}
          />

          <TextArea
            {...register("alamat_ktp")}
            label="Alamat KTP"
            placeholder="Placeholder text"
            value={watch("alamat_ktp")}
            onChange={(val) => setValue("alamat_ktp", val.target.value)}
            rows={4}
            error={errors.alamat_ktp?.message ?? undefined}
          />

          <Input
            {...register("passport")}
            label="Passport"
            placeholder="Nomor Passport"
            value={watch("passport")}
            onChange={(val) => setValue("passport", val.target.value)}
            error={errors.passport?.message ?? undefined}
          />

          <InputFile
            label="File Input"
            onChange={(file) => setValue("file_input", file)}
            error={errors.file_input?.message ?? undefined}
          />
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex gap-11 mb-4">
        {/* left */}
        <div className="flex flex-col gap-4 w-1/2">
          {/* Provinsi - Select instead of Input */}
          <Select
            {...register("provinsi_id")}
            label="Provinsi"
            placeholder="Pilih Provinsi"
            options={province.options}
            value={watch("provinsi_id")}
            onChange={(val) => {
              setValue("provinsi_id", val);
              // Reset child selects when parent changes
              setValue("kota_id", "");
              setValue("kecamatan_id", "");
              setValue("kelurahan_id", "");
              setValue("kota", "");
              setValue("kecamatan", "");
              setValue("kelurahan", "");
            }}
            isLoading={province.isLoading}
            error={errors.provinsi?.message ?? undefined}
          />

          {/* Kota/Kabupaten - Select instead of Input */}
          <Select
            {...register("kota_id")}
            label="Kabupaten/Kota"
            placeholder="Pilih Kabupaten/Kota"
            options={city.options}
            value={watch("kota_id")}
            onChange={(val) => {
              setValue("kota_id", val);
              // Reset child selects when parent changes
              setValue("kecamatan_id", "");
              setValue("kelurahan_id", "");
              setValue("kecamatan", "");
              setValue("kelurahan", "");
            }}
            disabled={!provinceId}
            isLoading={city.isLoading}
            error={errors.kota?.message ?? undefined}
          />
        </div>
        {/* right */}
        <div className="flex flex-col gap-4 w-1/2">
          {/* Kecamatan - Select instead of Input */}
          <Select
            {...register("kecamatan_id")}
            label="Kecamatan"
            placeholder="Pilih Kecamatan"
            options={district.options}
            value={watch("kecamatan_id")}
            onChange={(val) => {
              setValue("kecamatan_id", val);
              // Reset child select when parent changes
              setValue("kelurahan_id", "");
              setValue("kelurahan", "");
            }}
            disabled={!cityId}
            isLoading={district.isLoading}
            error={errors.kecamatan?.message ?? undefined}
          />

          {/* Kelurahan - Select instead of Input */}
          <Select
            {...register("kelurahan_id")}
            label="Kelurahan"
            placeholder="Pilih Kelurahan"
            options={subdistrict.options}
            value={watch("kelurahan_id")}
            onChange={(val) => setValue("kelurahan_id", val)}
            disabled={!districtId}
            isLoading={subdistrict.isLoading}
            error={errors.kelurahan?.message ?? undefined}
          />
        </div>
      </div>
      <TextArea
        {...register("domisili")}
        label="Alamat Domisili"
        placeholder="Placeholder text"
        value={watch("domisili")}
        onChange={(val: any) => setValue("domisili", val.target.value)}
        rows={4}
        error={errors.domisili?.message ?? undefined}
      />
    </SectionLayout>
  );
};
