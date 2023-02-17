import React from "react";
import GoogleAnalyticsBusiness from "../lib/business/google_analytics/google_analytics_business";
import Section from "./section/section";
import Button from "./shared/button";

export default function Curriculum() {
  const googleAnalyticsBusiness = new GoogleAnalyticsBusiness();

  return (
    <Section id="curriculum" title="Currículo" className="pb-6" applyDivider>
      <div>
        <div className="px-24 py-12 md:px-32 md:py-16 border shadow">
          <Button>
            <a
              href="/curriculo.pdf"
              target="_blank"
              className=""
              rel="noreferrer"
              onClick={() => googleAnalyticsBusiness.triggerDownloadCurriculum()}
            >
              Abrir PDF
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
