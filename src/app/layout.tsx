import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/app/ui/toaster"; // Added for contact form feedback

export const metadata: Metadata = {
  title: "Kirei House PH",
  description: "Experience slow, intentional living at Kirei House PH.",
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
          href="https://fonts.googleapis.com/css2?family=Hina+Mincho:wght@400&family=Montserrat:wght@100;200;300;400;500;600;700&family=Zen+Old+Mincho:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-luxury scroll-smooth bg-luxury-gradient-subtle">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
