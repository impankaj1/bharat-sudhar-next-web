import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Bharat Sudhar",
  description: "A platform for civic issue reporting and tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` min-h-screen bg-background font-sans antialiased`}>
        <TooltipProvider>
          <AuthProvider>
            <ToastContainer position="top-center" />
            {children}
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
