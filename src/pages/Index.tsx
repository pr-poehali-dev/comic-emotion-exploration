import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Slide config ─────────────────────────────────────────
const SLIDES = [
  "intro",
  "conflict",
  "zlyuka",
  "friend",
  "steps",
  "victory",
  "rules",
  "final",
] as const;
type SlideId = (typeof SLIDES)[number];

// ─── Breathing phase ─────────────────────────────────────
type BreathPhase = "idle" | "in" | "out";

export default function Index() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>("idle");
  const breathTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = SLIDES.length;
  const slide = SLIDES[slideIdx];

  function goTo(idx: number) {
    if (idx < 0 || idx >= total) return;
    setSlideIdx(idx);
    setAnimKey((k) => k + 1);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") goTo(slideIdx + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(slideIdx - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slideIdx]);

  function startBreath() {
    setBreathPhase("in");
    breathTimer.current = setTimeout(() => {
      setBreathPhase("out");
      breathTimer.current = setTimeout(() => setBreathPhase("idle"), 4000);
    }, 4000);
  }

  useEffect(() => () => {
    if (breathTimer.current) clearTimeout(breathTimer.current);
  }, []);

  const progressPct = ((slideIdx + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-nunito flex flex-col overflow-hidden select-none">

      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center gap-4">
        <div className="flex-1 h-1.5 bg-[#E8D8C8] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF8A65] to-[#FFB74D] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="font-nunito text-xs font-bold text-[#C4956A] whitespace-nowrap">
          {slideIdx + 1} / {total}
        </span>
      </header>

      {/* ── Slide area ── */}
      <main className="flex-1 pt-12 pb-20 flex items-center justify-center px-4">
        <div key={animKey} className="w-full max-w-2xl animate-slide-up">
          {slide === "intro"    && <SlideIntro />}
          {slide === "conflict" && <SlideConflict />}
          {slide === "zlyuka"   && <SlideZlyuka />}
          {slide === "friend"   && <SlideFriend />}
          {slide === "steps"    && <SlideSteps breathPhase={breathPhase} onBreath={startBreath} />}
          {slide === "victory"  && <SlideVictory />}
          {slide === "rules"    && <SlideRules />}
          {slide === "final"    && <SlideFinal />}
        </div>
      </main>

      {/* ── Bottom nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <button
          onClick={() => goTo(slideIdx - 1)}
          disabled={slideIdx === 0}
          className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#C4956A] hover:bg-[#FFF0E0] transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
        >
          <Icon name="ChevronLeft" size={22} />
        </button>

        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slideIdx
                  ? "w-8 h-3 bg-[#FF8A65]"
                  : i < slideIdx
                  ? "w-3 h-3 bg-[#FFB74D]"
                  : "w-3 h-3 bg-[#E8D8C8]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(slideIdx + 1)}
          disabled={slideIdx === total - 1}
          className="w-12 h-12 rounded-2xl bg-[#FF8A65] shadow-md flex items-center justify-center text-white hover:bg-[#F4794E] transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
        >
          <Icon name="ChevronRight" size={22} />
        </button>
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 1 — Intro
// ═══════════════════════════════════════════════════════════
function SlideIntro() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-8">
      <div className="animate-bounce-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <div className="text-8xl animate-float">🤜🤛</div>
      </div>

      <h1
        className="font-nunito text-4xl md:text-5xl font-black text-[#3D2B1F] leading-tight animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Что такое<br />
        <span className="text-[#FF8A65]">конфликт?</span>
      </h1>

      <p
        className="font-nunito text-lg text-[#7A5C4E] max-w-md leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.35s", opacity: 0 }}
      >
        Когда вы с друзьями спорите, ссоритесь и ругаетесь — это и есть конфликт.
      </p>

      <div className="w-full flex flex-col gap-3 mt-2 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
        <Bubble color="#FFE0B2" align="left" speaker="👦">
          «Я хочу играть в мяч!»
        </Bubble>
        <Bubble color="#FFCDD2" align="right" speaker="👧">
          «А я не хочу! Я хочу рисовать!»
        </Bubble>
        <Bubble color="#FFE0B2" align="left" speaker="👦">
          «Отдай, это моя игрушка!»
        </Bubble>
        <Bubble color="#FFCDD2" align="right" speaker="👧">
          «Нет, я тоже хочу поиграть!»
        </Bubble>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 2 — Злюка
// ═══════════════════════════════════════════════════════════
function SlideConflict() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-6">
      <div className="animate-bounce-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <div className="text-7xl animate-wiggle">😡</div>
      </div>

      <h2
        className="font-nunito text-3xl md:text-4xl font-black text-[#3D2B1F] animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Внутри нас просыпается
        <span className="text-[#E53935]"> Злюка!</span>
      </h2>

      <p className="font-nunito text-base text-[#7A5C4E] animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
        Когда не дали игрушку, кто-то толкнул — злость просыпается.
      </p>

      <div className="w-full grid grid-cols-1 gap-3 mt-2">
        {[
          { emoji: "😈", text: "«Кричи!»" },
          { emoji: "😈", text: "«Толкай!»" },
          { emoji: "😈", text: "«Это твоё! Забери!»" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-[#FFEBEE] border-2 border-[#EF9A9A] rounded-2xl px-5 py-3 animate-slide-in-right"
            style={{ animationDelay: `${0.4 + i * 0.1}s`, opacity: 0 }}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-nunito font-bold text-[#C62828] text-lg">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 bg-white rounded-2xl border-2 border-[#FFB74D] px-6 py-4 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
        <p className="font-nunito font-extrabold text-[#E65100] text-base">
          Но правильно ли она говорит? Разве так можно? 🤔
        </p>
        <p className="font-nunito text-[#7A5C4E] text-sm mt-1">
          Кто-то заплачет. Кто-то обидится. Дружба может испортиться.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 3 — Спокойный Друг
// ═══════════════════════════════════════════════════════════
function SlideZlyuka() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-6">
      <div className="flex items-center gap-8 animate-bounce-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <div className="flex flex-col items-center gap-1">
          <div className="text-6xl animate-wiggle">😈</div>
          <span className="font-caveat text-base font-semibold text-[#C62828]">Злюка</span>
        </div>
        <div className="text-3xl font-black text-[#C4956A]">VS</div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-6xl animate-float">🌟</div>
          <span className="font-caveat text-base font-semibold text-[#2E7D32]">Спокойный Друг</span>
        </div>
      </div>

      <h2
        className="font-nunito text-3xl font-black text-[#3D2B1F] animate-slide-up"
        style={{ animationDelay: "0.25s", opacity: 0 }}
      >
        Нам нужен
        <span className="text-[#43A047]"> Спокойный Друг!</span>
      </h2>

      <p className="font-nunito text-base text-[#7A5C4E] max-w-sm animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
        Он тоже живёт внутри нас. Его только нужно позвать 💛
      </p>

      <div className="w-full grid grid-cols-1 gap-3 mt-1">
        {[
          { emoji: "😊", text: "«Подожди…»" },
          { emoji: "😊", text: "«Давай подумаем»" },
          { emoji: "😊", text: "«Можно договориться»" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-[#E8F5E9] border-2 border-[#A5D6A7] rounded-2xl px-5 py-3 animate-slide-up"
            style={{ animationDelay: `${0.45 + i * 0.1}s`, opacity: 0 }}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-nunito font-bold text-[#2E7D32] text-lg">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 4 — 5 шагов
// ═══════════════════════════════════════════════════════════
function SlideFriend() {
  const steps = [
    { num: "1", icon: "🖐", title: "Поймай Злюку", desc: "Когда хочется ударить или крикнуть — скажи: «Стоп, Злюка!»", bg: "#FFECB3", border: "#FFD54F" },
    { num: "2", icon: "🌬️", title: "Успокой тело", desc: "Остановись и глубоко подыши. Скажи: «Я спокоен, я справлюсь»", bg: "#E3F2FD", border: "#90CAF9" },
    { num: "3", icon: "💛", title: "Позови Друга", desc: "Спроси: «Что я хочу? Что хочет другой?» Скажи о чувствах", bg: "#E8F5E9", border: "#A5D6A7" },
    { num: "4", icon: "✅", title: "Найдите выход", desc: "Играйте вместе, поменяйтесь или выберите другую игру", bg: "#F3E5F5", border: "#CE93D8" },
    { num: "5", icon: "🙋", title: "Попроси помощь", desc: "Не получается? Скажи взрослому: «Помогите, пожалуйста»", bg: "#FFF3E0", border: "#FFCC80" },
  ];

  return (
    <div className="flex flex-col items-center text-center gap-5 py-6">
      <div className="text-6xl animate-bounce-in animate-float" style={{ animationDelay: "0.1s", opacity: 0 }}>🤝</div>
      <h2
        className="font-nunito text-3xl font-black text-[#3D2B1F] animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        5 шагов, чтобы
        <span className="text-[#FF8A65]"> победить Злюку</span>
      </h2>

      <div className="w-full flex flex-col gap-3 mt-2">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-2xl border-2 px-5 py-4 text-left animate-slide-up"
            style={{ backgroundColor: s.bg, borderColor: s.border, animationDelay: `${0.25 + i * 0.1}s`, opacity: 0 }}
          >
            <div className="w-8 h-8 rounded-xl bg-white/70 flex items-center justify-center flex-shrink-0 font-nunito font-black text-[#3D2B1F] text-sm">
              {s.num}
            </div>
            <div>
              <span className="text-lg mr-2">{s.icon}</span>
              <span className="font-nunito font-extrabold text-[#3D2B1F] text-base">{s.title}</span>
              <p className="font-nunito text-sm text-[#5D4037] mt-0.5 leading-snug">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 5 — Дыхательное упражнение
// ═══════════════════════════════════════════════════════════
interface SlideStepsProps {
  breathPhase: BreathPhase;
  onBreath: () => void;
}

function SlideSteps({ breathPhase, onBreath }: SlideStepsProps) {
  const isActive = breathPhase !== "idle";
  const isIn = breathPhase === "in";

  return (
    <div className="flex flex-col items-center text-center gap-6 py-6">
      <div className="text-5xl animate-bounce-in" style={{ animationDelay: "0.1s", opacity: 0 }}>🌬️</div>
      <h2
        className="font-nunito text-3xl font-black text-[#3D2B1F] animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Давайте вместе подышим!
      </h2>
      <p className="font-nunito text-base text-[#7A5C4E] animate-fade-in max-w-sm" style={{ animationDelay: "0.3s", opacity: 0 }}>
        Когда мы злимся — тело очень напряжено. Нажми на круг!
      </p>

      <div
        className="flex flex-col items-center gap-4 animate-fade-in"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
          {/* Glow ring */}
          <div
            className="absolute rounded-full transition-all ease-in-out"
            style={{
              width: isIn ? 230 : isActive ? 170 : 0,
              height: isIn ? 230 : isActive ? 170 : 0,
              background: "radial-gradient(circle, rgba(129,212,250,0.4), rgba(179,229,252,0.2))",
              transitionDuration: "4000ms",
            }}
          />
          {/* Circle button */}
          <button
            onClick={!isActive ? onBreath : undefined}
            className="relative rounded-full flex flex-col items-center justify-center font-nunito font-extrabold text-white shadow-xl transition-all ease-in-out"
            style={{
              width: isActive ? (isIn ? 200 : 150) : 160,
              height: isActive ? (isIn ? 200 : 150) : 160,
              background: isIn
                ? "linear-gradient(135deg, #42A5F5, #1E88E5)"
                : isActive
                ? "linear-gradient(135deg, #66BB6A, #43A047)"
                : "linear-gradient(135deg, #FF8A65, #FF7043)",
              transitionDuration: "4000ms",
              cursor: isActive ? "default" : "pointer",
            }}
          >
            <span className="text-4xl mb-1">
              {breathPhase === "idle" ? "🫁" : isIn ? "⬆️" : "⬇️"}
            </span>
            <span className="text-sm leading-none px-3 text-center">
              {breathPhase === "idle"
                ? "Нажми!"
                : isIn
                ? "Вдох…"
                : "Выдох…"}
            </span>
          </button>
        </div>

        {isActive && (
          <p className="font-caveat text-2xl font-semibold text-[#1565C0] animate-fade-in">
            Я спокоен, я справлюсь ✨
          </p>
        )}
        {!isActive && (
          <p className="font-nunito text-sm text-[#A09090]">
            4 сек вдох → 4 сек выдох
          </p>
        )}
      </div>

      <div className="w-full bg-[#E8F5E9] border-2 border-[#A5D6A7] rounded-2xl px-5 py-4 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
        <p className="font-nunito text-sm text-[#2E7D32] font-semibold text-left">
          💬 «Мне обидно» · «Я не хочу ссориться» · «Извини, я не хотел обидеть»
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 6 — Победа Спокойного Друга
// ═══════════════════════════════════════════════════════════
function SlideVictory() {
  const [phase, setPhase] = useState<"battle" | "win" | "gone">("battle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("win"),  1800);
    const t2 = setTimeout(() => setPhase("gone"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-6 py-6">
      <h2
        className="font-nunito text-3xl font-black text-[#3D2B1F] animate-slide-up"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        {phase === "battle" && <>Битва внутри нас…</>}
        {phase === "win"    && <>Спокойный Друг <span className="text-[#43A047]">побеждает!</span></>}
        {phase === "gone"   && <>Злюка ушла, а <span className="text-[#FF8A65]">дружба осталась!</span></>}
      </h2>

      {/* Arena */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 200 }}>

        {/* Злюка */}
        <div
          className="absolute flex flex-col items-center gap-1 transition-all duration-1000 ease-in-out"
          style={{
            left: phase === "battle" ? "10%" : phase === "win" ? "5%" : "-20%",
            opacity: phase === "gone" ? 0 : 1,
            transform: phase === "win" ? "scale(0.7) rotate(-15deg)" : phase === "gone" ? "scale(0.3) rotate(-30deg)" : "scale(1)",
            transitionDuration: phase === "gone" ? "900ms" : "700ms",
          }}
        >
          <span className="text-6xl" style={{ filter: phase === "win" ? "grayscale(0.6)" : "none" }}>😈</span>
          <span className="font-caveat text-base font-semibold text-[#C62828]">Злюка</span>
          {phase === "battle" && (
            <span className="font-caveat text-xs text-[#E53935] animate-pulse-soft">«Кричи! Толкай!»</span>
          )}
          {phase === "win" && (
            <span className="font-caveat text-xs text-[#999]">«Нет…»</span>
          )}
        </div>

        {/* VS / результат */}
        <div className="absolute flex flex-col items-center gap-1 transition-all duration-500" style={{ left: "50%", transform: "translateX(-50%)" }}>
          {phase === "battle" && (
            <span className="font-nunito font-black text-3xl text-[#C4956A] animate-pulse-soft">⚡ VS ⚡</span>
          )}
          {phase === "win" && (
            <div className="flex flex-col items-center animate-bounce-in">
              <span className="text-4xl">🏆</span>
              <span className="font-caveat text-lg font-bold text-[#F9A825]">Победа!</span>
            </div>
          )}
          {phase === "gone" && (
            <div className="flex flex-col items-center animate-bounce-in">
              <span className="text-5xl">🤝</span>
              <span className="font-caveat text-lg font-bold text-[#43A047]">Ура!</span>
            </div>
          )}
        </div>

        {/* Спокойный Друг */}
        <div
          className="absolute flex flex-col items-center gap-1 transition-all duration-700 ease-in-out"
          style={{
            right: phase === "battle" ? "10%" : "8%",
            transform: phase === "win" ? "scale(1.2)" : phase === "gone" ? "scale(1.15)" : "scale(1)",
          }}
        >
          <span
            className="text-6xl"
            style={{
              filter: phase !== "battle" ? "drop-shadow(0 0 12px #FDD835)" : "none",
              transition: "filter 0.7s",
            }}
          >
            🌟
          </span>
          <span className="font-caveat text-base font-semibold text-[#2E7D32]">Спокойный Друг</span>
          {phase === "battle" && (
            <span className="font-caveat text-xs text-[#43A047] animate-pulse-soft">«Подожди…»</span>
          )}
          {phase !== "battle" && (
            <span className="font-caveat text-xs text-[#2E7D32]">«Мы справились!»</span>
          )}
        </div>
      </div>

      {/* Сообщение под ареной */}
      {phase === "gone" && (
        <div
          className="w-full bg-[#E8F5E9] border-2 border-[#A5D6A7] rounded-2xl px-6 py-5 animate-bounce-in flex flex-col gap-2"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <p className="font-nunito font-extrabold text-[#2E7D32] text-lg">
            И вот — Злюка ушла, а дружба осталась!
          </p>
          <div className="flex flex-col gap-1 mt-1">
            {["✔ Играли вместе", "✔ Поменялись игрушками", "✔ Нашли другую игру"].map((t, i) => (
              <span key={i} className="font-nunito text-sm text-[#388E3C]">{t}</span>
            ))}
          </div>
        </div>
      )}

      {phase === "battle" && (
        <p className="font-nunito text-sm text-[#A09090] animate-fade-in">
          Смотри, что будет дальше…
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 7 — Финальные титры «Правила Дружбы»
// ═══════════════════════════════════════════════════════════
const RULES = [
  { emoji: "🙋", text: "Сначала вежливо спроси!" },
  { emoji: "🤝", text: "Всегда можно поиграть вместе!" },
  { emoji: "🚫", text: "Драться и ругаться не весело!" },
];

function SlideRules() {
  const [visible, setVisible] = useState<number[]>([]);
  const [showEnd, setShowEnd] = useState(false);

  useEffect(() => {
    RULES.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), 900 + i * 1000);
    });
    setTimeout(() => setShowEnd(true), 900 + RULES.length * 1000 + 400);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center text-center overflow-hidden rounded-2xl"
      style={{
        minHeight: 480,
        background: "linear-gradient(180deg, #0D0D2B 0%, #1A1040 60%, #2C1654 100%)",
      }}
    >
      {/* Звёздное небо */}
      <Stars />

      {/* Заголовок — кинотитр */}
      <div className="relative z-10 mt-8 mb-2 flex flex-col items-center gap-1 animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <span className="font-caveat text-[#F9A825] text-sm tracking-widest uppercase">— конец —</span>
        <h2 className="font-nunito font-black text-3xl text-white drop-shadow-lg">
          Правила Дружбы
        </h2>
        <div className="w-24 h-0.5 bg-[#F9A825] rounded-full mt-1 opacity-70" />
      </div>

      {/* Правила — появляются по очереди */}
      <div className="relative z-10 flex flex-col gap-4 w-full px-5 mt-6">
        {RULES.map((rule, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
              opacity: visible.includes(i) ? 1 : 0,
              transform: visible.includes(i) ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="text-3xl flex-shrink-0">{rule.emoji}</span>
            <span className="font-nunito font-extrabold text-lg text-white text-left leading-snug">
              {rule.text}
            </span>
          </div>
        ))}
      </div>

      {/* Финальная строка */}
      <div
        className="relative z-10 mt-8 flex flex-col items-center gap-2 pb-8"
        style={{
          opacity: showEnd ? 1 : 0,
          transform: showEnd ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <div className="flex gap-2 text-2xl animate-pulse-soft">
          <span>⭐</span><span>💛</span><span>⭐</span>
        </div>
        <p className="font-caveat text-[#FFD54F] text-xl font-bold">
          Будьте лучшими друзьями!
        </p>
      </div>
    </div>
  );
}

function Stars() {
  const positions = [
    [12,8],[28,15],[55,5],[70,12],[85,7],[95,20],[8,30],[40,25],[65,22],[90,35],
    [20,45],[50,40],[75,38],[15,60],[35,55],[60,52],[80,58],[25,72],[48,68],[72,65],
    [92,50],[5,82],[30,78],[58,75],[82,80],[42,88],[65,90],[18,92],[76,95],[88,88],
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {positions.map(([x, y], i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse-soft"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: i % 5 === 0 ? 3 : 2,
            height: i % 5 === 0 ? 3 : 2,
            opacity: 0.4 + (i % 4) * 0.15,
            animationDelay: `${(i * 0.3) % 2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Helper — Speech bubble
// ═══════════════════════════════════════════════════════════
interface BubbleProps {
  color: string;
  align: "left" | "right";
  speaker: string;
  children: React.ReactNode;
}

function Bubble({ color, align, speaker, children }: BubbleProps) {
  return (
    <div className={`flex items-end gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <span className="text-2xl flex-shrink-0">{speaker}</span>
      <div
        className="rounded-2xl px-4 py-3 font-nunito font-semibold text-[#3D2B1F] text-sm max-w-xs text-left shadow-sm"
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 8 — Финальная мысль
// ═══════════════════════════════════════════════════════════
const FINAL_LINES = [
  { text: "Мульттерапия — не про комиксы.", delay: 400 },
  { text: "Это безопасный способ прожить сложную ситуацию.", delay: 1600 },
  { text: "Если ребёнок смог изменить сюжет в комиксе —", delay: 3000 },
  { text: "однажды сможет изменить его и в жизни.", delay: 4200, accent: true },
];

function SlideFinal() {
  const [shown, setShown] = useState<number[]>([]);

  useEffect(() => {
    FINAL_LINES.forEach((line, i) => {
      setTimeout(() => setShown((s) => [...s, i]), line.delay);
    });
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl px-8 py-12"
      style={{
        minHeight: 460,
        background: "linear-gradient(160deg, #1A0533 0%, #2E1060 50%, #0D1B4B 100%)",
      }}
    >
      {/* Тихие звёзды */}
      <Stars />

      {/* Книга / плёнка */}
      <div
        className="relative z-10 text-6xl mb-8"
        style={{
          opacity: shown.includes(0) ? 1 : 0,
          transform: shown.includes(0) ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        🎬
      </div>

      {/* Строки текста */}
      <div className="relative z-10 flex flex-col gap-4 w-full max-w-sm">
        {FINAL_LINES.map((line, i) => (
          <p
            key={i}
            className={`font-nunito leading-snug text-center ${
              line.accent
                ? "font-black text-[#FFD54F] text-xl"
                : "font-semibold text-white/90 text-base"
            }`}
            style={{
              opacity: shown.includes(i) ? 1 : 0,
              transform: shown.includes(i) ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {line.text}
          </p>
        ))}
      </div>

      {/* Декоративная линия под акцентом */}
      <div
        className="relative z-10 mt-6 w-16 h-0.5 rounded-full bg-[#FFD54F]"
        style={{
          opacity: shown.includes(3) ? 0.7 : 0,
          transition: "opacity 1.2s ease 0.4s",
        }}
      />

      {/* Подпись */}
      <p
        className="relative z-10 mt-5 font-caveat text-[#B39DDB] text-lg"
        style={{
          opacity: shown.includes(3) ? 1 : 0,
          transition: "opacity 1s ease 0.8s",
        }}
      >
        — мульттерапия
      </p>
    </div>
  );
}