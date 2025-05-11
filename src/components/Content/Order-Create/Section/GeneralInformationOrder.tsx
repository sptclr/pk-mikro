/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Input from "@/components/Input/Input";
import SectionLayout from "@/components/Layouts/SectionLayout";
import Select from "@/components/Select/Select";
import TextArea from "@/components/Textarea/Textarea";
import { FormOrderFields } from "@/types/Order";

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Controller,
  Control,
} from "react-hook-form";
import {
  CustomerItem,
  LabLocationItem,
} from "@/app/(dashboard)/order/create/hooks/useFetchGeneralInformation";

type ApiDataItem = {
  data:
    | { value: string; label: string }[]
    | CustomerItem[]
    | LabLocationItem[]
    | undefined;
  isLoading: boolean;
  error: any;
  onSearchChange?: (value: string) => void;
};

type ApiDataState = {
  [key: string]: ApiDataItem;
};

type FormState = {
  register: UseFormRegister<FormOrderFields>;
  setValue: UseFormSetValue<FormOrderFields>;
  watch: UseFormWatch<FormOrderFields>;
  errors: FieldErrors<FormOrderFields>;
  control: Control<FormOrderFields>;
};

type GeneralInformationFormProps = {
  form: FormState;
  apiData: ApiDataState;
};

export const GeneralInformationOrder = ({
  form,
  apiData,
}: GeneralInformationFormProps) => {
  const { register, setValue, errors, watch, control } = form;

  // Definisikan label untuk setiap field
  const fieldLabels = {
    lab: "Lokasi Lab",
    pasien: "Jenis Pasien",
    asal: "Asal",
    dokter: "Dokter",
  };

  // Gunakan Object.keys untuk mendapatkan semua key dari apiData
  const selectFields = Object.keys(apiData)
    .filter((key) => key !== "prioritas") // <-- exclude 'prioritas'
    .map((key) => ({
      name: key,
      label: fieldLabels[key as keyof typeof fieldLabels],
      ...apiData[key],
    }));

  return (
    <SectionLayout>
      <h2 className="text-2xl font-bold text-anarya-title mb-6">
        Informasi Umum
      </h2>
      <div className="flex gap-11 mb-4">
        {/* left */}
        <div className="flex flex-col gap-4 w-1/2">
          {selectFields.map(
            ({ label, name, data, onSearchChange, isLoading, error }) => (
              <Controller
                key={name}
                name={name as keyof FormOrderFields}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      label={label}
                      required
                      options={data}
                      placeholder={`Choose ${label}`}
                      onSearchChange={onSearchChange}
                      value={field.value as any}
                      onChange={(val) => {
                        field.onChange(val);
                        setValue(name as keyof FormOrderFields, val);
                      }}
                      config={
                        name === "asal"
                          ? {
                              labelKey: "customer_name",
                              valueKey: "customer_code_innomaster",
                            }
                          : name === "lab"
                          ? {
                              labelKey: "location",
                              valueKey: "id",
                            }
                          : undefined
                      }
                      error={
                        errors[name as keyof FormOrderFields]?.message as string
                      }
                      maxDisplayOptions={7}
                      name={field.name}
                      ref={field.ref}
                      disabled={false}
                      isLoading={isLoading}
                      returnObject={name === "asal" || name === "lab"}
                    />
                    {error && (
                      <p className="text-red-500 text-sm ml-[184px] mt-1">
                        Error loading {label}
                      </p>
                    )}
                  </>
                )}
              />
            )
          )}
        </div>

        {/* right */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="w-full flex gap-[10px]">
            <label className="min-w-[174px] font-bold text-base">Status</label>
            <div className="bg-anarya-status-draft px-3 rounded-full text-white text-xs my-auto mr-auto py-1">
              Draf
            </div>
          </div>

          <Input
            {...register("kalgen_id")}
            label="Kalgen ID"
            disabled
            placeholder="-"
            error={errors.kalgen_id?.message}
            onChange={(e) => setValue("kalgen_id", e.target.value)}
          />

          <Controller
            name="tanggal_order"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Tanggal Order"
                disabled
                // placeholder="17 Feb 2025 15:00 WIB"
                error={errors.tanggal_order?.message}
              />
            )}
          />

          <Controller
            name="prioritas"
            control={control}
            render={({ field }) => (
              <Select
                label="Prioritas"
                required
                options={apiData["prioritas"].data}
                placeholder="Choose Priority"
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  setValue("prioritas", val);
                }}
                error={apiData["prioritas"].error}
                isLoading={apiData["prioritas"].isLoading}
                maxDisplayOptions={3}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </div>
      </div>

      <div>
        <Input
          {...register("antibiotik")}
          label={`Obat/Antibiotik \n 48 Jam Terakhir`}
          placeholder="Placeholder text"
          value={watch("antibiotik")}
          error={errors.antibiotik?.message}
          onChange={(val) => setValue("antibiotik", val.target.value)}
        />

        <TextArea
          {...register("keterangan_klinis")}
          label="Keterangan Klinis"
          placeholder="Placeholder text"
          value={watch("keterangan_klinis")}
          onChange={(val) => setValue("keterangan_klinis", val.target.value)}
          error={errors.keterangan_klinis?.message}
          rows={3}
        />
      </div>
    </SectionLayout>
  );
};
