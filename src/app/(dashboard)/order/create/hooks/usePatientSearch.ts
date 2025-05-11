/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/usePatientSearch.ts
"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { usePatients } from "./useFetchPatient"; // Gunakan hook usePatients yang sudah ada
import { convertDateToDDMMYYYY } from "@/utils";

export const usePatientSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearchTerm] = useDebounce(inputValue, 300);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Kita akan menggunakan lazy loading dengan hook usePatients yang sudah ada
  // Buat state untuk melacak apakah kita perlu menampilkan hasil pencarian
  const [shouldShowResults, setShouldShowResults] = useState(false);

  // Panggil hook usePatients yang sudah ada
  const { patientOptions, isLoading, error } = usePatients();

  // Handle direct search term changes
  const setSearchTerm = (term: string) => {
    setInputValue(term);

    // Aktifkan pencarian hanya ketika term tidak kosong
    if (term && term.trim() !== "") {
      setShouldShowResults(true);
      setIsFiltering(true);
    } else {
      setShouldShowResults(false);
      setFilteredOptions([]);
    }
  };

  // Filter options berdasarkan search term
  useEffect(() => {
    if (!shouldShowResults) {
      setFilteredOptions([]);
      return;
    }

    if (!patientOptions || patientOptions.length === 0) {
      setFilteredOptions([]);
      setIsFiltering(false);
      return;
    }

    if (!debouncedSearchTerm) {
      setFilteredOptions([]);
      setIsFiltering(false);
      return;
    }

    // Mulai filtering jika sudah ada data pasien
    setIsFiltering(true);
    const filtered = patientOptions.filter((patient) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      // Filter by name, ID, or any other relevant field
      return (
        patient.name?.toLowerCase().includes(searchLower) ||
        patient.id?.toLowerCase().includes(searchLower) ||
        patient.no_rm?.toLowerCase().includes(searchLower) ||
        patient.nama?.toLowerCase().includes(searchLower)
      );
    });

    setFilteredOptions(filtered.slice(0, 10)); // Limit to 10 results
    setIsFiltering(false);
  }, [debouncedSearchTerm, patientOptions, shouldShowResults]);

  // Transform patients to autocomplete options
  const options = filteredOptions.map((patient) => ({
    id: patient.id,
    label: patient.nama || patient.name, // Main display text
    value: patient.id,
    description: `${convertDateToDDMMYYYY(patient.birthdate) || ""} | ${
      patient.gender || ""
    }`, // Subtext
    // Include all patient data for later use
    patientData: {
      id_pasien: patient.id,
      nama_pasien: patient.nama || patient.name,
      tanggal_lahir: convertDateToDDMMYYYY(patient.birthdate),
      jenis_kelamin: patient.gender,
      no_rm: patient.rm_number,
      no_ktp: patient.nik_number,
      alamat_ktp: patient.nik_address,
      passport: patient.passport_number,
      kelurahan: patient.patient_subdistrict,
      kecamatan: patient.patient_district,
      kota: patient.patient_city,
      provinsi: patient.patient_province,
      domisili: patient.domisili_address,
    },
  }));

  return {
    options,
    isLoading: isLoading || isFiltering,
    error,
    setSearchTerm,
    inputValue,
  };
};
