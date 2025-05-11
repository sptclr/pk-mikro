/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useOrderForm.ts
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormOrderFields, OrderSchema } from "@/types/Order";
import {
  useClinicianSearch,
  useCustomerSearch,
  CustomerItem,
  usePrioTypes,
  useLabLocations,
  usePatientTypes,
} from "./useFetchGeneralInformation";
import { useToast } from "@/components/Toast/ToastProvider";
import { formatToday } from "@/utils";
import { usePatientSearch } from "./usePatientSearch";
import { useTestPackageSearch } from "./useFetchTest";
// Add the updated form schema with the new location ID fields


export const useOrderForm = () => {
  const { showToast } = useToast();

  // Default form values - now including location IDs
  const defaultValues = {
    // General Information
    lab: {},
    antibiotik: "",
    asal: {}, // Initial default value for asal ID
    pasien: "",
    dokter: "",
    prioritas: "",
    tanggal_order: formatToday().toString(),

    // pasien
    nama_pasien: "",
    id_pasien: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    no_rm: "",
    no_ktp: "",
    alamat_ktp: "",
    passport: "",
    file_input: null,

    // Added fields to match PatientOrder component
    // Original string values (for display)
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    domisili: "",

    // New ID fields (for relationships/lookups)
    provinsi_id: "",
    kota_id: "",
    kecamatan_id: "",
    kelurahan_id: "",

    // Test
    test: [],
    priceTest: [],
  };

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormOrderFields>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(OrderSchema),
  });

  // fetch without search
  const priority = usePrioTypes();
  const labLocations = useLabLocations();
  const patientType = usePatientTypes();

  // fetch Use all search hooks
  const customer = useCustomerSearch();
  const clinician = useClinicianSearch();
  const patient = usePatientSearch();
  const test = useTestPackageSearch();

  // Create a collection of all search providers
  const searchProviders = {
    customer,
    clinician,
    patient,
    test,
  };

  // Generic function to handle any search change
  const handleSearchChange = (
    provider: keyof typeof searchProviders,
    value: string
  ) => {
    console.log("value", value);
    if (value && value.trim() !== "") {
      // Call the appropriate setSearch function
      searchProviders[provider].setSearchTerm(value);
    }
  };

  const handleCustomerSelect = (selectedOption: any) => {
    if (selectedOption) {
      // Set the customer ID
      setValue("asal", selectedOption.value);

      // Find the full customer object data in the raw data
      const customerData = customer.rawData?.find(
        (item: CustomerItem) =>
          item.customer_code_innomaster === selectedOption.value
      );

      // Set the full customer object
      if (customerData) {
        setValue("asal", customerData as any);

        // Clear the test and priceTest arrays when customer changes
        setValue("test", []);
        setValue("priceTest", []);
      }
    }
  };

  // Enhanced function to handle patient selection
  const handlePatientSelect = (selectedOption: any) => {
    if (selectedOption.patientData) {
      // Fill in all the patient form fields
      const data = selectedOption.patientData;

      // Map the location IDs from patient data if available
      const locationIds = {
        provinsi_id: data.provinsi_id || "",
        kota_id: data.kota_id || "",
        kecamatan_id: data.kecamatan_id || "",
        kelurahan_id: data.kelurahan_id || "",
      };

      // First set all regular fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          !key.includes("_id") // Skip _id fields, we'll handle them separately
        ) {
          setValue(key as keyof FormOrderFields, value as any);
        }
      });

      // Then handle ID fields for locations
      if (locationIds.provinsi_id) {
        setValue("provinsi_id", locationIds.provinsi_id);
        // The display name will be set by the Select component effects
      }

      // Only set city if province is set
      if (locationIds.provinsi_id && locationIds.kota_id) {
        setValue("kota_id", locationIds.kota_id);
      }

      // Only set district if city is set
      if (locationIds.kota_id && locationIds.kecamatan_id) {
        setValue("kecamatan_id", locationIds.kecamatan_id);
      }

      // Only set subdistrict if district is set
      if (locationIds.kecamatan_id && locationIds.kelurahan_id) {
        setValue("kelurahan_id", locationIds.kelurahan_id);
      }
    }
  };

  // Form submission handler
  const onSubmit: SubmitHandler<FormOrderFields> = async (data) => {
    try {
      console.log("Form submitted with data:", data);
      console.log("Customer full data:", data.asal);
      // Here you would add your API call to submit the form data
      // For example: await api.submitOrder(data);

      showToast("Order created successfully", "success");
      return data;
    } catch (error) {
      console.error("Form submission failed:", error);
      showToast("Failed to create order", "error");
      throw error;
    }
  };

  // Centralized submit handler that can be called from the page component
  const submitForm = async () => {
    try {
      const result = await handleSubmit(onSubmit)();
      return result;
    } catch (error) {
      console.error("Form submission failed:", error);
      if (errors.root?.message) {
        showToast(errors.root.message, "error");
      }
      return null;
    }
  };

  return {
    form: {
      register,
      handleSubmit,
      setValue,
      watch,
      control,
      getValues,
      errors,
      isSubmitting,
      isValid,
      onSubmit,
      submitForm, // Expose the new centralized submit handler
    },
    apiData: {
      lab: {
        data: labLocations.labLocationOptions,
        isLoading: labLocations.isLoading,
        error: labLocations.error,
      },
      pasien: {
        data: patientType.patientTypeOptions,
        isLoading: patientType.isLoading,
        error: patientType.error,
      },
      prioritas: {
        data: priority.prioTypeOptions,
        isLoading: priority.isLoading,
        error: priority.error,
      },
      asal: {
        data: customer.rawData,
        isLoading: customer.isLoading,
        error: customer.error,
        onSearchChange: (value: string) =>
          handleSearchChange("customer", value),
        rawData: customer.rawData,
        handleSelect: handleCustomerSelect,
      },
      dokter: {
        data: clinician.options,
        isLoading: clinician.isLoading,
        error: clinician.error,
        onSearchChange: (value: string) =>
          handleSearchChange("clinician", value),
      },
      patient: {
        options: patient.options,
        isLoading: patient.isLoading,
        error: patient.error,
        handleSearchChange: (value: string) =>
          handleSearchChange("patient", value),
        handleSelect: handlePatientSelect,
      },
      test: {
        options: test.options,
        isLoading: test.isLoading,
        rawData: test.rawData,
        error: test.error,
        handleSearchChange: (value: string) =>
          handleSearchChange("test", value),
      },
    },
  };
};
