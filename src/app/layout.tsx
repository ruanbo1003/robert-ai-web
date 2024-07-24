import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/app/components/ReactQueryProvider"
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Robert AI",
  description: "Your SWE & AI tools",
  icons: {
      icon: '/icon.png'
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
          <ReactQueryProvider>
              <div id="root-layout" className="h-screen w-screen">
                  {/*<body className={inter.className}>*/}
                  {children}
              </div>
              <ToastContainer />
          </ReactQueryProvider>
      </body>
    </html>
  );
}
