import React from "react";
import GoogleAnalyticsService from "../lib/services/google_analytics/google_analytics_service";
import Section from "./section/section";
import Button from "./shared/button";

export default function Curriculum() {
  const googleAnalyticsBusiness = new GoogleAnalyticsService();

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
