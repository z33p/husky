import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CardContactProps {
  name: string;
  icon: IconDefinition;
  url?: string;
  title?: string;
  iconClasses?: string;
  iconStyle?: React.CSSProperties;
}

export default function CardContact({
  name,
  icon,
  url,
  title,
  iconClasses,
  iconStyle,
}: CardContactProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-dark text-decoration-none"
      title={title}
      style={{ cursor: "pointer" }}
    >
      <div
        className={"p-4 border shadow"}
        onClick={(e) => console.log(e)}
        style={iconStyle}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`d-block p-2 ${iconClasses}`}
          style={{ width: 4.5 + "rem" }}
        />
        <span className="d-block text-center">{name}</span>
      </div>
    </a>
  );
}
