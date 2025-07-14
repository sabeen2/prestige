import React from "react";
import { ThemeProvider } from "./theme-providers";
import AdsProvider from "./ads-provider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdsProvider>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
      {children}
      {/* </ThemeProvider> */}
    </AdsProvider>
  );
};

export default AppProvider;
