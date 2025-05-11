import SectionLayout from "@/components/Layouts/SectionLayout";
import React from "react";
import Header from "@/components/Header/Header";
import { IconBarcode } from "@/components/Icons";

interface HeaderOrderProps {
  createBtn: () => void;
}

const HeaderOrder = ({ createBtn }: HeaderOrderProps) => {
  return (
    <SectionLayout>
      <Header>
        <Header.Info>
          <Header.Breadcrumb paths={["Order", "Test"]} />
          <Header.UserIcon />
        </Header.Info>

        <Header.Separator />

        <Header.Actions>
          <Header.Button>
            <IconBarcode onlyIcon width={30} height={30} />
            Print Barcode
          </Header.Button>
          <Header.Button variant="success" onClick={createBtn}>
            + Buat Baru
          </Header.Button>
        </Header.Actions>
      </Header>
    </SectionLayout>
  );
};

export default HeaderOrder;
