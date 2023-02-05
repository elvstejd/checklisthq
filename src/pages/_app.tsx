import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { Inter } from "@next/font/google";
import "sal.js/dist/sal.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
