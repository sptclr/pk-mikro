"use client";

import React, { lazy, Suspense } from "react";
import HeaderOrderCreate from "@/components/Content/Order-Create/HeaderOrderCreate";
import { withProtected } from "@/components/HOC/WithProtected";
import { useOrderForm } from "./hooks/useOrderForm";
import { TestPack } from "./hooks/useFetchTest";

// Lazy load dengan destructuring untuk named exports
const GeneralInformationOrder = lazy(() =>
  import(
    "@/components/Content/Order-Create/Section/GeneralInformationOrder"
  ).then((module) => ({ default: module.GeneralInformationOrder }))
);

const PatientOrder = lazy(() =>
  import("@/components/Content/Order-Create/Section/PatientOrder").then(
    (module) => ({ default: module.PatientOrder })
  )
);

// TestOrder sepertinya sudah menggunakan default export
const TestOrder = lazy(
  () => import("@/components/Content/Order-Create/Section/TestOrder")
);

// Komponen loading sederhana
const LoadingFallback = () => <div className="p-4">Loading...</div>;

// Sisa kode sama seperti sebelumnya

const OrderCreatePage = () => {
  const { form, apiData } = useOrderForm();

  console.log("form isvalid", form.isValid);

  return (
    <>
      <HeaderOrderCreate
        onSubmit={form.submitForm}
        isSubmitting={form.isSubmitting}
        isValid={!form.isValid}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.submitForm();
        }}
        className="flex flex-col gap-6"
      >
        <Suspense fallback={<LoadingFallback />}>
          <GeneralInformationOrder
            form={{
              register: form.register,
              setValue: form.setValue,
              watch: form.watch,
              control: form.control,
              errors: form.errors,
            }}
            apiData={{
              lab: apiData.lab,
              pasien: apiData.pasien,
              prioritas: apiData.prioritas,
              asal: apiData.asal,
              dokter: apiData.dokter,
            }}
          />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <PatientOrder
            register={form.register}
            setValue={form.setValue}
            control={form.control}
            watch={form.watch}
            errors={form.errors}
            patientSearch={apiData.patient}
          />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TestOrder
            tests={apiData.test.rawData as TestPack[]}
            testSearch={apiData.test.handleSearchChange}
            register={form.register}
            setValue={form.setValue}
            watch={form.watch}
            errors={form.errors}
          />
        </Suspense>
      </form>
    </>
  );
};

export default withProtected(OrderCreatePage);
