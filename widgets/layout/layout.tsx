import React from "react";
import Head from "next/head";
import ScrollBackTopBtn from "../scroll_back_top_btn";
import Nav from "./nav";
import GoogleAnalyticsService from "../../lib/services/google_analytics/google_analytics_service";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const siteDescription =
    "Meu nome é Raphael Fellipe e esse é meu site pessoal onde é possível ter um bom overview sobre quem sou e meus projetos.";

  return (
    <div className="">
      <Head>
        <title>z33p</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsService.GA_TRACKING_ID}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GoogleAnalyticsService.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>

      <Nav />

      <main>{children}</main>

      <Footer />

      <ScrollBackTopBtn />
    </div>
  );
};

export default Layout;
