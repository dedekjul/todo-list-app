"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/state/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
