import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../shared/button";

interface Language {
  name: string;
  color: string;
}

interface CardRepositoryProps {
  className?: string;
  name: string;
  description: string | null;
  languages: Array<Language>;
  url: string;
}

export default function CardRepository({
  className,
  name,
  description,
  languages,
  url,
}: CardRepositoryProps) {
  return (
    <div
      className={`${className ?? ""} flex justify-center align-items-baseline`}
    >
      <div className="p-2 lg:p-4 border shadow-lg">
        <div className="">
          <h6 className="p-0">{name}</h6>
          <p className="py-3 px-0 text-justify">{description}</p>

          <div className="flex justify-between place-items-center">
            <div className="">
              {languages?.map((language, index) => (
                <div key={index} className="flex pb-1">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="p-1"
                    style={{
                      width: 1.5 + "rem",
                      height: 1.5 + "rem",
                      color: language.color,
                    }}
                  />

                  <span className="text-sm">{language.name}</span>
                </div>
              ))}
            </div>

            <a href={url} target="_blank" rel="noreferrer">
              <Button className="text-sm">Saber mais</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
