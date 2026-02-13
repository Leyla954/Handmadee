import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Providers } from "./providers";
import Header from "./components/header/Header";
import './globals.css';

export const metadata = {
  title: 'Dreams | Map Your Future',
  description: 'A place where your dreams take shape',
};

export default function RootLayout({ children }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className="antialiased">
        <AntdRegistry>
          {/* Bütün konfiqurasiyalar Providers-in içindədir */}
          <Providers>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}