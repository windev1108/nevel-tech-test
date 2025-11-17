import type { Metadata, Viewport } from "next";
import "../globals.css";
import { siteConfig } from "@/config/site";
import { fontSans, fontSerif } from "@/assets/font";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import Providers from "../providers";


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.appUrl),
  title: siteConfig.name,
  description: siteConfig.description,
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: [],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    images: [siteConfig.ogImage],
    description: siteConfig.description,
    title: {
      default: siteConfig.name,
      template: `${siteConfig.name} - %s`,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.name}`,
  },
};

export const viewport: Viewport = {
  width: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    // { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params
  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          fontSans.variable,
          fontSerif.variable
        )}
        data-testid='app-body'
      >
        {/* Critical: CSS custom properties needed for layout */}
        {/* <RealViewport /> */}
        <div data-testid='app-container' className='flex min-h-screen flex-col'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
