"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider, App } from "antd";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ConfigProvider 
        // Ant Design 5.x üçün dalğa effektini tam söndürmək qaydası
        wave={{ disabled: true }} 
        theme={{
          token: {
            colorPrimary: '#000', // Sənin seçdiyin əsas rəng
            borderRadius: 4,      // Opsional: Daha müasir görünüş üçün
          },
        }}
      >
        {/* Antd App komponenti mesaj, bildiriş və dialoqların (modal) 
            düzgün işləməsi üçün lazımdır */}
        <App> 
          {children}
        </App>
      </ConfigProvider>
    </Provider>
  );
}