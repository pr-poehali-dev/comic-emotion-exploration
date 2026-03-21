import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  yard: "https://cdn.poehali.dev/projects/4f6f9e38-e14e-43ae-aedf-94ad64b1dd4b/files/4ba968bc-4cbc-43bb-afe9-8d71f5405078.jpg",
  conflict: "https://cdn.poehali.dev/projects/4f6f9e38-e14e-43ae-aedf-94ad64b1dd4b/files/8be9c571-04ad-4164-8160-2e76b214878a.jpg",
  happy: "https://cdn.poehali.dev/projects/4f6f9e38-e14e-43ae-aedf-94ad64b1dd4b/files/5d508e02-90a8-4160-aee7-5bd458afca66.jpg",
};

type StoryChoice = null | "A" | "B";

const slides = [
  { id: 1, section: "Вовлечение" },
  { id: 2, section: "Проблема" },
  { id: 3, section: "Решение" },
  { id: 4, section: "Методология" },
  { id: 5, section: "Мастер-класс" },
  { id: 6, section: "Мастер-класс" },
  { id: 7, section: "Мастер-класс" },
  { id: 8, section: "Итоги" },
  { id: 9, section: "Правила" },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [storyChoice, setStoryChoice] = useState<StoryChoice>(null);
  const [handsA, setHandsA] = useState(0);
  const [handsB, setHandsB] = useState(0);

  const total = slides.length;

  function goTo(idx: number) {
    if (idx < 0 || idx >= total) return;
    setCurrent(idx);
    setAnimKey((k) => k + 1);
    if (idx !== 7) setStoryChoice(null);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  return (
    <div className="min-h-screen bg-background font-golos flex flex-col">
      {/* Header nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎬</span>
          <span className="font-cormorant text-lg font-semibold text-foreground/80 tracking-wide">
            Мульттерапия
          </span>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-primary w-6"
                  : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
        <span className="font-golos text-sm text-muted-foreground">
          {current + 1} / {total}
        </span>
      </header>

      {/* Slide area */}
      <main className="flex-1 pt-16 pb-20">
        <div key={animKey} className="animate-slide-up">
          {current === 0 && <SlideEngagement />}
          {current === 1 && <SlideProblem />}
          {current === 2 && <SlideSolution />}
          {current === 3 && <SlideMethod />}
          {current === 4 && <SlideComicOne />}
          {current === 5 && <SlideComicTwo />}
          {current === 6 && (
            <SlideChoice
              storyChoice={storyChoice}
              setStoryChoice={setStoryChoice}
              handsA={handsA}
              handsB={handsB}
              setHandsA={setHandsA}
              setHandsB={setHandsB}
            />
          )}
          {current === 7 && <SlideResults storyChoice={storyChoice} />}
          {current === 8 && <SlideRules />}
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-background/90 backdrop-blur-sm border-t border-border">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-golos text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <span className="font-cormorant italic text-muted-foreground text-base">
          {slides[current].section}
        </span>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-golos text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Далее
          <Icon name="ArrowRight" size={16} />
        </button>
      </nav>
    </div>
  );
}

/* ─── Slide 1: Вовлечение ─── */
function SlideEngagement() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-8 max-w-4xl mx-auto text-center">
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <span className="text-6xl">🎨</span>
      </div>
      <h1
        className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-4 leading-tight animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Начнём с вопросов
      </h1>
      <p
        className="font-golos text-muted-foreground text-lg mb-16 animate-fade-in"
        style={{ animationDelay: "0.35s", opacity: 0 }}
      >
        Поднимите руку, если…
      </p>

      <div className="w-full grid md:grid-cols-2 gap-6">
        {[
          { emoji: "📺", text: "Кто в детстве любил мультфильмы?" },
          { emoji: "✏️", text: "Кто хотел бы создать свой мультфильм?" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm animate-slide-up"
            style={{ animationDelay: `${0.4 + i * 0.15}s`, opacity: 0 }}
          >
            <span className="text-5xl">{item.emoji}</span>
            <p className="font-cormorant text-2xl font-medium text-foreground leading-snug">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 2: Проблема ─── */
function SlideProblem() {
  const points = [
    { icon: "VolumeX", text: "«Мне обидно / я злюсь / мне одиноко» — часто не звучит" },
    { icon: "Minus", text: "Вместо слов: молчание, поведение, вспышки" },
    { icon: "HelpCircle", text: "Прямые вопросы не помогают: «Что случилось? Почему?»" },
    { icon: "Lightbulb", text: "Не «не хочет» — а не умеет объяснить" },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Проблема
        </span>
      </div>
      <h2
        className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-12 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Ребёнок не говорит
        <em className="italic text-primary"> словами</em>
      </h2>

      <div className="grid gap-4">
        {points.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-5 bg-card border border-border rounded-2xl px-7 py-5 animate-slide-up"
            style={{ animationDelay: `${0.25 + i * 0.1}s`, opacity: 0 }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={p.icon} size={18} className="text-foreground/70" />
            </div>
            <p className="font-golos text-lg text-foreground leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 3: Решение ─── */
function SlideSolution() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Решение
        </span>
      </div>
      <h2
        className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-12 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Говорить через
        <em className="italic text-primary"> героя</em>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            step: "01",
            title: "Не спрашиваем напрямую",
            desc: "Предлагаем историю или комикс вместо вопросов «что случилось?»",
          },
          {
            step: "02",
            title: "Ребёнок говорит про героя",
            desc: "Не про себя — про персонажа. Это безопаснее и комфортнее",
          },
          {
            step: "03",
            title: "Облачко чувств",
            desc: "«Герой злится» — а не «я злюсь». Дистанция снижает тревогу",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-3 animate-slide-up"
            style={{ animationDelay: `${0.3 + i * 0.12}s`, opacity: 0 }}
          >
            <span className="font-cormorant text-4xl font-light text-primary/40">{item.step}</span>
            <h3 className="font-golos text-base font-semibold text-foreground">{item.title}</h3>
            <p className="font-golos text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-8 bg-accent/50 border border-accent rounded-2xl px-7 py-5 animate-slide-up"
        style={{ animationDelay: "0.6s", opacity: 0 }}
      >
        <p className="font-cormorant text-xl text-center text-foreground/80 italic">
          💬 «Герой злится» — не «я злюсь»
        </p>
      </div>
    </div>
  );
}

/* ─── Slide 4: Методология ─── */
function SlideMethod() {
  const points = [
    { emoji: "🎭", title: "Безопасность", desc: "Легче проговорить эмоции через персонажа" },
    { emoji: "🎮", title: "Контроль", desc: "Ребёнок управляет сюжетом — и ощущает власть над ситуацией" },
    { emoji: "🗣️", title: "Речь", desc: "Учится формулировать чувства словами" },
    { emoji: "🌱", title: "Рост", desc: "Проживает эмоции → лучше понимает себя и других" },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Методология
        </span>
      </div>
      <h2
        className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-4 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Почему метод
        <em className="italic text-primary"> работает</em>
      </h2>
      <p className="font-golos text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
        Управляет историей → тренирует управление ситуацией
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {points.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-5 bg-card border border-border rounded-2xl px-7 py-6 animate-slide-up"
            style={{ animationDelay: `${0.3 + i * 0.1}s`, opacity: 0 }}
          >
            <span className="text-3xl flex-shrink-0">{p.emoji}</span>
            <div>
              <h3 className="font-golos font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="font-golos text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 5: Комикс кадр 1 ─── */
function SlideComicOne() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Мини-мастер-класс · Кадр 1 из 3
        </span>
      </div>
      <h2
        className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Ситуация во дворе
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div
          className="rounded-2xl overflow-hidden border border-border shadow-sm aspect-square animate-fade-in"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          <img src={IMAGES.yard} alt="Маша и Петя во дворе" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-5 animate-slide-in-right" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="font-golos text-base leading-relaxed text-foreground">
              Лето. Маша играет в мяч, Петя — в машинку.
            </p>
          </div>
          <div className="bg-accent/50 border border-accent rounded-2xl p-5">
            <p className="font-cormorant italic text-lg text-foreground/80">
              Они играют рядом, но каждый — по-своему. Пока всё спокойно…
            </p>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Icon name="Users" size={18} />
            <span className="font-golos text-sm">Персонажи: Маша и Петя</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 6: Комикс кадр 2 ─── */
function SlideComicTwo() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Мини-мастер-класс · Кадр 2 из 3
        </span>
      </div>
      <h2
        className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Конфликт
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div
          className="rounded-2xl overflow-hidden border border-border shadow-sm aspect-square animate-fade-in"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          <img src={IMAGES.conflict} alt="Конфликт из-за мяча" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-5 animate-slide-in-right" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="font-golos text-base leading-relaxed text-foreground">
              Петя тоже захотел мяч — и пытается его отнять. Начинается конфликт.
            </p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
            <p className="font-cormorant italic text-lg text-foreground/80">
              Что почувствовала Маша? Что почувствовал Петя? Как вы думаете?
            </p>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Icon name="Zap" size={18} />
            <span className="font-golos text-sm">Момент для обсуждения эмоций</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 7: Выбор сюжета ─── */
interface SlideChoiceProps {
  storyChoice: StoryChoice;
  setStoryChoice: (v: StoryChoice) => void;
  handsA: number;
  handsB: number;
  setHandsA: (v: number) => void;
  setHandsB: (v: number) => void;
}

function SlideChoice({ storyChoice, setStoryChoice, handsA, handsB, setHandsA, setHandsB }: SlideChoiceProps) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Мини-мастер-класс · Развилка
        </span>
      </div>
      <h2
        className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-3 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Выбери сюжет
      </h2>
      <p className="font-golos text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
        Куда повернёт история? Поднимите руки!
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Вариант A */}
        <button
          onClick={() => setStoryChoice("A")}
          className={`group text-left rounded-2xl border-2 p-8 transition-all duration-300 ${
            storyChoice === "A"
              ? "border-rose-400 bg-rose-50 shadow-md"
              : "border-border bg-card hover:border-rose-300 hover:bg-rose-50/50"
          }`}
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-3xl">😤</span>
            <div>
              <span className="font-golos text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-1">
                Вариант А
              </span>
              <h3 className="font-cormorant text-xl font-medium text-foreground leading-snug">
                Маша злится и толкает Петю
              </h3>
            </div>
          </div>
          <p className="font-golos text-sm text-muted-foreground mb-4">
            Эмоции берут верх → физический конфликт → ссора
          </p>
          <div className="flex items-center justify-between">
            <span className="font-golos text-xs text-muted-foreground">Рук поднято:</span>
            <div className="flex items-center gap-3">
              <span className="font-cormorant text-2xl font-medium text-foreground">{handsA}</span>
              <div className="flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setHandsA(Math.max(0, handsA - 1)); }}
                  className="w-7 h-7 rounded-lg bg-border hover:bg-muted-foreground/20 flex items-center justify-center text-xs font-bold transition-colors"
                >−</button>
                <button
                  onClick={(e) => { e.stopPropagation(); setHandsA(handsA + 1); }}
                  className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold transition-colors hover:bg-primary/90"
                >+</button>
              </div>
            </div>
          </div>
        </button>

        {/* Вариант B */}
        <button
          onClick={() => setStoryChoice("B")}
          className={`group text-left rounded-2xl border-2 p-8 transition-all duration-300 ${
            storyChoice === "B"
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-3xl">🤝</span>
            <div>
              <span className="font-golos text-xs font-semibold text-primary uppercase tracking-widest block mb-1">
                Вариант Б
              </span>
              <h3 className="font-cormorant text-xl font-medium text-foreground leading-snug">
                Петя извиняется и спрашивает мяч
              </h3>
            </div>
          </div>
          <p className="font-golos text-sm text-muted-foreground mb-4">
            Слова вместо действий → диалог → совместная игра
          </p>
          <div className="flex items-center justify-between">
            <span className="font-golos text-xs text-muted-foreground">Рук поднято:</span>
            <div className="flex items-center gap-3">
              <span className="font-cormorant text-2xl font-medium text-foreground">{handsB}</span>
              <div className="flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setHandsB(Math.max(0, handsB - 1)); }}
                  className="w-7 h-7 rounded-lg bg-border hover:bg-muted-foreground/20 flex items-center justify-center text-xs font-bold transition-colors"
                >−</button>
                <button
                  onClick={(e) => { e.stopPropagation(); setHandsB(handsB + 1); }}
                  className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold transition-colors hover:bg-primary/90"
                >+</button>
              </div>
            </div>
          </div>
        </button>
      </div>

      {storyChoice && (
        <div className="text-center animate-fade-in">
          <p className="font-golos text-sm text-muted-foreground">
            Выбран вариант <strong>{storyChoice === "A" ? "А" : "Б"}</strong> — перейдите к следующему слайду для разбора
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Slide 8: Итоги двух веток ─── */
function SlideResults({ storyChoice }: { storyChoice: StoryChoice }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-5xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Мини-мастер-класс · Итоги
        </span>
      </div>
      <h2
        className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-10 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Две ветки — два финала
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Ветка A */}
        <div
          className={`rounded-2xl border-2 p-7 animate-slide-up transition-all duration-500 ${
            storyChoice === "A" ? "border-rose-400 bg-rose-50" : "border-border bg-card"
          }`}
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">😤</span>
            <h3 className="font-golos font-semibold text-foreground">Ветка А — неудачно</h3>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            {["Руки вместо слов → толчок", "Ответный толчок → ссора", "Никому не весело"].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-rose-600 font-bold">{i + 1}</span>
                </div>
                <span className="font-golos text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
          <div className="bg-rose-100 rounded-xl p-4">
            <p className="font-cormorant italic text-base text-foreground/80">
              «Игра заканчивается. Оба расстроены»
            </p>
          </div>
        </div>

        {/* Ветка B */}
        <div
          className={`rounded-2xl border-2 p-7 animate-slide-up transition-all duration-500 ${
            storyChoice === "B" ? "border-primary bg-primary/5" : "border-border bg-card"
          }`}
          style={{ animationDelay: "0.35s", opacity: 0 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🤝</span>
            <h3 className="font-golos font-semibold text-foreground">Ветка Б — удачно</h3>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <div className="bg-muted rounded-xl p-4">
              <p className="font-golos text-sm">
                <strong>Петя:</strong> «Извини. Можно я тоже поиграю?»
              </p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="font-golos text-sm">
                <strong>Маша:</strong> «Можно! Давай вместе!»
              </p>
            </div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="font-cormorant italic text-base text-foreground/80">
              «Игра продолжается вместе»
            </p>
          </div>
        </div>
      </div>

      <div
        className="bg-accent/60 border border-accent rounded-2xl px-7 py-5 animate-slide-up"
        style={{ animationDelay: "0.5s", opacity: 0 }}
      >
        <div className="flex items-start gap-4">
          <Icon name="MessageCircleQuestion" size={22} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="font-golos text-base text-foreground">
            <strong>Вопрос педагогам:</strong> Что должен был сделать Петя, чтобы не поссориться?
            <span className="text-muted-foreground ml-2">→ спросить / договориться</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 9: Правила + Закрытие ─── */
function SlideRules() {
  const rules = [
    { emoji: "🙏", text: "Сначала вежливо спроси" },
    { emoji: "👫", text: "Можно играть вместе" },
    { emoji: "🚫", text: "Драться и ругаться — не выход" },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-8 max-w-4xl mx-auto">
      <div className="mb-2 animate-fade-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
        <span className="font-golos text-sm font-medium text-primary uppercase tracking-widest">
          Правила
        </span>
      </div>
      <h2
        className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-3 leading-tight animate-slide-up"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        Что закрепляем
        <em className="italic text-primary"> у ребёнка</em>
      </h2>
      <p className="font-golos text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
        Три простых правила, которые ребёнок усваивает через историю
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {rules.map((r, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-7 text-center animate-slide-up"
            style={{ animationDelay: `${0.3 + i * 0.12}s`, opacity: 0 }}
          >
            <span className="text-5xl block mb-4">{r.emoji}</span>
            <p className="font-golos text-base font-medium text-foreground">{r.text}</p>
          </div>
        ))}
      </div>

      <div
        className="bg-secondary border border-border rounded-2xl px-8 py-7 animate-slide-up"
        style={{ animationDelay: "0.6s", opacity: 0 }}
      >
        <p className="font-cormorant text-xl text-foreground leading-relaxed text-center mb-5">
          Мульттерапия — это безопасный способ прожить ситуацию. Если ребёнок меняет сюжет в комиксе — со временем сможет менять его и в жизни.
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">🎬</span>
          <p className="font-golos text-lg font-semibold text-foreground">
            Спасибо за внимание!
          </p>
          <span className="text-2xl">✨</span>
        </div>
      </div>
    </div>
  );
}
