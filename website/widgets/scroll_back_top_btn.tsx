import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";

export function scrollBackTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export default function ScrollBackTopBtn() {
  const [isHidden, setIsHidden] = useState(true);

  const showBtnWhenHitScreenLimit = () => {
    const limitToAppear = 20;

    setIsHidden(
      !(
        document.body.scrollTop > limitToAppear ||
        document.documentElement.scrollTop > limitToAppear
      )
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      showBtnWhenHitScreenLimit();
    });
  }, []);

  if (isHidden) return null;

  const style: CSSProperties = {
    bottom: 20 + "px",
    right: 30 + "px",
    border: "none",
    outline: "none",
    fontSize: 1 + "rem",
    padding: 0.9 + "em",
  };

  return (
    <button
      onClick={scrollBackTop}
      style={style}
      title="Go to top"
      className="block fixed bg-primary text-white rounded-full cursor-pointer"
    >
      <FontAwesomeIcon icon={faArrowUp} style={{ width: 1.2 + "rem" }} />
    </button>
  );
}
