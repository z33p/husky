import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./_footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="">
    <Head>
      <title>z33p</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav id="layout-nav" className="navbar navbar-expand-lg justify-content-between navbar-dark bg-dark px-3">
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
            <li className="nav-item active">
              <Link href="/" passHref>
                <a className="nav-link" href="#">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/AboutMe" passHref>
                <a className="nav-link" href="#">
                  Sobre mim
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" passHref>
                <a className="nav-link" href="#">
                  Currículo
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#contato" className="nav-link">
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {children}

    <Footer />
  </div>
);

export default Layout;
