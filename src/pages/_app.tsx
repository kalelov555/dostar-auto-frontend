import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const roboto = Poppins({
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <PrimeReactProvider>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </div>
  );
}
