import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'SSL Certificate Comparison - Find the Best SSL for Your Website',
  description: 'Compare SSL certificates from top providers like Sectigo, DigiCert, GlobalSign, and more. Find the perfect SSL certificate for your needs.',
  keywords: 'SSL certificate, HTTPS, DV SSL, OV SSL, EV SSL, certificate comparison',
  authors: [{ name: 'SSL Certificate Comparison' }],
  openGraph: {
    title: 'SSL Certificate Comparison',
    description: 'Compare SSL certificates from top providers.',
    url: 'https://ssl-certificate-comparison.com',
    siteName: 'SSL Certificate Comparison',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSL Certificate Comparison',
    description: 'Compare SSL certificates from top providers.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ssl-certificate-comparison.com" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
