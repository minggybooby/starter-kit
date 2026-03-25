import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { QueryProvider } from "@/components/layout/query-provider";
import { Toaster } from "@/components/ui/sonner";

const nanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  variable: "--font-nanum-gothic",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "일정 관리",
  description: "Next.js 기반 일정 관리 웹 스타터킷",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${nanumGothic.variable} h-full antialiased`}
    >
      <body className={`${nanumGothic.className} min-h-full flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
