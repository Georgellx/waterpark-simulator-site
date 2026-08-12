"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  analyticsConsentStorageKey,
  type AnalyticsConsentState,
} from "@/lib/analytics-consent";

const consentChangeEvent = "waterpark:analytics-consent-change";
const settingsOpenEvent = "waterpark:open-analytics-settings";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): AnalyticsConsentState {
  try {
    const value = window.localStorage.getItem(analyticsConsentStorageKey);
    return value === "accepted" || value === "declined" ? value : "unset";
  } catch {
    return "unset";
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === analyticsConsentStorageKey) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(consentChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(consentChangeEvent, onStoreChange);
  };
}

function saveConsent(value: Exclude<AnalyticsConsentState, "unset">) {
  try {
    window.localStorage.setItem(analyticsConsentStorageKey, value);
  } catch {
    // The in-memory choice still applies for this page if storage is unavailable.
  }
  window.dispatchEvent(new Event(consentChangeEvent));
}

interface AnalyticsConsentProps {
  measurementId?: string;
}

export function AnalyticsConsent({ measurementId }: AnalyticsConsentProps) {
  const pathname = usePathname();
  const storedConsent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    () => "unset",
  );
  const [sessionConsent, setSessionConsent] =
    useState<AnalyticsConsentState>("unset");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsReady, setAnalyticsReady] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const consent =
    sessionConsent === "unset" ? storedConsent : sessionConsent;

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(settingsOpenEvent, openSettings);
    return () => window.removeEventListener(settingsOpenEvent, openSettings);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!settingsOpen || !dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [settingsOpen]);

  useEffect(() => {
    if (
      consent !== "accepted" ||
      !analyticsReady ||
      !measurementId ||
      !window.gtag
    ) {
      return;
    }

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [analyticsReady, consent, measurementId, pathname]);

  const chooseConsent = (value: Exclude<AnalyticsConsentState, "unset">) => {
    const analyticsWasLoaded = consent === "accepted";
    setSessionConsent(value);
    saveConsent(value);
    setSettingsOpen(false);

    if (value === "declined" && analyticsWasLoaded) {
      window.location.reload();
    }
  };

  const handleAnalyticsReady = () => {
    if (!measurementId) {
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    setAnalyticsReady(true);
  };

  return (
    <>
      {consent === "accepted" && measurementId ? (
        <Script
          id="waterpark-ga4"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
          strategy="afterInteractive"
          onReady={handleAnalyticsReady}
        />
      ) : null}

      {consent === "unset" && !settingsOpen ? (
        <section
          className="consent-banner"
          aria-label="Analytics choices"
          aria-live="polite"
        >
          <div>
            <strong>Choose whether to share analytics</strong>
            <p>
              We only load Google Analytics after you accept. Declining does
              not limit the guides.
            </p>
          </div>
          <div className="consent-actions">
            <button
              className="consent-button consent-button-secondary"
              type="button"
              onClick={() => chooseConsent("declined")}
            >
              Decline
            </button>
            <button
              className="consent-button consent-button-primary"
              type="button"
              onClick={() => chooseConsent("accepted")}
            >
              Accept
            </button>
          </div>
        </section>
      ) : null}

      {settingsOpen ? (
        <dialog
          className="consent-dialog"
          ref={dialogRef}
          aria-labelledby="analytics-settings-title"
          onCancel={() => setSettingsOpen(false)}
        >
          <section>
            <p className="eyebrow">Privacy control</p>
            <h2 id="analytics-settings-title">Analytics settings</h2>
            <p>
              Google Analytics loads only when your choice is Accept. You can
              change this choice at any time.
            </p>
            <p className="consent-current-choice">
              Current choice: <strong>{consent}</strong>
            </p>
            <div className="consent-actions">
              <button
                className="consent-button consent-button-secondary"
                type="button"
                onClick={() => chooseConsent("declined")}
              >
                Decline
              </button>
              <button
                className="consent-button consent-button-primary"
                type="button"
                onClick={() => chooseConsent("accepted")}
              >
                Accept
              </button>
              <button
                className="consent-text-button"
                type="button"
                onClick={() => setSettingsOpen(false)}
              >
                Close
              </button>
            </div>
          </section>
        </dialog>
      ) : null}
    </>
  );
}

export function AnalyticsSettingsButton() {
  return (
    <button
      className="footer-settings-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(settingsOpenEvent))}
    >
      Analytics settings
    </button>
  );
}
