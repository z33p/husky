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
      className="p-4 bg-white text-black cursor-pointer"
      title={title}
    >
      <div
        className="p-3 border shadow-lg flex flex-col items-center"
        style={iconStyle}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`block p-2 m-0 ${iconClasses ?? ""}`}
          style={{ width: 4.5 + "rem" }}
        />
        <span className="block text-center">{name}</span>
      </div>
    </a>
  );
}
