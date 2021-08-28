import React from "react";

interface Props {
  name: string;
  linkToScroll: string;
  refNav: React.MutableRefObject<HTMLDivElement | null>;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  active?: boolean;
}

export default function NavLink({
  name,
  linkToScroll,
  setIsCollapsed,
  refNav,
  active,
}: Props) {
  const scrollToCorrespondingDiv = () => {
    setTimeout(() => {
      const el = document.getElementById(linkToScroll.split("#")[1]);

      if (!el || !refNav.current) return;

      const elRect = el.getBoundingClientRect();
      const scrollToY = window.scrollY + elRect.y - refNav.current.offsetHeight;

      window.scroll(elRect.x, scrollToY);
    }, 200);
  };

  const onClickLink = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsCollapsed(true);
    scrollToCorrespondingDiv();
  };

  return (
    <li className={`${active ? "active" : ""}`}>
      <a className="text-base hover:underline " href={linkToScroll} onClick={onClickLink}>
        {name}
      </a>
    </li>
  );
}
