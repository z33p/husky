import React from "react";
import Section from "./components/_section";
import * as gtag from "../lib/gtag"

export default function Curriculum() {
  return (
    <Section id="curriculum" title="Currículo" applyDivider>
      <div className="row justify-content-center pb-5">
        <div
          className="col-md-4 border"
          style={{ width: 20 + "em", height: 10 + "em" }}
        >
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <a
              href="/curriculo.pdf"
              target="_blank"
              className="btn btn-outline-primary"
              rel="noreferrer"
              onClick={() => {
                gtag.event({
                  action: "curriculum_download",
                  category: "file",
                  label: "Curriculum downloaded",
                  value: "Opening curriculum"
                })
              }}
            >
              Abrir PDF
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
