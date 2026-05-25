import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Car,
  Clock,
  DeviceMobile,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  TiktokLogo,
  Ticket,
  ThermometerSimple,
  UsersThree,
  Waves,
  X
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { FalaTicketIframe } from "./FalaTicketIframe";

const storeOverviewUrl = "https://panel.eaktywni.pl/eAktywniReactApp/customOffer?offerId=sklep&id=273";
const poolTicketUrl =
  "https://panel.eaktywni.pl/eAktywniReactApp/modalWindow?id=273&exerciseName=Bilety%20na%20basen&exerciseIds=1";

type Attraction = {
  name: string;
  lead: string;
  detail: string;
  photo: string;
  accent: string;
  soft: string;
  mark?: string;
  params?: string[];
};

type Review = {
  author: string;
  meta: string;
  date: string;
  text: string;
};

const attractions: Attraction[] = [
  {
    name: "BANZAI",
    lead: "Zapadnia, odliczanie i mocny zastrzyk adrenaliny",
    detail:
      "BANZAI to idealna opcja dla tych, którzy lubią, kiedy zjazd zaczyna się od „o nie...” i kończy się „jeszcze raz”. Wchodzisz do kapsuły, słyszysz krótkie odliczanie, a potem podłoga znika spod stóp. Dalej są zakręty, tempo i wrażenie swobodnego spadku, które podnosi puls i zostaje w głowie jeszcze po wyjściu z wody.",
    photo: "/fala/banzai.jpg",
    mark: "/fala/banzai-symbol.png",
    accent: "#d7288f",
    soft: "#fff0f8",
    params: ["Długość: 120 m", "Minimalny wiek: 13 lat", "Minimalny wzrost: 130 cm", "Maksymalna waga: 130 kg"]
  },
  {
    name: "THUNDER",
    lead: "Tu nie tylko zjeżdżasz. Tu wpadasz w sam środek wodnej burzy",
    detail:
      "THUNDER to pontonowa MegaZjeżdżalnia, która nie bierze jeńców. Ogromna rura o średnicy 2,85 m, dwa ponad 12-metrowe rożki, ruch wahadłowy pontonu i efekty specjalne imitujące burzę robią z tego zjazdu konkretną wodną jazdę. Pontony jedno-, dwu- i czteroosobowe pozwalają dzielić emocje z innymi.",
    photo: "/fala/thunder.jpg",
    mark: "/fala/thunder-symbol.png",
    accent: "#0b8fc9",
    soft: "#eaf8ff",
    params: ["Pontonowa MegaZjeżdżalnia", "Pontony 1-, 2- i 4-osobowe", "Efekty świetlne i dźwiękowe"]
  },
  {
    name: "TWISTER",
    lead: "Zakręcony zjazd z multimedialnym twistem",
    detail:
      "TWISTER kręci zabawę na własnych zasadach. Wjeżdżasz do ogromnej, 12-metrowej czaszy, a ponton zatacza kolejne kręgi, zanim ruszy dalej trasą. Po drodze czekają projekcje, podświetlane tunele i efekty, które robią z każdego zjazdu trochę inne widowisko.",
    photo: "/fala/twister.jpg",
    mark: "/fala/twister-symbol.png",
    accent: "#eab308",
    soft: "#fff9d9",
    params: ["Długość: 140 m", "Minimalny wiek: 8 lat", "Minimalny wzrost: 120 cm", "Pontony jednoosobowe"]
  },
  {
    name: "ANACONDA",
    lead: "Wijąca się trasa, która wciąga",
    detail:
      "ANACONDA wygląda spokojnie tylko z daleka. To najdłuższa z pontonowych MegaZjeżdżalni na Fali: zielona, wijąca się trasa z masą zakrętów i ekranami pełnymi kolorowych wodnych stworzeń. Wsiadasz na ponton, ruszasz i szybko okazuje się, że lepiej po prostu dać się ponieść.",
    photo: "/fala/anaconda.jpg",
    mark: "/fala/anaconda-symbol.png",
    accent: "#4fa82c",
    soft: "#eff9e8",
    params: ["Długość: 144 m", "Minimalny wiek: 8 lat", "Minimalny wzrost: 120 cm", "Pontony jednoosobowe"]
  },
  {
    name: "RED VIPER",
    lead: "146 metrów zjazdu z efektami multimedialnymi",
    detail:
      "RED VIPER to 146 metrów wodnej jazdy z mocną oprawą po drodze. Zamiast zwykłego zjazdu dostajesz trasę z programami tematycznymi, światłem LED i efektami dźwiękowymi, które podkręcają klimat od startu do mety.",
    photo: "/fala/red-viper.jpg",
    mark: "/fala/red-viper-symbol.png",
    accent: "#bf2934",
    soft: "#fff0f2",
    params: ["Długość: 146 m", "Minimalny wiek: 8 lat", "Efekty LED i dźwiękowe"]
  },
  {
    name: "FLAMINGO",
    lead: "Zakręcona jazda ze światłem i dźwiękiem",
    detail:
      "FLAMINGO to zjeżdżalnia dla tych, którzy chcą po prostu dobrze się bawić, bez napinania się na ekstremalne wrażenia. Po drodze są zakręty, programy tematyczne, dźwięk i prześwity, przez które wpada dzienne światło.",
    photo: "/fala/flamingo.jpg",
    mark: "/fala/flamingo-symbol.png",
    accent: "#e747a8",
    soft: "#fff0f8",
    params: ["Długość: 130 m", "Minimalny wiek: 8 lat", "Programy tematyczne"]
  },
  {
    name: "KAMIKAZE",
    lead: "Ekstremalny zjazd z 6. piętra",
    detail:
      "Ta zjeżdżalnia ma proste zasady: startujesz wysoko, lecisz niemal prosto w dół i po kilku sekundach jesteś już w wodzie. Punkt startowy znajduje się na wysokości 19,25 m, czyli mniej więcej na poziomie 6. piętra.",
    photo: "/fala/kamikaze.jpg",
    accent: "#148bd4",
    soft: "#eaf8ff",
    params: ["Długość: 50,5 m", "Kąt nachylenia: 38°", "Wysokość startu: 19,25 m", "Prędkość: do 30 km/h"]
  },
  {
    name: "TRZY TORY",
    lead: "Rodzinny wyścig prosto do wody",
    detail:
      "Zjeżdżalnia trójtorowa to klasyk rodzinnej zabawy na Fali. Trzy kolorowe tory pozwalają ruszyć jednocześnie, więc od razu zaczyna się mały wyścig: dzieci kontra rodzice, rodzeństwo kontra rodzeństwo albo rewanż za poprzedni zjazd.",
    photo: "/fala/trzy-tory.jpg",
    accent: "#16a66a",
    soft: "#edfff6",
    params: ["Liczba torów: 3", "Długość zjazdu: 25 m", "Wysokość: 3,6 m", "Basen lądowiska: 0,24 m"]
  },
  {
    name: "POMARAŃCZOWA",
    lead: "Krótki zjazd, dużo frajdy",
    detail:
      "Pomarańczowa zjeżdżalnia nie udaje wielkiej ekstremalnej atrakcji, ale potrafi fajnie podkręcić zabawę. Wsiadasz na ponton, ruszasz krótką trasą z wyraźnym wodnym przyspieszeniem i po chwili jesteś już w basenie.",
    photo: "/fala/pomaranczowa.jpg",
    accent: "#ef8f1a",
    soft: "#fff4e8",
    params: ["Długość: 26 m", "Szerokość: 2 m", "Różnica poziomów: 3 m", "Typ zjazdu: na pontonie"]
  },
  {
    name: "CZERWONA",
    lead: "Klasyczny zjazd na dobry początek",
    detail:
      "Czerwona zjeżdżalnia to spokojniejsza opcja tuż obok pomarańczowej. Bez pontonu, bez wielkiej filozofii: wchodzisz, zjeżdżasz, lądujesz w wodzie i zwykle od razu jest ochota na powtórkę.",
    photo: "/fala/czerwona.jpg",
    accent: "#d93832",
    soft: "#fff0f0",
    params: ["Długość: 19 m", "Różnica poziomów: 2 m", "Typ zjazdu: bez pontonu"]
  },
  {
    name: "DLA NAJMŁODSZYCH",
    lead: "Małe trasy, wielka radość",
    detail:
      "Dla najmłodszych Falowiczów mamy 7 mniejszych zjeżdżalni, idealnych na pierwsze wodne „jeszcze raz!”. Dzieci mogą zaczynać ostrożnie, nabierać odwagi po swojemu i wracać na górę tyle razy, ile starczy sił.",
    photo: "/fala/dla-najmlodszych.jpg",
    accent: "#1eb5c9",
    soft: "#eafcff",
    params: ["7 mniejszych zjeżdżalni", "Łagodna strefa dla dzieci", "Kolorowa wodna zabawa"]
  }
];

const ticketPerks = [
  { icon: Clock, text: "Szybki zakup online" },
  { icon: ShieldCheck, text: "Gwarancja ceny i dostępności" },
  { icon: DeviceMobile, text: "Bilet w telefonie, gotowy do wejścia" }
];

const heroFacts = [
  { icon: Waves, label: "19 zjeżdżalni" },
  { icon: ThermometerSimple, label: "7 ekstremalnych tras" },
  { icon: UsersThree, label: "Dla dzieci, dorosłych i młodzieży" }
];

const reviews: Review[] = [
  {
    author: "Karol Z",
    meta: "Lokalny przewodnik · 99 opinii · 180 zdjęć",
    date: "10 miesięcy temu",
    text:
      "Fantastyczne miejsce do odwiedzenia latem i zimą. Dużo basenów, zjeżdżalnie dla młodszych i starszych, sztuczna fala i atrakcje w środku. Bez problemu można spędzić cały dzień i nie ma nudy."
  },
  {
    author: "Rafał Filasinski",
    meta: "Lokalny przewodnik · 180 opinii · 411 zdjęć",
    date: "9 miesięcy temu",
    text:
      "Byliśmy całą rodziną w Aquaparku Fala w Łodzi i naprawdę polecam. Duży wybór basenów, zjeżdżalnie dla małych i dużych, strefa z falą i jacuzzi. Woda przyjemna, ratowników sporo, a kupno biletów online oszczędza czas i nerwy."
  },
  {
    author: "Paulina C",
    meta: "Lokalny przewodnik · 14 opinii · 11 zdjęć",
    date: "Edytowano 11 miesięcy temu",
    text:
      "Super, jesteśmy któryś raz z rzędu i bardzo nam się podoba. Każdy znajdzie coś dla siebie, od najmłodszego do najstarszego. Polecam dla rodzin z dziećmi, także najmniejszymi: w brodzikach ciepła woda, dużo zjeżdżalni, rwąca rzeka i fale jak nad morzem."
  }
];

export function App() {
  const [iframeUrl, setIframeUrl] = useState(storeOverviewUrl);
  const [activeAttraction, setActiveAttraction] = useState<Attraction | null>(null);

  const scrollToStore = () => {
    const store = document.getElementById("sklep-online");
    if (!store) return;
    const top = store.getBoundingClientRect().top + window.scrollY + 92;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const openStoreOverview = () => {
    setIframeUrl(storeOverviewUrl);
    window.setTimeout(scrollToStore, 0);
  };

  const openPoolTicket = () => {
    setIframeUrl(poolTicketUrl);
    setActiveAttraction(null);
    window.setTimeout(scrollToStore, 0);
  };

  const scrollToAttractions = () => {
    document.getElementById("zjezdzalnie")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="fala-page">
      <HeroSection onBuyClick={openStoreOverview} onSlidesClick={scrollToAttractions} />
      <TicketSection onBuyClick={openPoolTicket} />
      <AttractionsSection onOpen={setActiveAttraction} />
      <ReviewsSection />
      <FalaTicketIframe src={iframeUrl} fallbackUrl={iframeUrl} />
      <SiteFooter />
      <AttractionModal attraction={activeAttraction} onClose={() => setActiveAttraction(null)} onBuyClick={openPoolTicket} />
    </main>
  );
}

function HeroSection({ onBuyClick, onSlidesClick }: { onBuyClick: () => void; onSlidesClick: () => void }) {
  return (
    <section className="hero-section">
      <Header />
      <img className="hero-image" src="/fala/hero.png" alt="Aquapark Fala w Łodzi z kompleksem kolorowych zjeżdżalni" />
      <div className="hero-shade" />
      <div className="hero-glow" />

      <div className="hero-content">
        <div className="hero-copy">
          <ContactStrip />
          <h1>Całoroczne mega zjeżdżalnie Fali</h1>
          <p>
            Wskocz na Falę i sprawdź, ile emocji mieści się w naszych zjeżdżalniach. Szybkie zjazdy, ostre zakręty,
            pontony, wodna rywalizacja i trasy, po których trudno powiedzieć: dobra, ostatni raz.
          </p>

          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onBuyClick}>
              <Ticket size={22} weight="bold" />
              Kup bilet online
            </button>
            <button className="button button-secondary" type="button" onClick={onSlidesClick}>
              <Waves size={22} weight="bold" />
              Zobacz zjeżdżalnie
            </button>
          </div>

          <div className="hero-facts">
            {heroFacts.map(({ icon: Icon, label }) => (
              <div className="hero-fact" key={label}>
                <Icon size={34} weight="bold" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 118" preserveAspectRatio="none">
          <path d="M0 38C106 84 216 97 330 66C452 32 563 42 684 76C826 116 960 103 1118 62C1244 29 1342 17 1440 49V118H0V38Z" />
        </svg>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Aquapark FALA">
        <img src="/fala/aquapark-fala-current-logo.png" alt="Aquapark FALA" />
      </a>
    </header>
  );
}

function ContactStrip() {
  return (
    <div className="contact-strip" aria-label="Szybkie linki Aquaparku Fala">
      <span>
        <Car size={17} weight="bold" />
        Parking dla klientów 2 zł
      </span>
      <a href="https://www.facebook.com/aquaparkfalalodz" aria-label="Facebook Aquapark Fala">
        <FacebookLogo size={17} weight="bold" />
        FB
      </a>
      <a href="https://www.instagram.com/aquapark_fala/" aria-label="Instagram Aquapark Fala">
        <InstagramLogo size={17} weight="bold" />
        IG
      </a>
      <a href="https://www.tiktok.com/@aquapark_fala" aria-label="TikTok Aquapark Fala">
        <TiktokLogo size={17} weight="bold" />
        TikTok
      </a>
    </div>
  );
}

function TicketSection({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section className="ticket-section">
      <div className="section-shell ticket-shell">
        <div className="ticket-intro">
          <p className="section-kicker">Bilety</p>
          <h2>Kup bilet online</h2>
          <AccentWave />
          <p>Wybierz bilet na basen i zaplanuj wizytę bez stania w kolejce.</p>

          <div className="ticket-perks">
            {ticketPerks.map(({ icon: Icon, text }) => (
              <div className="ticket-perk" key={text}>
                <Icon size={24} weight="bold" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <article className="ticket-card">
          <div className="ticket-photo">
            <img src="/fala/ticket-pool.png" alt="Goście Aquaparku Fala w basenie przy kolorowych zjeżdżalniach" />
          </div>
          <div className="ticket-copy">
            <span className="price-label">Szybki wybór</span>
            <h3>Bilety na basen</h3>
            <p>
              Wejście na pływalnię i korzystanie z atrakcji. Kliknięcie prowadzi od razu do kalendarza zakupu biletów
              na basen.
            </p>
            <div className="ticket-tags">
              <span>Baseny</span>
              <span>Zjeżdżalnie</span>
              <span>Relaks</span>
            </div>
            <button className="purchase-button" type="button" onClick={onBuyClick}>
              Przejdź do zakupu
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

function AttractionsSection({ onOpen }: { onOpen: (attraction: Attraction) => void }) {
  const { activeIndex, scrollToIndex, trackRef } = useSwipeCarousel(attractions.length);

  return (
    <section className="slides-section" id="zjezdzalnie">
      <div className="section-shell">
        <div className="section-heading-block compact-heading">
          <h2>
            Którą zjeżdżalnię <span className="mobile-title-break">wybierasz?</span>
          </h2>
          <AccentWave />
        </div>

        <div className="slides-grid grouped-slide-grid" ref={trackRef}>
          {attractions.map((attraction) => (
            <button
              className="slide-card"
              type="button"
              key={attraction.name}
              onClick={() => onOpen(attraction)}
              style={{ "--accent": attraction.accent, "--soft": attraction.soft } as CSSProperties}
            >
              <div className="slide-photo">
                <img src={attraction.photo} alt={attraction.name} />
              </div>
              <div className={`slide-body ${attraction.mark ? "" : "slide-body-plain"}`}>
                {attraction.mark ? (
                  <div className="slide-mark">
                    <img src={attraction.mark} alt="" />
                  </div>
                ) : null}
                <div>
                  <h3>{attraction.name}</h3>
                  <p>{attraction.lead}</p>
                </div>
                <ArrowRight className="slide-arrow" size={20} weight="bold" />
              </div>
            </button>
          ))}
        </div>
        <CarouselDots
          activeIndex={activeIndex}
          className="mobile-carousel-dots"
          count={attractions.length}
          label="Przewiń zjeżdżalnie"
          onSelect={scrollToIndex}
        />
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="section-shell">
        <div className="section-heading-block compact-heading">
          <p className="section-kicker">Opinie</p>
          <h2>Goście po wodnych emocjach</h2>
          <AccentWave />
        </div>
        <ReviewCarousel reviews={reviews} />
      </div>
    </section>
  );
}

function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartRef = useRef<number | null>(null);
  const activeReview = reviews[activeIndex];

  const showReview = (index: number) => {
    setActiveIndex((index + reviews.length) % reviews.length);
  };

  const showPrevious = () => {
    showReview(activeIndex - 1);
  };

  const showNext = () => {
    showReview(activeIndex + 1);
  };

  const handleSwipeEnd = (clientX: number) => {
    const startX = swipeStartRef.current;
    swipeStartRef.current = null;
    if (startX === null) return;
    const delta = clientX - startX;
    if (Math.abs(delta) < 45) return;
    if (delta < 0) showNext();
    else showPrevious();
  };

  return (
    <div className="review-carousel">
      <div
        className="review-track"
        onPointerDown={(event) => {
          swipeStartRef.current = event.clientX;
        }}
        onPointerUp={(event) => handleSwipeEnd(event.clientX)}
        onPointerCancel={() => {
          swipeStartRef.current = null;
        }}
      >
        <article className="review-panel" key={`${activeReview.author}-${activeIndex}`}>
          <div className="review-stars" aria-label="Ocena 5 na 5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={22} weight="fill" />
            ))}
          </div>
          <p className="review-text">{activeReview.text}</p>
          <div className="review-author">
            <strong>{activeReview.author}</strong>
            <span>{activeReview.meta}</span>
            <small>{activeReview.date}</small>
          </div>
        </article>
      </div>
      <div className="review-controls" aria-label="Przełącz opinie">
        <button type="button" onClick={showPrevious} aria-label="Poprzednia opinia">
          <CaretLeft size={22} weight="bold" />
        </button>
        <div className="review-dots">
          {reviews.map((review, index) => (
            <button
              type="button"
              key={`${review.author}-${index}`}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => showReview(index)}
              aria-label={`Pokaż opinię: ${review.author}`}
            />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Następna opinia">
          <CaretRight size={22} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-shell">
        <div className="footer-brand">
          <img src="/fala/aquapark-fala-current-logo.png" alt="Aquapark FALA" />
          <p>Wodna energia w sercu Łodzi. Zaplanuj wizytę i kup bilet online bez stania w kolejce.</p>
        </div>
        <div className="footer-contact">
          <p className="section-kicker">Kontakt</p>
          <div className="footer-links">
            <span>
              <MapPin size={19} weight="bold" />
              al. Unii Lubelskiej 4, 94-208 Łódź
            </span>
            <a href="tel:+48426400800">
              <Phone size={19} weight="bold" />
              42 640 08 00
            </a>
            <a href="mailto:fala@aquapark.lodz.pl">
              <EnvelopeSimple size={19} weight="bold" />
              fala@aquapark.lodz.pl
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AttractionModal({
  attraction,
  onClose,
  onBuyClick
}: {
  attraction: Attraction | null;
  onClose: () => void;
  onBuyClick: () => void;
}) {
  if (!attraction) return null;
  const hasLongTitle = attraction.name.length > 11;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="attraction-modal"
        role="dialog"
        aria-modal="true"
        aria-label={attraction.name}
        onClick={(event) => event.stopPropagation()}
        style={{ "--accent": attraction.accent, "--soft": attraction.soft } as CSSProperties}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Zamknij">
          <X size={22} weight="bold" />
        </button>
        <div className="modal-photo">
          <img src={attraction.photo} alt={attraction.name} />
        </div>
        <div className="modal-copy">
          <p className="section-kicker">Zjeżdżalnia</p>
          <h2 className={hasLongTitle ? "modal-title-long" : undefined}>{attraction.name}</h2>
          <strong>{attraction.lead}</strong>
          <p>{attraction.detail}</p>
          {attraction.params ? (
            <div className="modal-params">
              {attraction.params.map((param) => (
                <span key={param}>{param}</span>
              ))}
            </div>
          ) : null}
          <button className="purchase-button modal-buy" type="button" onClick={onBuyClick}>
            Kup bilet na basen
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </section>
    </div>
  );
}

function AccentWave() {
  return <span className="accent-wave" aria-hidden="true" />;
}

function CarouselDots({
  activeIndex,
  className,
  count,
  label,
  onSelect
}: {
  activeIndex: number;
  className: string;
  count: number;
  label: string;
  onSelect: (index: number) => void;
}) {
  if (count < 2) return null;

  return (
    <div className={className} aria-label={label}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          type="button"
          key={index}
          className={index === activeIndex ? "is-active" : ""}
          onClick={() => onSelect(index)}
          aria-label={`${label}: ${index + 1}`}
        />
      ))}
    </div>
  );
}

function useSwipeCarousel(itemCount: number) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track || itemCount < 1) return;
    const nextIndex = (index + itemCount) % itemCount;
    const target = track.children.item(nextIndex) as HTMLElement | null;
    const firstItem = track.children.item(0) as HTMLElement | null;
    setActiveIndex(nextIndex);
    if (target) {
      track.scrollTo({ left: target.offsetLeft - (firstItem?.offsetLeft ?? 0), behavior: "auto" });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;
    const syncActiveIndex = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        if (!items.length) return;
        const baseOffset = items[0]?.offsetLeft ?? 0;
        const nextIndex = items.reduce((closestIndex, item, index) => {
          const currentDistance = Math.abs(item.offsetLeft - baseOffset - track.scrollLeft);
          const closestDistance = Math.abs(items[closestIndex].offsetLeft - baseOffset - track.scrollLeft);
          return currentDistance < closestDistance ? index : closestIndex;
        }, 0);
        setActiveIndex(nextIndex);
      });
    };

    track.addEventListener("scroll", syncActiveIndex, { passive: true });
    syncActiveIndex();

    return () => {
      window.cancelAnimationFrame(frameId);
      track.removeEventListener("scroll", syncActiveIndex);
    };
  }, [itemCount]);

  return { activeIndex, scrollToIndex, trackRef };
}
