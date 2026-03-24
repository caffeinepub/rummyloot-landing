import { useCallback, useEffect, useRef, useState } from "react";

const DOWNLOAD_URL =
  "https://rummyloot.in?from_gameid=8979123&channelCode=8959779";

const INDIAN_NAMES = [
  "Rahul",
  "Priya",
  "Amit",
  "Sneha",
  "Vikram",
  "Anjali",
  "Ravi",
  "Pooja",
  "Suresh",
  "Kavya",
  "Arjun",
  "Neha",
  "Deepak",
  "Shreya",
  "Manish",
  "Divya",
  "Rohit",
  "Ananya",
  "Sanjay",
  "Meena",
];

// ── Utility ──────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function formatNumber(n: number): string {
  if (n >= 1_00_00_000) return `${(n / 1_00_00_000).toFixed(1)}Cr+`;
  if (n >= 1_00_000) return `${(n / 1_00_000).toFixed(1)}L+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K+`;
  return `${n}`;
}

// ── Floating Notification ────────────────────────────────────────────────────
interface Notif {
  id: number;
  name: string;
  exiting: boolean;
}

function FloatingNotifications() {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const idRef = useRef(0);

  const addNotif = useCallback(() => {
    const name = INDIAN_NAMES[Math.floor(Math.random() * INDIAN_NAMES.length)];
    const id = ++idRef.current;
    setNotifs((prev) => [...prev.slice(-2), { id, name, exiting: false }]);

    // Start exit animation after 2.8s
    setTimeout(() => {
      setNotifs((prev) =>
        prev.map((n) => (n.id === id ? { ...n, exiting: true } : n)),
      );
    }, 2800);

    // Remove after 3.2s
    setTimeout(() => {
      setNotifs((prev) => prev.filter((n) => n.id !== id));
    }, 3200);
  }, []);

  useEffect(() => {
    const interval = setInterval(addNotif, 9000);
    const initial = setTimeout(addNotif, 2500);
    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [addNotif]);

  return (
    <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-2 pointer-events-none">
      {notifs.map((n) => (
        <div
          key={n.id}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
            bg-[#121a16] border border-[#00c853]/40 shadow-lg text-[#f2f2f2]
            ${n.exiting ? "notif-exit" : "notif-enter"}`}
        >
          <span className="text-base">🎉</span>
          <span>
            <span className="text-[#f5c542] font-semibold">{n.name}</span> just
            joined!
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Phone Mockup ─────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="phone-float flex justify-center">
      {/* Outer frame */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden"
        style={{
          width: 220,
          height: 440,
          background: "#1a1a1a",
          border: "3px solid #f5c542",
          boxShadow:
            "0 0 40px rgba(245,197,66,0.35), 0 20px 60px rgba(0,0,0,0.7)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0d0d0d] rounded-full z-10" />

        {/* App screen */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            background:
              "linear-gradient(160deg, #0a1f0e 0%, #0d0d0d 60%, #1a1000 100%)",
          }}
        >
          {/* Status bar */}
          <div className="pt-9 px-4 flex justify-between text-[10px] text-[#b9c0b8]">
            <span>9:41</span>
            <span>●●●</span>
          </div>

          {/* Logo row */}
          <div className="flex items-center justify-center mt-3 gap-1.5">
            <span className="text-2xl">🃏</span>
            <span
              className="font-montserrat font-black text-lg tracking-wide"
              style={{
                background: "linear-gradient(135deg, #f5c542, #ffe082)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              RummyLoot
            </span>
          </div>

          {/* Bonus badge */}
          <div
            className="mx-4 mt-3 rounded-xl py-2.5 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,197,66,0.18), rgba(0,200,83,0.12))",
              border: "1px solid rgba(245,197,66,0.4)",
            }}
          >
            <p className="text-[10px] text-[#b9c0b8] uppercase tracking-widest">
              Welcome Bonus
            </p>
            <p
              className="text-2xl font-black font-montserrat"
              style={{
                background: "linear-gradient(135deg, #f5c542, #ffe082)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹101
            </p>
          </div>

          {/* Stats row */}
          <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
            {[
              { label: "Players", value: "1M+" },
              { label: "Payouts", value: "Daily" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg py-2 text-center"
                style={{
                  background: "rgba(18,26,22,0.9)",
                  border: "1px solid rgba(0,200,83,0.3)",
                }}
              >
                <p className="text-[#00c853] font-black text-sm">{s.value}</p>
                <p className="text-[9px] text-[#b9c0b8]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Play button */}
          <div className="flex justify-center mt-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00c853, #00962d)",
                boxShadow: "0 0 20px rgba(0,200,83,0.5)",
              }}
            >
              <span className="text-2xl ml-1">▶</span>
            </div>
          </div>

          {/* Bottom nav stub */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-around px-4">
            {["🏠", "🎮", "💰", "👤"].map((icon) => (
              <span key={icon} className="text-lg opacity-70">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stats Counter ─────────────────────────────────────────────────────────────
function StatCounter({
  value,
  label,
  prefix = "",
  suffix = "",
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2200, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-card rounded-2xl px-6 py-5 text-center">
      <p className="text-3xl md:text-4xl font-black font-montserrat gold-text leading-tight">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </p>
      <p className="text-[#b9c0b8] text-sm mt-1 font-poppins">{label}</p>
    </div>
  );
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
function CountdownTimer() {
  const [seconds, setSeconds] = useState(() => {
    const stored = sessionStorage.getItem("rummy-countdown");
    return stored ? Number.parseInt(stored, 10) : 23 * 3600 + 47 * 60 + 33;
  });

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        const next = s > 0 ? s - 1 : 23 * 3600 + 59 * 60 + 59;
        sessionStorage.setItem("rummy-countdown", String(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {[
        { value: h, label: "HRS" },
        { value: m, label: "MIN" },
        { value: s, label: "SEC" },
      ].map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div
              className="countdown-num w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(18,26,22,0.9)",
                border: "1.5px solid rgba(245,197,66,0.5)",
                boxShadow: "0 0 12px rgba(245,197,66,0.2)",
              }}
            >
              <span
                key={value}
                className="text-2xl md:text-3xl font-black font-montserrat gold-text"
              >
                {pad(value)}
              </span>
            </div>
            <p className="text-[10px] text-[#b9c0b8] mt-1 font-poppins tracking-widest">
              {label}
            </p>
          </div>
          {i < 2 && (
            <span className="text-2xl font-black text-[#f5c542] mb-4 opacity-70">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── CTA Button ────────────────────────────────────────────────────────────────
function CTAButton({
  size = "lg",
  text = "DOWNLOAD APP NOW",
}: { size?: "lg" | "xl"; text?: string }) {
  return (
    <a
      href={DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="hero.primary_button"
      className={`cta-btn inline-flex items-center justify-center rounded-2xl font-montserrat font-black
        uppercase tracking-wider text-[#0d0d0d] no-underline
        ${
          size === "xl"
            ? "px-10 py-5 text-xl md:text-2xl rounded-3xl"
            : "px-8 py-4 text-lg"
        }`}
    >
      {text}
    </a>
  );
}

const SPARK_POSITIONS = Array.from({ length: 12 }, (_, i) => ({
  key: `spark-${i}`,
  left: (i * 8.33 + Math.sin(i * 1.7) * 5) % 100,
  top: (i * 7.5 + Math.cos(i * 2.1) * 8) % 100,
  size: 2 + (i % 3) + 1,
  color: i % 2 === 0 ? "#f5c542" : "#00c853",
  dur: 3 + (i % 4),
  delay: (i * 0.5) % 5,
}));

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0d0d0d", color: "#f2f2f2" }}
    >
      {/* ── Hero ── */}
      <section
        className="aurora-bg relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden"
        data-ocid="hero.section"
      >
        {/* Decorative sparks */}
        {SPARK_POSITIONS.map(({ key, left, top, size, color, dur, delay }) => (
          <span
            key={key}
            className="particle"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: color,
              animation: `particle-drift ${dur}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Trust badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(245,197,66,0.12)",
              border: "1px solid rgba(245,197,66,0.35)",
            }}
          >
            <span className="text-[#00c853] text-xs font-semibold uppercase tracking-widest font-poppins">
              🔥 India's Fastest Growing Rummy App
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-montserrat font-black uppercase leading-tight mb-4"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 4rem)",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="gold-text">Get ₹101</span>
            <br />
            <span style={{ color: "#f2f2f2" }}>Welcome Bonus 🎁</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[#b9c0b8] font-poppins mb-4">
            Download the app &amp; start playing instantly
          </p>

          {/* Trust line */}
          <p
            className="text-sm font-poppins font-medium mb-8"
            style={{ color: "#00c853" }}
          >
            Fast withdrawal&nbsp;&nbsp;|&nbsp;&nbsp;Easy
            signup&nbsp;&nbsp;|&nbsp;&nbsp;Secure platform
          </p>

          {/* Badge + CTA */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins uppercase tracking-widest"
              style={{
                background: "rgba(0,200,83,0.15)",
                border: "1px solid rgba(0,200,83,0.4)",
                color: "#00c853",
              }}
            >
              🔥 Trending Now
            </div>
            <CTAButton size="xl" />
          </div>

          {/* Download badges row */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { icon: "⭐", text: "4.8 Rating" },
              { icon: "🔒", text: "100% Secure" },
              { icon: "⚡", text: "Instant Withdrawal" },
            ].map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-1.5 text-[#b9c0b8] text-xs font-poppins"
              >
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Preview ── */}
      <section
        className="py-16 px-4"
        style={{ background: "#0b0f0d" }}
        data-ocid="preview.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center font-montserrat font-black uppercase tracking-widest mb-3"
            style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#f2f2f2" }}
          >
            See the <span className="gold-text">App in Action</span>
          </h2>
          <p className="text-center text-[#b9c0b8] font-poppins text-sm mb-12">
            Clean interface. Real winnings. Instant cashout.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <PhoneMockup />

            {/* Feature highlights beside phone */}
            <div className="flex flex-col gap-5 max-w-xs">
              {[
                {
                  icon: "💰",
                  title: "₹101 Welcome Bonus",
                  desc: "Credited instantly on sign-up",
                },
                {
                  icon: "👥",
                  title: "1M+ Active Players",
                  desc: "Join India's fastest-growing community",
                },
                {
                  icon: "🚀",
                  title: "Instant Withdrawals",
                  desc: "Cash out in under 60 seconds",
                },
                {
                  icon: "🛡️",
                  title: "Safe & Certified",
                  desc: "RNG-certified fair play guaranteed",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{
                      background: "rgba(245,197,66,0.12)",
                      border: "1px solid rgba(245,197,66,0.3)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-[#f2f2f2] text-sm">
                      {item.title}
                    </p>
                    <p className="font-poppins text-[#b9c0b8] text-xs mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        className="py-16 px-4"
        style={{ background: "#0d0d0d" }}
        data-ocid="features.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center font-montserrat font-black uppercase tracking-widest mb-3"
            style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#f2f2f2" }}
          >
            Why Players <span className="gold-text">Love RummyLoot</span>
          </h2>
          <p className="text-center text-[#b9c0b8] font-poppins text-sm mb-10">
            Everything you need for the ultimate gaming experience
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "⚡",
                title: "Instant Signup",
                desc: "Register in under 60 seconds. No paperwork.",
                border: "gold",
              },
              {
                icon: "🎮",
                title: "Smooth Gameplay",
                desc: "Lag-free tables with real-time card dealing.",
                border: "green",
              },
              {
                icon: "🎁",
                title: "Daily Rewards",
                desc: "Login bonuses, cashback & weekly challenges.",
                border: "gold",
              },
              {
                icon: "🎧",
                title: "24/7 Support",
                desc: "Round-the-clock help via chat & phone.",
                border: "green",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="feature-card rounded-2xl p-5 flex flex-col items-center text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                  style={{
                    background:
                      f.border === "gold"
                        ? "rgba(245,197,66,0.12)"
                        : "rgba(0,200,83,0.12)",
                    border: `1px solid ${
                      f.border === "gold"
                        ? "rgba(245,197,66,0.4)"
                        : "rgba(0,200,83,0.4)"
                    }`,
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="font-poppins font-bold text-[#f2f2f2] text-sm mb-1.5">
                  {f.title}
                </h3>
                <p className="font-poppins text-[#b9c0b8] text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0b1a0e 0%, #0d0d0d 50%, #1a1000 100%)",
        }}
        data-ocid="cta.section"
      >
        <div className="max-w-xl mx-auto relative z-10">
          <p className="text-[#00c853] font-poppins font-semibold text-sm uppercase tracking-widest mb-3">
            🏆 Limited Time Offer
          </p>
          <h2
            className="font-montserrat font-black uppercase leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}
          >
            <span className="gold-text">Ready to Win Big?</span>
          </h2>
          <p className="text-[#b9c0b8] font-poppins mb-8">
            Join millions of players and claim your ₹101 bonus today.
          </p>

          <div className="flex flex-col items-center gap-3">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins uppercase tracking-widest"
              style={{
                background: "rgba(0,200,83,0.15)",
                border: "1px solid rgba(0,200,83,0.4)",
                color: "#00c853",
              }}
            >
              🔥 Trending Now
            </div>
            <CTAButton size="xl" />
            <p className="text-[#b9c0b8] text-xs font-poppins mt-2">
              No credit card required · Free to download
            </p>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section
        className="py-16 px-4"
        style={{ background: "#0b0f0d" }}
        data-ocid="social.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center font-montserrat font-black uppercase tracking-widest mb-3"
            style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#f2f2f2" }}
          >
            Thousands of Users{" "}
            <span className="gold-text">Already Playing</span>
          </h2>
          <p className="text-center text-[#b9c0b8] font-poppins text-sm mb-10">
            Real players, real winnings, real fun.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCounter value={500000} label="Players Joined" />
            <StatCounter
              value={10_00_00_000}
              label="Bonus Distributed"
              prefix="₹"
            />
            <StatCounter
              value={48}
              label="App Rating"
              prefix=""
              suffix="★ / 5"
            />
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              {
                name: "Rohit K.",
                city: "Mumbai",
                text: "Got my ₹101 bonus within seconds of signing up! Already won ₹500 today.",
                stars: 5,
              },
              {
                name: "Priya S.",
                city: "Delhi",
                text: "Best rummy app I've used. Fast withdrawals and smooth gameplay!",
                stars: 5,
              },
              {
                name: "Amit V.",
                city: "Bangalore",
                text: "Joined 2 weeks ago. Already cashed out 3 times. Totally legit!",
                stars: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-5"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid rgba(245,197,66,0.2)",
                }}
              >
                <div className="flex gap-0.5 mb-2">
                  {"★★★★★".split("").map((star, si) => (
                    <span
                      key={si.toString()}
                      className="text-[#f5c542] text-sm"
                    >
                      {star}
                    </span>
                  ))}
                </div>
                <p className="text-[#b9c0b8] font-poppins text-xs leading-relaxed mb-3">
                  "{t.text}"
                </p>
                <p className="font-poppins font-semibold text-[#f2f2f2] text-xs">
                  {t.name}{" "}
                  <span className="text-[#b9c0b8] font-normal">· {t.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Urgency / Countdown ── */}
      <section
        className="py-16 px-4"
        style={{ background: "#0d0d0d" }}
        data-ocid="urgency.section"
      >
        <div className="max-w-lg mx-auto">
          <div
            className="urgency-panel rounded-3xl p-8 text-center"
            style={{ background: "var(--card-bg)" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(245,197,66,0.12)",
                border: "1px solid rgba(245,197,66,0.35)",
              }}
            >
              <span className="text-[#f5c542] text-xs font-bold uppercase tracking-widest font-poppins">
                ⏰ Offer Expires In
              </span>
            </div>

            <h2
              className="font-montserrat font-black uppercase leading-tight mb-2"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}
            >
              <span className="gold-text">Limited Time Bonus</span>
            </h2>
            <p className="text-[#b9c0b8] font-poppins text-sm mb-2">
              Claim your{" "}
              <span className="text-[#f5c542] font-semibold">
                ₹101 welcome bonus
              </span>{" "}
              before it expires!
            </p>

            <CountdownTimer />

            <div className="mt-8">
              <CTAButton size="xl" text="CLAIM BONUS NOW" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section
        className="py-8 px-4 text-center"
        style={{
          background: "#0b0f0d",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
        data-ocid="disclaimer.section"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-[#b9c0b8] font-poppins text-xs leading-relaxed">
            ⚠️ Play responsibly. This app is for entertainment purposes only.
            Please ensure online gaming is permitted in your jurisdiction before
            playing. Must be 18+ to participate.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-6 px-4 text-center"
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p className="text-[#b9c0b8] font-poppins text-xs">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5c542] hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* ── Sticky Floating Button ── */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm"
        data-ocid="sticky.button"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-btn flex items-center justify-center w-full py-4 rounded-2xl font-montserrat font-black uppercase tracking-wider text-[#0d0d0d] text-base no-underline"
        >
          INSTALL NOW 🚀
        </a>
      </div>

      {/* ── Floating Notifications ── */}
      <FloatingNotifications />
    </div>
  );
}
