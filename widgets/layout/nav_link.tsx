import React from "react";

interface Props {
  name: string;
  linkToScroll: string;
  refNav: React.MutableRefObject<HTMLDivElement | null>;
  active?: boolean;
}

export default function NavLink({ name, linkToScroll, active, refNav }: Props) {
  const scrollToCorrespondingDiv = (e: React.MouseEvent) => {
    e.preventDefault();

    const el = document.getElementById(linkToScroll.split("#")[1]);

    if (!el || !refNav.current) return;

    const elRect = el.getBoundingClientRect();
    window.scroll(elRect.x, window.scrollY + elRect.y - refNav.current.offsetHeight);
  };

  return (
    <li className={`nav-item ${active ? "active" : ""}`}>
      <a
        className="nav-link"
        href={linkToScroll}
        onClick={scrollToCorrespondingDiv}
      >
        {name}
      </a>
    </li>
  );
}
