import React from "react";
import Layout from "./_layout";
import Banner from "./_banner";

export default function index() {
  const navHeight = 3.5 + "rem";

  return (
    <Layout navHeight={navHeight}>
      <Banner style={{ height: `calc(100vh - ${navHeight})` }} />
    </Layout>
  );
}
