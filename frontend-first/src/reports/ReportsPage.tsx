import { FormEvent, useEffect, useState } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080").replace(
  /\/$/,
  "",
);

type DashboardSummary = {
  totalResponses: number;
  attendingYes: number;
  attendingNo: number;
  confirmedSeats: number;
  latestSubmittedAt: string | null;
};

const EMPTY_SUMMARY: DashboardSummary = {
  totalResponses: 0,
  attendingYes: 0,
  attendingNo: 0,
  confirmedSeats: 0,
  latestSubmittedAt: null,
};

export default function ReportsPage() {
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState<DashboardSummary>(EMPTY_SUMMARY);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });

  useEffect(() => {
    let cancelled = false;

    const loadSummary = async () => {
      try {
        setLoadingSummary(true);
        const response = await fetch(`${API_BASE_URL}/api/rsvps`);
        const payload = (await response.json()) as { summary?: DashboardSummary; message?: string };

        if (!response.ok) {
          throw new Error(payload.message || "Unable to load report summary.");
        }

        if (cancelled) return;
        setSummary(payload.summary ?? EMPTY_SUMMARY);
      } catch (error) {
        if (cancelled) return;
        setFeedback({
          type: "error",
          message: error instanceof Error ? error.message : "Unable to load report summary.",
        });
      } finally {
        if (!cancelled) {
          setLoadingSummary(false);
        }
      }
    };

    void loadSummary();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setFeedback({
        type: "error",
        message: "Please enter the destination email address.",
      });
      return;
    }

    try {
      setSending(true);
      setFeedback({ type: "", message: "" });

      const response = await fetch(`${API_BASE_URL}/api/reports/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send the report email.");
      }

      setFeedback({
        type: "success",
        message: payload.message || "Report email sent successfully.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send the report email.",
      });
    } finally {
      setSending(false);
    }
  };

  const summaryRows = [
    { label: "Total Responses", value: summary.totalResponses },
    { label: "Attending", value: summary.attendingYes },
    { label: "Unable to Attend", value: summary.attendingNo },
    { label: "Confirmed Seats", value: summary.confirmedSeats },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(213,192,165,0.22),transparent_38%),linear-gradient(180deg,#f7f1e8_0%,#fbf8f3_100%)] px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-2xl rounded-[30px] border border-[rgba(200,182,153,0.45)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,249,243,0.95))] p-6 shadow-[0_40px_120px_-54px_rgba(58,42,31,0.38)] sm:p-8">
          <div className="text-center">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.38em] text-taupe">
              Report Delivery
            </p>
            <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">
              Send RSVP Report
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Send the latest RSVP summary to any email address with both PDF and Excel attachments.
            </p>
          </div>

          <div className="mt-8 rounded-[22px] border border-champagne/20 bg-white/70 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-champagne/20 pb-4">
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-taupe">
                  Latest Summary
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {loadingSummary ? "Loading current RSVP numbers..." : "Current RSVP totals ready to send."}
                </p>
              </div>
              <div className="text-right text-[0.68rem] uppercase tracking-[0.22em] text-taupe">
                PDF + XLSX
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {summaryRows.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-[16px] border border-champagne/15 bg-cream/35 px-4 py-3"
                >
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-taupe">
                    {item.label}
                  </span>
                  <span className="font-serif text-2xl text-charcoal">
                    {loadingSummary ? "..." : item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Attachments included: <span className="text-charcoal">WeddingRsvpReport.pdf</span> and{" "}
              <span className="text-charcoal">WeddingRsvpReport.xlsx</span>.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <label className="block">
              <span className="mb-3 block text-[0.72rem] font-medium uppercase tracking-[0.28em] text-taupe">
                Destination Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                className="block w-full rounded-[18px] border border-border bg-white/90 px-5 py-4 text-sm text-charcoal outline-none transition-colors focus:border-champagne focus:ring-2 focus:ring-champagne/20"
              />
            </label>

            {feedback.message && (
              <div
                className={`mt-4 rounded-[16px] px-4 py-3 text-sm ${
                  feedback.type === "success"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground">
                The email will include the summary details and attach the latest Excel and PDF report files.
              </p>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-charcoal px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
