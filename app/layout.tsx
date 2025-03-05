import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Atelier Frames - The World\'s First AI-Powered Art Frame',
  description: 'Museum-grade digital art frames that generate custom artwork using AI technology.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
