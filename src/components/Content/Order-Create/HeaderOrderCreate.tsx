"use client";
import SectionLayout from "@/components/Layouts/SectionLayout";
import React from "react";
import Header from "@/components/Header/Header";
import Image from "next/image";

// Define the prop types for the component
type HeaderOrderCreateProps = {
  onSubmit: () => Promise<void | null>; // Function that returns a Promise or void
  isSubmitting: boolean; // Boolean to track submission state
  isValid: boolean;
};

const HeaderOrderCreate: React.FC<HeaderOrderCreateProps> = ({
  onSubmit,
  isValid,
  isSubmitting,
}) => {
  return (
    <SectionLayout>
      <Header>
        <Header.Info>
          <Header.Breadcrumb paths={["Order", "Buat Order Baru"]} />
          <Header.UserIcon />
        </Header.Info>

        <Header.Separator />

        <Header.Actions>
          <Header.Actions gap="gap-2">
            <Header.Button
              disableVariant
              className="text-white bg-anarya-btn-success/30 "
            >
              <Image
                src={"/icons/icon-billing-w.png"}
                alt="icon billing white"
                width={20}
                height={20}
              />
              Print Barcode
            </Header.Button>
            <Header.Button
              disableVariant
              className="text-white bg-gradient-green opacity-30"
            >
              <Image
                src={"/icons/icon-check-circle-w.png"}
                alt="icon check circle white"
                width={20}
                height={20}
              />
              Verifikasi
            </Header.Button>
          </Header.Actions>
          <Header.Actions gap="gap-2">
            <Header.Button variant="danger">Batalkan</Header.Button>
            <Header.Button
              variant="success"
              onClick={onSubmit}
              disabled={isValid}
            >
              {isSubmitting ? "Loading..." : "Simpan Order"}
            </Header.Button>
          </Header.Actions>
        </Header.Actions>
      </Header>
    </SectionLayout>
  );
};

export default HeaderOrderCreate;
