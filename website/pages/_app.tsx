import "../styles/globals.css";
import "../styles/headings.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import { MutableRefObject, useEffect, useState } from "react";
import GoogleAnalyticsService from "../lib/services/google_analytics/google_analytics_service";
import React from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Maintance from "./maintance";

interface AppContext {
  refNav?: MutableRefObject<HTMLDivElement | null>;
}

export const initialValue: AppContext = {};

export const AppContext = React.createContext<AppContext>(initialValue);

function MyApp({ Component, pageProps }: AppProps) {
  return <Maintance />;

  // const router = useRouter();
  // const [supabaseClientState] = useState(() => createBrowserSupabaseClient())

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     GoogleAnalyticsService.pageview(url);
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  // return (
  //   <SessionContextProvider
  //     supabaseClient={supabaseClientState}
  //     initialSession={pageProps.initialSession}
  //   >
  //     <AppContext.Provider value={initialValue}>
  //       <Component {...pageProps} />
  //     </AppContext.Provider>
  //   </SessionContextProvider>
  // );
}
export default MyApp;
