import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

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
    <div className={`${className ?? ""} d-flex justify-content-center align-items-baseline`}>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text" style={{ textAlign: "justify" }}>
            {description}
          </p>

          <div className="row">
            <div className="col-6">
              {languages?.map((language, index) => (
                <h6 key={index} className="mb-2 text-muted d-flex">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="pt-1"
                    style={{
                      width: 1.1 + "rem",
                      height: 1.1 + "rem",
                      color: language.color,
                    }}
                  />
                  <span>{language.name}</span>
                </h6>
              ))}
            </div>
            <div className="col-6">
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <a
                  href={url}
                  target="_blank"
                  className="btn btn-primary"
                  rel="noreferrer"
                >
                  Saber mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
