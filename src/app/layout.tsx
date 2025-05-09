import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/sonner";

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
          <Toaster />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
