import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Providers } from "./providers";
import Header from "./components/header/Header";
import { ConfigProvider, App } from 'antd'; 
import './globals.css';

export const metadata = {
  title: 'Dreams | Map Your Future',
  description: 'A place where your dreams take shape',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AntdRegistry>
          {/* 1. Redux Provider bütün tətbiqi əhatə etməlidir */}
          <Providers>
            {/* 2. ConfigProvider vizual sazlamalar üçün */}
            <ConfigProvider
              wave={{ disabled: true }}
              theme={{
                token: {
                  colorPrimary: '#000',
                },
              }}
            >
              {/* 3. Antd App komponenti bütün message/notification servislərini aktivləşdirir */}
              <App>
                <Header />
                <main className="min-h-screen">
                  {children}
                </main>
              </App>
            </ConfigProvider>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}