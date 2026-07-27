import { useEffect, useMemo, useState } from "react";

import { useReveal } from "@/hooks/use-reveal";
import galleryImage1 from "../ quiet-gallery/image1.png";
import galleryImage2 from "../ quiet-gallery/image2.png";
import galleryImage3 from "../ quiet-gallery/image3.png";
import galleryImage4 from "../ quiet-gallery/image4.png";
import galleryImage5 from "../ quiet-gallery/image5.png";
import galleryImage6 from "../ quiet-gallery/image6.png";
import galleryImage7 from "../ quiet-gallery/image7.png";
import galleryImage8 from "../ quiet-gallery/image8.png";

// ---- Unsplash imagery (curated: venues, florals, table settings, silhouettes)
const HERO =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80";
const STORY =
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80";
const RSVP_IMG =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80";
const CLOSING =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080").replace(
  /\/$/,
  "",
);

const GALLERY: { src: string; alt: string; span?: string }[] = [
  {
    src: galleryImage1,
    alt: "Playful black and white portrait of the couple",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: galleryImage2,
    alt: "Close-up moment showing the engagement ring",
  },
  {
    src: galleryImage3,
    alt: "Proposal moment captured in black and white",
  },
  {
    src: galleryImage4,
    alt: "Ring portrait over a bouquet of pink lilies and roses",
  },
  {
    src: galleryImage8,
    alt: "Portrait photo from the quiet gallery collection",
  },
  {
    src: galleryImage5,
    alt: "Outdoor wedding setup by the seaside",
    span: "md:col-span-2",
  },
  {
    src: galleryImage6,
    alt: "Close-up of hands meeting with the engagement ring in focus",
  },
  {
    src: galleryImage7,
    alt: "Warmly lit cathedral interior prepared for a ceremony",
  },
];

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif tracking-[0.25em] text-[0.72rem] uppercase text-charcoal ${className}`}
    >
      L <span className="text-champagne">&</span> A
    </span>
  );
}

function Hairline({ className = "" }: { className?: string }) {
  return <span className={`hairline ${className}`} aria-hidden="true" />;
}

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-champagne/40">
      <Header />
      <Hero />
      <Welcome />
      <Story />
      <Details />
      <Gallery />
      <Rsvp />
      <Closing />
      <Footer />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#story", label: "Story" },
    // { href: "#gallery", label: "Gallery" },
    { href: "#rsvp", label: "RSVP", highlight: true },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-ivory/85 backdrop-blur-md border-b border-border/70" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2">
          <span
            className={`font-serif text-xl tracking-[0.28em] transition-colors ${
              scrolled ? "text-charcoal" : "text-ivory"
            }`}
          >
            L <span className="text-champagne">&</span> A
          </span>
        </a>
        <ul className="flex items-center gap-6 md:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative inline-flex items-center justify-center text-[0.72rem] font-medium uppercase tracking-[0.25em] transition-colors hover:text-champagne ${
                  scrolled ? "text-charcoal" : "text-ivory/90"
                }`}
              >
                <span className="relative z-[1]">{link.label}</span>
                {link.highlight && (
                  <span
                    aria-hidden="true"
                    className="nav-rsvp-line absolute -bottom-1.5 left-1/2 h-px w-9 -translate-x-1/2 bg-current"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={HERO}
        alt="Elegant candlelit wedding venue at dusk"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory">
        <p
          data-reveal
          className="reveal text-[0.72rem] font-medium uppercase tracking-[0.4em] text-ivory/85"
        >
          Save the Date
        </p>
        <Hairline className="my-6 !bg-ivory/70" />
        <h1
          data-reveal
          data-reveal-delay="120"
          className="reveal font-serif text-[3rem] leading-[1.02] tracking-tight sm:text-[4.5rem] md:text-[6rem] lg:text-[7.25rem]"
        >
          Luis Meraz
          <span className="my-2 block text-champagne italic font-light sm:mx-4 sm:my-0 sm:inline-block sm:align-middle">
            &amp;
          </span>
          Cyrilla Angel
        </h1>
        <div
          data-reveal
          data-reveal-delay="260"
          className="reveal mt-8 flex flex-col items-center gap-2"
        >
          <p className="font-serif text-lg italic text-ivory/90 md:text-xl">23 — 24 April 2027</p>
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-ivory/75">
            Jakarta, Indonesia
          </p>
        </div>
      </div>
      <a
        href="#welcome"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/80"
      >
        <span className="scroll-dot block h-10 w-px bg-ivory/60" />
      </a>
    </section>
  );
}

function Welcome() {
  return (
    <section id="welcome" className="bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <div data-reveal className="reveal">
          <Monogram />
        </div>
        <div data-reveal data-reveal-delay="120" className="reveal mt-6 flex justify-center">
          <Hairline />
        </div>
        <h2
          data-reveal
          data-reveal-delay="200"
          className="reveal mt-8 font-serif text-3xl leading-tight text-charcoal md:text-5xl"
        >
          We're so excited to celebrate our wedding with you.
        </h2>
        <p
          data-reveal
          data-reveal-delay="320"
          className="reveal mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Before we send the official invitation, we'd love to know if you're likely to attend.
        </p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-cream px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <div data-reveal className="reveal order-2 md:order-1">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.35em] text-taupe">
            Our Story
          </p>
          <Hairline className="mt-6" />
          <h2 className="mt-6 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
            A quiet beginning,
            <br />a lifelong promise.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Some stories begin unexpectedly, grow beautifully, and eventually lead to a promise of
              forever.
            </p>
            <p>
              As we prepare for this meaningful new chapter, we would be honored to celebrate it
              with the people who have been part of our journey.
            </p>
          </div>
        </div>
        <div data-reveal data-reveal-delay="160" className="reveal order-1 md:order-2">
          <div className="relative overflow-hidden rounded-lg shadow-[0_20px_60px_-30px_rgba(50,40,30,0.35)]">
            <img
              src={STORY}
              alt="Bride and groom walking hand in hand through soft afternoon light"
              className="aspect-[4/5] w-full object-cover brightness-[0.64] contrast-[1.14] saturate-[0.7] sepia-[0.16] drop-shadow-[0_24px_42px_rgba(40,29,22,0.28)]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/18 to-charcoal/48" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(37,30,24,0.3)_100%)] mix-blend-multiply" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(199,168,120,0.1),transparent_38%,rgba(32,26,22,0.18))]" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="max-w-[16rem] text-ivory md:max-w-[18rem]">
                <p className="text-[0.64rem] font-medium uppercase tracking-[0.38em] text-ivory/78">
                  Our Promise
                </p>
                <p className="mt-4 font-serif text-2xl leading-tight italic text-ivory/92 md:text-3xl">
                  Every forever begins with a single touch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Details() {
  const items = [
    {
      label: "The Date",
      title: "23 — 24 April",
      sub: "2027",
      note: "A two-day celebration",
    },
    {
      label: "The Place",
      title: "Jakarta",
      sub: "Indonesia",
      note: "Venue to be shared privately",
    },
    {
      label: "The Invitation",
      title: "Coming Soon",
      sub: "Full details shared ~3 months prior",
      note: "Schedule, dress code, and maps",
    },
  ];

  return (
    <section className="bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div data-reveal className="reveal flex justify-center">
            <Hairline />
          </div>
          <h2
            data-reveal
            data-reveal-delay="120"
            className="reveal mt-6 font-serif text-3xl text-charcoal md:text-5xl"
          >
            Wedding Details
          </h2>
        </div>
        <div data-reveal data-reveal-delay="120" className="reveal mt-14 md:mt-20">
          <div className="relative overflow-hidden rounded-[28px] border border-[rgba(200,182,153,0.45)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,250,245,0.92))] px-6 py-8 shadow-[0_28px_80px_-38px_rgba(64,48,37,0.28)] backdrop-blur-sm md:px-10 md:py-12">
            <div className="absolute left-5 top-5 h-10 w-10 rounded-tl-[20px] border-l border-t border-champagne/45 md:left-7 md:top-7" />
            <div className="absolute right-5 top-5 h-10 w-10 rounded-tr-[20px] border-r border-t border-champagne/45 md:right-7 md:top-7" />
            <div className="absolute bottom-5 left-5 h-10 w-10 rounded-bl-[20px] border-b border-l border-champagne/45 md:bottom-7 md:left-7" />
            <div className="absolute bottom-5 right-5 h-10 w-10 rounded-br-[20px] border-b border-r border-champagne/45 md:bottom-7 md:right-7" />
            <div className="absolute inset-x-12 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(214,190,152,0.18),transparent_72%)]" />
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.42em] text-taupe/95">
                  Save This Chapter
                </p>
                <p className="mt-4 max-w-2xl font-serif text-xl italic leading-relaxed text-charcoal/88 md:text-2xl">
                  An intimate celebration designed with quiet elegance, warm details, and timeless
                  moments.
                </p>
              </div>

              <div className="mt-8 grid gap-0 rounded-[22px] border border-champagne/20 bg-[linear-gradient(180deg,rgba(248,243,235,0.52),rgba(255,255,255,0.76))] md:mt-10 md:grid-cols-3">
                {items.map((item, index) => (
                  <article
                    key={item.label}
                    className={[
                      "relative flex min-h-[220px] flex-col items-center justify-center px-5 py-8 text-center sm:min-h-[240px] sm:px-8 sm:py-10 md:min-h-[290px] md:px-10",
                      index !== 2 ? "border-b border-champagne/18 md:border-b-0 md:border-r" : "",
                    ].join(" ")}
                  >
                    <span className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,170,129,0.55),transparent)]" />
                    <span className="absolute inset-x-10 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,170,129,0.3),transparent)]" />
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-taupe">
                      {item.label}
                    </p>
                    <div className="mt-5 h-px w-16 bg-champagne/70" />
                    <h3 className="mt-6 whitespace-normal font-serif text-[1.9rem] leading-tight text-charcoal sm:text-[2.15rem] md:whitespace-nowrap md:text-[2.6rem] md:leading-none">
                      {item.title}
                    </h3>
                    <p className="mt-4 whitespace-normal text-[0.98rem] leading-relaxed text-taupe sm:text-base md:whitespace-nowrap md:text-[1.12rem] md:leading-normal">
                      {item.sub}
                    </p>
                    <p className="mt-6 max-w-[16rem] whitespace-normal text-[0.56rem] uppercase leading-[1.7] tracking-[0.16em] text-muted-foreground sm:text-[0.6rem] sm:tracking-[0.2em] md:max-w-none md:whitespace-nowrap md:text-[0.62rem] md:leading-normal md:tracking-[0.24em]">
                      {item.note}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center text-center md:mt-10">
                <Hairline />
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  The formal invitation will follow with the complete ceremony timeline, reception
                  venue, and every refined detail for the celebration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") {
        setLightbox((index) => (index === null ? index : (index + 1) % GALLERY.length));
      }
      if (event.key === "ArrowLeft") {
        setLightbox((index) =>
          index === null ? index : (index - 1 + GALLERY.length) % GALLERY.length,
        );
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="bg-cream px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p
            data-reveal
            className="reveal text-[0.72rem] font-medium uppercase tracking-[0.35em] text-taupe"
          >
            Moments
          </p>
          <div data-reveal data-reveal-delay="100" className="reveal mt-5 flex justify-center">
            <Hairline />
          </div>
          <h2
            data-reveal
            data-reveal-delay="180"
            className="reveal mt-6 font-serif text-3xl text-charcoal md:text-5xl"
          >
            A quiet gallery
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 md:mt-20 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {GALLERY.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setLightbox(index)}
              data-reveal
              data-reveal-delay={String((index % 4) * 100)}
              className={`reveal group relative overflow-hidden rounded-md shadow-[0_18px_44px_-28px_rgba(58,44,34,0.42)] ${image.span ?? ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.82] contrast-[1.08] saturate-[0.86] sepia-[0.12] drop-shadow-[0_18px_32px_rgba(54,40,31,0.22)] transition-transform duration-[900ms] ease-out group-hover:scale-105 group-hover:brightness-[0.78]"
              />
              <span className="absolute inset-0 bg-gradient-to-b from-charcoal/16 via-transparent to-charcoal/18 opacity-90" />
              <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,168,128,0.08),transparent_45%,rgba(31,25,22,0.12))]" />
              <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/10" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/85 px-4 py-8"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 text-sm uppercase tracking-[0.3em] text-ivory/90 hover:text-champagne"
          >
            Close
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-md object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  attending: "yes" | "no" | "";
  guests: "1" | "2" | "";
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  attending: "",
  guests: "",
};

function Rsvp() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<"yes" | "no" | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitMessage("");
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 6) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.attending) next.attending = "Please let us know if you can attend.";
    if (form.attending === "yes" && !form.guests) {
      next.guests = "Please select how many guests.";
    }
    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          attending: form.attending,
          guests: form.attending === "yes" ? form.guests : null,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        errors?: Partial<Record<keyof FormState | "firstName", string>>;
      };

      if (!response.ok) {
        if (payload.errors) {
          setErrors((current) => ({
            ...current,
            firstName: payload.errors.firstName ?? current.firstName,
            lastName: payload.errors.lastName ?? current.lastName,
            phone: payload.errors.phone ?? current.phone,
            email: payload.errors.email ?? current.email,
            attending: payload.errors.attending ?? current.attending,
            guests: payload.errors.guests ?? current.guests,
          }));
        }
        throw new Error(payload.message ?? "Unable to send your RSVP right now.");
      }

      setConfirmation(form.attending as "yes" | "no");
      setSubmitMessage(payload.message ?? "Your RSVP has been saved.");
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send your RSVP right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeConfirm = () => {
    setConfirmation(null);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <section id="rsvp" className="bg-background px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-border bg-card shadow-[0_20px_60px_-30px_rgba(50,40,30,0.25)] md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src={RSVP_IMG}
            alt="Handwritten place card resting on ivory linen"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="px-6 py-12 md:px-12 md:py-16">
          <div data-reveal className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.35em] text-taupe">
              Kindly Respond
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
              Will you join us?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              A preliminary response helps us plan. The full invitation follows.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 space-y-5"
            data-reveal
            data-reveal-delay="120"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First Name" required error={errors.firstName} htmlFor="firstName">
                <input
                  id="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(event) => update("firstName", event.target.value)}
                  className={inputCls(Boolean(errors.firstName))}
                />
              </Field>
              <Field label="Last Name" error={errors.lastName} htmlFor="lastName">
                <input
                  id="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                  className={inputCls(Boolean(errors.lastName))}
                />
              </Field>
            </div>
            <Field label="Phone Number" error={errors.phone} htmlFor="phone">
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                className={inputCls(Boolean(errors.phone))}
              />
            </Field>
            <Field label="Email Address" required error={errors.email} htmlFor="email">
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className={inputCls(Boolean(errors.email))}
              />
            </Field>

            <fieldset className="pt-2">
              <legend className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-taupe sm:text-[0.72rem] sm:tracking-[0.25em]">
                Will you likely attend our wedding?
              </legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <RadioCard
                  name="attending"
                  value="yes"
                  checked={form.attending === "yes"}
                  onChange={() => update("attending", "yes")}
                  title="Yes, I'll be there!"
                  subtitle="Save my place"
                />
                <RadioCard
                  name="attending"
                  value="no"
                  checked={form.attending === "no"}
                  onChange={() => {
                    update("attending", "no");
                    update("guests", "");
                  }}
                  title="Sorry, I can't attend"
                  subtitle="Sending love from afar"
                />
              </div>
              {errors.attending && (
                <p className="mt-2 text-xs text-destructive">{errors.attending}</p>
              )}
            </fieldset>

            {form.attending === "yes" && (
              <fieldset className="animate-in fade-in duration-500 pt-2">
                <legend className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-taupe sm:text-[0.72rem] sm:tracking-[0.25em]">
                  How many guests, including yourself?
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(["1", "2"] as const).map((guestCount) => (
                    <RadioCard
                      key={guestCount}
                      name="guests"
                      value={guestCount}
                      checked={form.guests === guestCount}
                      onChange={() => update("guests", guestCount)}
                      title={guestCount}
                      subtitle={guestCount === "1" ? "Just me" : "Me + one"}
                      compact
                    />
                  ))}
                </div>
                {errors.guests && <p className="mt-2 text-xs text-destructive">{errors.guests}</p>}
              </fieldset>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-[6px] bg-charcoal px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-ivory transition-all hover:bg-charcoal/90 disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Sending…" : "Submit RSVP"}
                {!submitting && (
                  <span className="inline-block h-px w-6 bg-champagne transition-all group-hover:w-10" />
                )}
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Your information will only be used for wedding planning and communication.
              </p>
              {submitMessage && (
                <p className="mt-3 text-sm text-taupe">{submitMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>

      {confirmation && <ConfirmModal type={confirmation} onClose={closeConfirm} />}
    </section>
  );
}

function inputCls(hasError: boolean) {
  return [
    "block w-full rounded-[6px] border bg-background px-3 py-2.5 text-[0.95rem] text-charcoal outline-none transition-colors sm:px-4 sm:py-3 sm:text-base",
    "placeholder:text-muted-foreground/70",
    "focus:border-champagne focus:ring-2 focus:ring-champagne/25",
    hasError ? "border-destructive/70" : "border-border",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-taupe sm:mb-2 sm:text-[0.7rem] sm:tracking-[0.25em]"
      >
        {label}
        {required && <span className="ml-1 text-champagne">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  subtitle,
  compact,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <label
      className={[
        "relative flex cursor-pointer items-center gap-3 rounded-[6px] border bg-card transition-all",
        compact ? "px-4 py-3" : "px-5 py-4",
        checked
          ? "border-champagne shadow-[0_0_0_1px_var(--color-champagne)]"
          : "border-border hover:border-taupe/50",
      ].join(" ")}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden
        className={[
          "grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-all",
          checked ? "border-champagne" : "border-border",
        ].join(" ")}
      >
        <span
          className={`h-2 w-2 rounded-full bg-champagne transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
      <span className="min-w-0">
        <span className="block font-serif text-lg leading-tight text-charcoal">{title}</span>
        {subtitle && <span className="block text-xs text-muted-foreground">{subtitle}</span>}
      </span>
    </label>
  );
}

function ConfirmModal({ type, onClose }: { type: "yes" | "no"; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const content = useMemo(
    () =>
      type === "yes"
        ? {
            title: "Thank you for confirming ❤️",
            body: "We've reserved a place for you. The official invitation, venue address, schedule, and all wedding details will be shared approximately 3 months before our wedding date. We can't wait to celebrate with you!",
          }
        : {
            title: "Thank you for letting us know",
            body: "We truly appreciate your response and hope to celebrate with you another time. ❤️",
          },
    [type],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 px-4 py-8"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-[10px] border border-border bg-card p-8 text-center shadow-2xl md:p-10"
      >
        <div className="flex justify-center">
          <Monogram />
        </div>
        <div className="mt-5 flex justify-center">
          <Hairline />
        </div>
        <h3
          id="confirm-title"
          className="mt-6 font-serif text-2xl leading-tight text-charcoal md:text-3xl"
        >
          {content.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          {content.body}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex items-center gap-3 rounded-[6px] border border-charcoal px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Closing() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={CLOSING}
        alt="Chandeliers illuminating an intimate ballroom at night"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center text-ivory md:py-44">
        <div data-reveal className="reveal flex justify-center">
          <Hairline className="!bg-ivory/70" />
        </div>
        <h2
          data-reveal
          data-reveal-delay="120"
          className="reveal mt-8 font-serif text-4xl leading-tight md:text-6xl"
        >
          Luis <span className="font-light italic text-champagne">&amp;</span> Cyrilla
        </h2>
        <p
          data-reveal
          data-reveal-delay="220"
          className="reveal mt-6 text-[0.72rem] uppercase tracking-[0.4em] text-ivory/85"
        >
          23 — 24 April 2027 · Jakarta, Indonesia
        </p>
        <p
          data-reveal
          data-reveal-delay="320"
          className="reveal mt-8 font-serif text-xl italic text-ivory/90 md:text-2xl"
        >
          "We can't wait to celebrate with you."
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <Monogram />
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
          Jakarta · 2027
        </p>
      </div>
    </footer>
  );
}
