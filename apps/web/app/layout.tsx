import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finances",
  description: "Finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
