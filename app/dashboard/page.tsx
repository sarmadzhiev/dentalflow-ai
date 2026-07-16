const leads = [
  {name:"Мария Иванова", need:"Почистване", time:"Днес, 09:42", status:"Ново"},
  {name:"Георги Петров", need:"Имплант", time:"Вчера, 18:10", status:"За обаждане"},
  {name:"Елена Николова", need:"Избелване", time:"Вчера, 14:25", status:"Записан"},
];

export default function Dashboard() {
  return (
    <main className="dash">
      <aside className="sidebar">
        <div className="brand"><span className="logo">D</span> DentalFlow</div>
        <nav>
          <a className="active">Обзор</a><a>Запитвания</a><a>Часове</a>
          <a>AI рецепционист</a><a>Отзиви</a><a>Настройки</a>
        </nav>
        <div className="clinic">Demo Dental Clinic<small>Growth plan</small></div>
      </aside>
      <section className="content">
        <header className="dashhead"><div><h1>Добро утро 👋</h1><p>Ето какво се случва с клиниката днес.</p></div><button>+ Ново запитване</button></header>
        <div className="stats">
          <div><span>Нови запитвания</span><strong>18</strong><small>+28% тази седмица</small></div>
          <div><span>Записани часове</span><strong>11</strong><small>61% конверсия</small></div>
          <div><span>Спестено време</span><strong>7.4 ч.</strong><small>чрез автоматизация</small></div>
          <div><span>Нови отзиви</span><strong>9</strong><small>4.9 средна оценка</small></div>
        </div>
        <div className="panel">
          <div className="panelhead"><h2>Последни запитвания</h2><a>Виж всички</a></div>
          <div className="table">
            {leads.map((lead) => (
              <div className="row" key={lead.name}>
                <div><strong>{lead.name}</strong><small>{lead.need}</small></div>
                <span>{lead.time}</span><b className="status">{lead.status}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
