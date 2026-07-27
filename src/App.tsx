import { useEffect, useMemo, useState } from "react";

import { useReveal } from "@/hooks/use-reveal";

// ---- Unsplash imagery (curated: venues, florals, table settings, silhouettes)
const HERO =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80";
const STORY =
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80";
const RSVP_IMG =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80";
const CLOSING =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80";

const GALLERY: { src: string; alt: string; span?: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Candlelit reception table with soft neutral florals",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=80",
    alt: "Delicate white bridal bouquet resting on a linen chair",
  },
  {
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
    alt: "Silhouette of a couple embracing at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=80",
    alt: "Elegant place setting with crystal glassware and cream napkin",
  },
  {
    src: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=1200&q=80",
    alt: "Grand ballroom with arched windows and warm chandeliers",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1470905906913-f0d3d3a6a1f4?auto=format&fit=crop&w=900&q=80",
    alt: "Neutral floral arrangement with pale roses and eucalyptus",
  },
  {
    src: "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=900&q=80",
    alt: "Architectural detail of a marble colonnade at dusk",
  },
];

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif tracking-[0.25em] text-[0.72rem] uppercase text-charcoal ${className}`}
    >
      L <span className="text-champagne">&</span> C
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
    { href: "#gallery", label: "Gallery" },
    { href: "#rsvp", label: "RSVP" },
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
            L <span className="text-champagne">&</span> C
          </span>
        </a>
        <ul className="flex items-center gap-6 md:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[0.72rem] font-medium uppercase tracking-[0.25em] transition-colors hover:text-champagne ${
                  scrolled ? "text-charcoal" : "text-ivory/90"
                }`}
              >
                {link.label}
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
          <span className="mx-4 inline-block align-middle text-champagne italic font-light">
            &amp;
          </span>
          <br className="sm:hidden" />
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
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
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
    },
    {
      label: "The Place",
      title: "Jakarta",
      sub: "Indonesia",
    },
    {
      label: "The Invitation",
      title: "Coming Soon",
      sub: "Full details shared ~3 months prior",
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
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {items.map((item, index) => (
            <article
              key={item.label}
              data-reveal
              data-reveal-delay={String(index * 140)}
              className="reveal flex flex-col items-center rounded-lg border border-border bg-card px-8 py-12 text-center shadow-[0_4px_24px_-16px_rgba(50,40,30,0.25)]"
            >
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-taupe">
                {item.label}
              </p>
              <Hairline className="mt-5" />
              <h3 className="mt-5 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.sub}</p>
            </article>
          ))}
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
              className={`reveal group relative overflow-hidden rounded-md ${image.span ?? ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
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

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 6) {
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
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setConfirmation(form.attending as "yes" | "no");
  };

  const closeConfirm = () => {
    setConfirmation(null);
    setForm(initialForm);
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
              <Field label="Last Name" required error={errors.lastName} htmlFor="lastName">
                <input
                  id="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                  className={inputCls(Boolean(errors.lastName))}
                />
              </Field>
            </div>
            <Field label="Phone Number" required error={errors.phone} htmlFor="phone">
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
              <legend className="text-[0.72rem] font-medium uppercase tracking-[0.25em] text-taupe">
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
                <legend className="text-[0.72rem] font-medium uppercase tracking-[0.25em] text-taupe">
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
    "block w-full rounded-[6px] border bg-background px-4 py-3 text-base text-charcoal outline-none transition-colors",
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
        className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.25em] text-taupe"
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
