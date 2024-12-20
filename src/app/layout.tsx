import type {Metadata} from "next";

// font
import {Noto_Sans_KR} from "next/font/google";

// style
import "./globals.css";

// context
import {AuroraBackgroundProvider} from "@/components/context/AuroraBackgroundProvider";
import SmoothScrollProvider from "@/components/context/SmoothScrollProvider";
import {ThemeProvider} from "@/components/context/theme-provider";
import {ClientProvider} from "@/components/context/ClientProvider";
import {QueryProvider} from "./../components/context/QueryProvider";
import AuthProvider from "@/components/context/AuthProvider";

// components
import {Toaster} from "@/components/ui/toaster";

// constants
import {baseDomain, baseTitle, baseDescription, baseKeywords} from "@/lib/constants/metaData";

export const metadata: Metadata = {
  metadataBase: new URL(baseDomain),
  title: baseTitle,
  description: baseDescription,
  keywords: baseKeywords.split(", "),
  openGraph: {
    title: baseTitle,
    description: baseDescription,
    siteName: "Wearther",
    // images: ["https://www.wearther.com/images/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: baseTitle,
    description: baseDescription,
    // images: ["https://www.wearther.com/images/twitter-image.png"],
  },
};

const noto_sans_kr = Noto_Sans_KR({subsets: ["latin"]});

// 이거 없으면 빌드 시 static route돼서 같은 시간만 주구장창 나옴
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${noto_sans_kr.className} antialiased`}>
        <ThemeProvider attribute="class" enableSystem={true}>
          <QueryProvider>
            <ClientProvider>
              <AuthProvider>
                <SmoothScrollProvider />
                <AuroraBackgroundProvider>{children}</AuroraBackgroundProvider>
                <Toaster />
              </AuthProvider>
            </ClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
