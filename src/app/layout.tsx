import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // Added for contact form feedback

export const metadata: Metadata = {
  title: "Kirei Homestay",
  description: "Experience slow, intentional living at Kirei Homestay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hina+Mincho&family=Montserrat:wght@100;400;500;700&family=Zen+Old+Mincho:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
