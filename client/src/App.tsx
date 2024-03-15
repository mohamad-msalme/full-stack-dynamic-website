import React from "react";
import "@src/index.css";
import { Toaster } from "./components/ui/sonner";
import { ReactRouterProvider } from "@providers/ReactRouterProvider";
import { ReactQueryProvider } from "@providers/ReactQueryProvider";
export const App: React.FC = () => {
  return (
    <ReactQueryProvider>
      <ReactRouterProvider />
      <Toaster position="top-center" />
    </ReactQueryProvider>
  );
};
