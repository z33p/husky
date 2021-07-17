import React from "react";
import AboutMe from "../widgets/about_me";
import Contact from "../widgets/contact/contact";
import Curriculum from "../widgets/curriculum";
import Banner from "../widgets/layout/banner";
import Layout from "../widgets/layout/layout";
import Portfolio from "../widgets/portifolio/portfolio";

export default function index() {
  return (
    <Layout>
      <Banner />
      <AboutMe />
      <Portfolio />
      <Contact />
      <Curriculum />
    </Layout>
  );
}
