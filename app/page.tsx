import Link from "next/link";

const benefits = [
  ["24/7 отговори", "AI рецепционистът отговаря на пациентски въпроси по всяко време."],
  ["Повече записани часове", "Събира контакт и предпочитан час, вместо клиниката да губи запитването."],
  ["По-малко пропуснати посещения", "Автоматични потвърждения и напомняния."],
  ["Повече Google отзиви", "След посещението пациентите получават правилната покана за обратна връзка."]
];

export default function Home() {
  return (
    <main>
      <nav className="nav container">
        <div className="brand"><span className="logo">D</span> DentalFlow AI</div>
        <div className="navlinks">
          <a href="#features">Функции</a>
          <a href="#pricing">Цени</a>
          <Link className="button small" href="/dashboard">Демо панел</Link>
        </div>
      </nav>

      <section className="hero container">
        <div>
          <div className="eyebrow">AI ВИРТУАЛЕН РЕЦЕПЦИОНИСТ</div>
          <h1>Повече пациенти.<br/>По-малко пропуснати възможности.</h1>
          <p className="lead">
            DentalFlow AI отговаря на запитвания, събира данни, предлага свободни часове
            и подпомага рецепцията на стоматологичната клиника.
          </p>
          <div className="actions">
            <Link className="button" href="/dashboard">Отвори демото</Link>
            <a className="button secondary" href="#pricing">Виж пакетите</a>
          </div>
          <div className="trust">Без дългосрочен договор · Настройка за конкретна клиника · GDPR ориентиран процес</div>
        </div>

        <div className="chatcard">
          <div className="chathead">
            <span className="online"></span>
            <div><strong>DentalFlow AI</strong><small>Виртуален рецепционист · онлайн</small></div>
          </div>
          <div className="bubble bot">Здравейте! Как мога да помогна?</div>
          <div className="bubble user">Искам час за почистване на зъбен камък.</div>
          <div className="bubble bot">Разбира се. Кой ден Ви е удобен и на кой телефон да потвърдим?</div>
          <div className="quick">
            <span>Утре</span><span>Тази седмица</span><span>Обадете ми се</span>
          </div>
        </div>
      </section>

      <section id="features" className="section container">
        <div className="sectionhead">
          <div className="eyebrow">КАКВО РЕШАВАМЕ</div>
          <h2>AI помощ за най-натоварената част от клиниката</h2>
        </div>
        <div className="grid4">
          {benefits.map(([title, text]) => (
            <article className="card" key={title}>
              <div className="icon">✦</div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section soft">
        <div className="container">
          <div className="sectionhead">
            <div className="eyebrow">СТАРТОВИ ПАКЕТИ</div>
            <h2>Започваме малко и доказваме резултат</h2>
          </div>
          <div className="pricing">
            <article className="pricecard">
              <h3>Start</h3><div className="price">€149<span>/месец</span></div>
              <p>За малка клиника с един основен канал.</p>
              <ul><li>AI чат на сайта</li><li>Събиране на запитвания</li><li>Базови отчети</li></ul>
            </article>
            <article className="pricecard featured">
              <div className="badge">Препоръчан</div>
              <h3>Growth</h3><div className="price">€299<span>/месец</span></div>
              <p>За клиника, която иска повече записани часове.</p>
              <ul><li>Всичко от Start</li><li>Напомняния</li><li>Google reviews workflow</li><li>CRM статуси</li></ul>
            </article>
            <article className="pricecard">
              <h3>Pro</h3><div className="price">€599<span>/месец</span></div>
              <p>За по-големи клиники и няколко локации.</p>
              <ul><li>Всичко от Growth</li><li>Персонални интеграции</li><li>Приоритетна поддръжка</li></ul>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <div className="brand"><span className="logo">D</span> DentalFlow AI</div>
        <p>Продукт на sarmadzhiev.eu</p>
      </footer>
    </main>
  );
}
