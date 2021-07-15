import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";

export default function ScrollBackToTop() {
  const [isHidden, setIsHidden] = useState(true);

  const scrollFunction = () => {
    const limitToAppear = 20;

    setIsHidden(
      !(
        document.body.scrollTop > limitToAppear ||
        document.documentElement.scrollTop > limitToAppear
      )
    );
  };

  useEffect(() => {
    window.onscroll = scrollFunction;
  }, []);

  if (isHidden) return null;

  const style: CSSProperties = {
    bottom: 20 + "px",
    right: 30 + "px",
    zIndex: 1030,
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: 1 + "rem",
  };

  const goBackTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <button
      onClick={goBackTop}
      style={style}
      title="Go to top"
      className="p-3 d-block position-fixed bg-primary text-white rounded-circle"
    >
      <FontAwesomeIcon icon={faArrowUp} style={{ width: 1.25 + "rem" }} />
    </button>
  );
}
