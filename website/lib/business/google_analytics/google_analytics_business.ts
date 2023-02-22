import { CustomEvents } from "./ga_events";

export default class GoogleAnalyticsBusiness {
    public static GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
    public static pageview(url: string) {
        const gtagConfig: Gtag.CustomParams = {
            page_path: url,
        };

        window?.gtag("config", GoogleAnalyticsBusiness.GA_TRACKING_ID, gtagConfig)
    }

    // https://developers.google.com/analytics/devguides/collection/gtagjs/events
    private triggerEvent(eventName: CustomEvents | string, event: Gtag.EventParams) {
        window?.gtag("event", eventName, event)
    }

    public triggerDownloadCurriculum() {
        this.triggerEvent("curriculum_download", {
            event_category: "file",
        })
    }
}
