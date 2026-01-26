import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from './constants';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  themeColor: '#0A0F1C',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Yash Kumar Lal Das',
              jobTitle: 'Cloud & DevOps Engineer',
              url: SITE_URL,
              sameAs: [
                'https://github.com/YashKumarLalDas',
                'http://www.linkedin.com/in/laldasyash',
              ],
              knowsAbout: [
                'AWS',
                'Cloud Architecture',
                'DevOps',
                'Infrastructure as Code',
                'CI/CD',
                'Cloud Security',
                'Automation'
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0A0F1C] text-gray-200">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
