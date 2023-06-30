"use client";

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body>
        <Provider>
          <ThemeProvider attribute="class">
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
