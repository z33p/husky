import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { scrollBackTop } from "../scroll_back_top_btn";
import { AppContext } from "../../pages/_app";
import NavLink from "./nav_link";

export default function Nav() {
  const appContext = useContext(AppContext);

  const [isCollapsed, setIsCollapsed] = useState(true);
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
      setIsCollapsed(true);
      navOpaqueWhenHitScreenLimit();
    });
  }, [navOpaqueWhenHitScreenLimit]);

  appContext.refNav = useRef<HTMLDivElement>(null);

  const [navHeight, setNavHeight] = useState(0);

  const resizeBlurBg = useCallback(() => {
    if (!appContext.refNav?.current) return;

    setNavHeight(appContext.refNav.current.offsetHeight);
  }, [appContext.refNav]);

  useEffect(() => {
    resizeBlurBg();
  }, [resizeBlurBg, isCollapsed]);

  return (
    <React.Fragment>
      <div
        className="fixed top-0 w-full"
        style={{
          backgroundColor: isNavBgTransparent
            ? "rgba(0, 0, 0, 0)"
            : "rgba(0, 0, 0, 0.45)",
          height: navHeight + "px",
        }}
      />

      <nav
        id="layout-nav"
        style={{
          zIndex: 1050,
          backgroundColor:
            isNavBgTransparent && isCollapsed ? "rgba(0, 0, 0, 0)" : "black",
        }}
        className="flex justify-between fixed top-0 w-full px-10 text-white"
        ref={appContext.refNav}
      >
        <h6
          className="p-2 font-semibold cursor-pointer"
          onClick={scrollBackTop}
        >
          Z33P
        </h6>

        {/* <button
          className=""
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            resizeBlurBg();
          }}
        >
          <span className="navbar-toggler-icon" />
        </button> */}

        <div
          id="navbar"
          className={`w-3/5 lg:w-2/5 ${isCollapsed ? "" : "show"}`}
        >
          <ul className="h-full hidden sm:flex justify-around place-items-center">
            <NavLink
              name="Sobre mim"
              linkToScroll="#about-me"
              refNav={appContext.refNav}
              setIsCollapsed={setIsCollapsed}
            />
            <NavLink
              name="Portfólio"
              linkToScroll="#portfolio"
              refNav={appContext.refNav}
              setIsCollapsed={setIsCollapsed}
            />
            <NavLink
              name="Contato"
              linkToScroll="#contact"
              refNav={appContext.refNav}
              setIsCollapsed={setIsCollapsed}
            />
            <NavLink
              name="Currículo"
              linkToScroll="#curriculum"
              refNav={appContext.refNav}
              setIsCollapsed={setIsCollapsed}
            />
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}
