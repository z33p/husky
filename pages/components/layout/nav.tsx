import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/app_context";
import { scrollBackTop } from "../scroll_back_top_btn";
import NavLink from "./nav_link";

export default function Nav() {
  const appContext = useContext(AppContext);

  const [isNavBgTransparent, setIsNavBgTransparent] = useState(true);

  const navOpaqueWhenHitScreenLimit = useCallback(() => {
    if (!appContext.refNav?.current) return;

    const limitToAppear =
      window.innerHeight - appContext.refNav.current.offsetHeight - 20;

    setIsNavBgTransparent(
      !(
        document.body.scrollTop > limitToAppear ||
        document.documentElement.scrollTop > limitToAppear
      )
    );
  }, [appContext.refNav]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      navOpaqueWhenHitScreenLimit();
    });
  }, [navOpaqueWhenHitScreenLimit]);

  appContext.refNav = useRef<HTMLDivElement>(null);

  return (
    <nav
      id="layout-nav"
      style={{
        zIndex: 1050,
        backgroundColor: isNavBgTransparent ? "rgba(0, 0, 0, 0)" : "black",
      }}
      className="w-100 navbar navbar-dark navbar-expand-lg justify-content-between px-3 position-fixed"
      ref={appContext.refNav}
    >
      <h2 className="">
        <span className="navbar-brand p-2" style={{ cursor: "pointer" }} onClick={scrollBackTop}>
          Z33P
        </span>
      </h2>

      <div className="">
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
            <NavLink
              name="Sobre mim"
              linkToScroll="#about-me"
              refNav={appContext.refNav}
              active
            />
            <NavLink
              name="Portfólio"
              linkToScroll="#portfolio"
              refNav={appContext.refNav}
            />
            <NavLink
              name="Contato"
              linkToScroll="#contact"
              refNav={appContext.refNav}
            />
            <NavLink
              name="Currículo"
              linkToScroll="#curriculum"
              refNav={appContext.refNav}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
