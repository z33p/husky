import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./_footer";

interface Props {
  navHeight?: string | undefined;
  children: React.ReactNode;
}

const Layout = ({ children, navHeight }: Props) => {
  navHeight ??= 3.5 + "rem";

  const siteDescription = [
    "Meu nome é Raphael Fellipe e esse é meu site pessoal onde é possível ter um bom overview sobre quem sou e meus projetos.",
    "Além de ter acesso ao meu currículo e links de contato",
  ];

  return (
    <div className="">
      <Head>
        <title>z33p</title>
        <meta name="description" content={siteDescription.join(" ")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav
        id="layout-nav"
        style={{ height: navHeight }}
        className="navbar navbar-expand-lg justify-content-between navbar-dark bg-dark px-3"
      >
        <h2 className="">
          <a className="navbar-brand" href="#">
            Z33P
          </a>
        </h2>

        <div className="h-100">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active"></li>
              <li className="nav-item">
                <a className="nav-link" href="#about-me">
                  Sobre mim
                </a>
              </li>
              <li className="nav-item">
                <a href="#projects" className="nav-link">
                  Projetos
                </a>
              </li>
              <li className="nav-item">
                <a href="#curriculum" className="nav-link">
                  Currículo
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
