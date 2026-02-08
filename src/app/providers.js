"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider, App } from "antd";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ConfigProvider 
        // Wave effektini tamamilə söndürmək React 19 xətalarını kəsir
        wave={{ disabled: true }} 
        button={{ wave: { disabled: true } }}
        theme={{
          token: {
            colorPrimary: '#000',
          },
        }}
      >
        <App> 
          {/* Header və Children artıq buradakı App-dən asılı olacaq */}
          {children}
        </App>
      </ConfigProvider>
    </Provider>
  );
}