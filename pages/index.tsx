import React from "react";
import Layout from "./components/layout/layout";
import AboutMe from "./_aboutMe";
import Banner from "./_banner";
import Portfolio from "./_portfolio";
import Contact from "./_contact";
import Curriculum from "./_curriculum";

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
