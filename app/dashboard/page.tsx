import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: clinic } = await supabase
    .from("clinics")
    .select("id,name,email")
    .eq("owner_id", user.id)
    .maybeSingle();

  const { data: leads } = clinic
    ? await supabase.from("leads")
        .select("id,patient_name,service,status,created_at")
        .eq("clinic_id", clinic.id)
        .order("created_at", { ascending: false })
        .limit(8)
    : { data: [] };

  const rows = leads ?? [];

  return (
    <main className="dash">
      <aside className="sidebar">
        <div className="brand"><span className="logo">D</span> DentalFlow</div>
        <nav>
          <a className="active">Обзор</a><a>Запитвания</a><a>Часове</a>
          <a>AI рецепционист</a><a>Отзиви</a><a>Настройки</a>
        </nav>
        <div className="clinic">
          {clinic?.name ?? "Моята клиника"}
          <small>{user.email}</small>
          <form action={logout}><button className="logout">Изход</button></form>
        </div>
      </aside>

      <section className="content">
        <header className="dashhead">
          <div><h1>Контролен панел</h1><p>Добре дошли, {clinic?.name ?? user.email}.</p></div>
          <button>+ Ново запитване</button>
        </header>

        <div className="stats">
          <div><span>Нови запитвания</span><strong>{rows.length}</strong><small>последни записи</small></div>
          <div><span>Записани часове</span><strong>{rows.filter(x => x.status === "booked").length}</strong><small>потвърдени</small></div>
          <div><span>AI статус</span><strong>24/7</strong><small>готов за интеграция</small></div>
          <div><span>План</span><strong>Demo</strong><small>14 дни</small></div>
        </div>

        <div className="panel">
          <div className="panelhead"><h2>Последни запитвания</h2><a>Виж всички</a></div>
          <div className="table">
            {rows.length === 0 ? (
              <div className="empty">Все още няма запитвания.</div>
            ) : rows.map((lead) => (
              <div className="row" key={lead.id}>
                <div><strong>{lead.patient_name}</strong><small>{lead.service || "Общо запитване"}</small></div>
                <span>{new Date(lead.created_at).toLocaleString("bg-BG")}</span>
                <b className="status">{lead.status}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
