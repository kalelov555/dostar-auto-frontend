import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-image-gallery/styles/css/image-gallery.css";

const queryClient = new QueryClient();

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ToastContainer />
      <div className={font.className}>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <Component {...pageProps} />
          </PrimeReactProvider>
        </QueryClientProvider>
      </div>
    </StrictMode>
  );
}
