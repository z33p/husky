import React from "react";
import GoogleAnalyticsService from "../lib/services/google_analytics/google_analytics_service";
import Section from "./section";

export default function Curriculum() {
  const googleAnalyticsService = new GoogleAnalyticsService();

  return (
    <Section id="curriculum" title="Currículo" applyDivider>
      <div className="row justify-content-center pb-5">
        <div
          className="bg-white col-md-4 border shadow"
          style={{ width: 20 + "em", height: 10 + "em" }}
        >
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <a
              href="/curriculo.pdf"
              target="_blank"
              className="btn btn-outline-primary"
              rel="noreferrer"
              onClick={() => googleAnalyticsService.triggerDownloadCurriculum()}
            >
              Abrir PDF
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
