import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DentalFlow AI",
  description: "AI рецепционист за стоматологични клиники",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
