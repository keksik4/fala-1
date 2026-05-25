import { useEffect, useState } from "react";
import { ArrowSquareOut } from "@phosphor-icons/react";

const TICKET_STORE_URL = "https://panel.eaktywni.pl/eAktywniReactApp/customOffer?offerId=sklep&id=273";

type FalaTicketIframeProps = {
  src?: string;
  fallbackUrl?: string;
};

export function FalaTicketIframe({ src = TICKET_STORE_URL, fallbackUrl = TICKET_STORE_URL }: FalaTicketIframeProps) {
  const [loaded, setLoaded] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);

  useEffect(() => {
    const scriptId = "eaktywni-iframe-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://panel.eaktywni.pl/js/eAktywniIframe.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const timer = window.setTimeout(() => setSlowLoad(true), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoaded(false);
    setSlowLoad(false);
    const timer = window.setTimeout(() => setSlowLoad(true), 4500);
    const safetyTimer = window.setTimeout(() => setLoaded(true), 9000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(safetyTimer);
    };
  }, [src]);

  return (
    <section id="sklep-online" className="store-section">
      <div className="section-shell">
        <div className="section-heading-block store-heading">
          <p className="section-kicker">Sklep online</p>
          <h2>Dokończ zakup w oficjalnym sklepie</h2>
          <p>Wybierz termin i typ biletu w zewnętrznym systemie sprzedaży Aquaparku Fala.</p>
        </div>

        <div className="iframe-frame">
          {!loaded ? (
            <div className="iframe-loader" aria-hidden="true">
              <span>Ładuję sklep online</span>
              <div className="loader-grid">
                <i />
                <i />
                <i />
              </div>
            </div>
          ) : null}
          <iframe
            id="eaktywni-iframe"
            key={src}
            title="Sklep online Aquapark Fala"
            scrolling="no"
            src={src}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="store-fallback">
          <p>
            {slowLoad && !loaded
              ? "Sklep ładuje się dłużej niż zwykle. Możesz też otworzyć go poza stroną."
              : "Jeśli sklep nie wyświetla się poprawnie, otwórz go poza stroną."}
          </p>
          <a href={fallbackUrl} target="_blank" rel="noreferrer">
            Otwórz sklep w nowej karcie
            <ArrowSquareOut size={18} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
