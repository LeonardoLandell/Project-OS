import type { Metadata } from "next";

import "@/styles/globals.css";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ProjectOS | Executive Project Intelligence",

  description: "CEO-grade project management workspace demo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}

        <Toaster richColors />
      </body>
    </html>
  );
}
