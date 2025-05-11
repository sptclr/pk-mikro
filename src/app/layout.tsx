import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "../styles/globals.css";
import { ToastProvider } from "@/components/Toast/ToastProvider";

const nunitoFont = Nunito({
  subsets: ["latin"],
  display: "swap",
});

// ✅ Favicon dan title sekarang otomatis masuk ke <head>
export const metadata: Metadata = {
  title: "Aplikasi PK - Mikrobiologi",
  description: "Anarya - QNP Team",
  icons: {
    icon: "/icons/favicon.png", // ✅ Tambahkan favicon di sini
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={nunitoFont.className} suppressHydrationWarning={true}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
