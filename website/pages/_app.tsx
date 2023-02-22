import "../styles/globals.css";
import "../styles/headings.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import { MutableRefObject, useEffect, useState } from "react";
import GoogleAnalyticsBusiness from "../lib/business/google_analytics/google_analytics_business";
import React from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface AppContext {
  refNav?: MutableRefObject<HTMLDivElement | null>;
}

export const initialValue: AppContext = {};

export const AppContext = React.createContext<AppContext>(initialValue);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [supabaseClientState] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      GoogleAnalyticsBusiness.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClientState}
      initialSession={pageProps.initialSession}
    >
      <AppContext.Provider value={initialValue}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </SessionContextProvider>
  );
}
export default MyApp;
