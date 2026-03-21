import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Slide config ─────────────────────────────────────────
const SLIDES = [
  "intro",
  "conflict",
  "zlyuka",
  "friend",
  "steps",
  "rules",
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
          {slide === "rules"    && <SlideRules />}
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
// SLIDE 6 — Правила и финал
// ═══════════════════════════════════════════════════════════
function SlideRules() {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-6">
      <div className="text-6xl animate-bounce-in animate-float" style={{ animationDelay: "0.1s", opacity: 0 }}>🌈</div>
      <h2
        className="font-nunito text-3xl font-black text-[#3D2B1F] animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Запомните, ребята!
      </h2>

      <div className="w-full grid grid-cols-1 gap-3 mt-1">
        {[
          { emoji: "💛", green: true,  text: "Злиться — можно" },
          { emoji: "🚫", green: false, text: "Обижать — нельзя" },
          { emoji: "💬", green: true,  text: "Говорим словами, вежливо" },
          { emoji: "🤝", green: true,  text: "Договариваемся, спрашиваем, предлагаем" },
        ].map((r, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 rounded-2xl border-2 px-5 py-3 animate-slide-up ${
              r.green
                ? "bg-[#E8F5E9] border-[#A5D6A7]"
                : "bg-[#FFEBEE] border-[#EF9A9A]"
            }`}
            style={{ animationDelay: `${0.3 + i * 0.1}s`, opacity: 0 }}
          >
            <span className="text-2xl">{r.emoji}</span>
            <span className={`font-nunito font-bold text-lg ${r.green ? "text-[#2E7D32]" : "text-[#C62828]"}`}>
              {r.text}
            </span>
          </div>
        ))}
      </div>

      <div
        className="w-full mt-2 rounded-3xl px-6 py-6 animate-bounce-in"
        style={{
          background: "linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 100%)",
          border: "3px solid #FFB74D",
          animationDelay: "0.75s",
          opacity: 0,
        }}
      >
        <p className="font-caveat text-2xl font-bold text-[#E65100] leading-relaxed">
          Вы сильнее своей злости,<br />
          а друзья важнее, чем ссора и обида! 💪
        </p>
        <div className="mt-3 flex justify-center gap-2 text-2xl animate-pulse-soft">
          <span>🌟</span><span>💛</span><span>🌟</span>
        </div>
      </div>
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
