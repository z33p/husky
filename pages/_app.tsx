import "../styles/custom.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import GoogleAnalyticsService from "../lib/services/google_analytics/google_analytics_service";
import AppContext, { initialValue } from "./context/app_context";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      GoogleAnalyticsService.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <AppContext.Provider value={initialValue}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
export default MyApp;
