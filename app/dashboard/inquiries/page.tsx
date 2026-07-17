import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const statusLabels: Record<string, string> = {
  new: "Ново",
  contacted: "Свързани",
  booked: "Записан час",
  closed: "Приключено",
};

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: clinic } = await supabase
    .from("clinics")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  const { data: inquiries, error } = clinic
    ? await supabase
        .from("inquiries")
        .select("id, patient_name, phone, email, message, status, created_at")
        .eq("clinic_id", clinic.id)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  return (
    <main className="content">
      <div className="dashhead">
        <div>
          <p className="eyebrow">CRM</p>
          <h1>Запитвания</h1>
          <p>Всички нови контакти и пациентски запитвания.</p>
        </div>

        <Link href="/dashboard/inquiries/new" className="button">
          + Ново запитване
        </Link>
      </div>

      {params.message && (
        <div className="notice success inquiry-notice">
          {params.message}
        </div>
      )}

      {error && (
        <div className="notice error inquiry-notice">
          {error.message}
        </div>
      )}

      <section className="panel inquiries-panel">
        <div className="panelhead">
          <h2>Последни запитвания</h2>
          <span className="inquiry-count">
            {inquiries?.length ?? 0} общо
          </span>
        </div>

        {!inquiries?.length ? (
          <div className="empty inquiry-empty">
            <strong>Все още няма запитвания.</strong>
            <span>
              Създайте първото запитване чрез бутона горе.
            </span>
          </div>
        ) : (
          <div className="inquiries-list">
            {inquiries.map((inquiry) => (
              <article className="inquiry-card" key={inquiry.id}>
                <div className="inquiry-main">
                  <div className="inquiry-title-row">
                    <h3>{inquiry.patient_name}</h3>
                    <span className={`status status-${inquiry.status}`}>
                      {statusLabels[inquiry.status] ?? inquiry.status}
                    </span>
                  </div>

                  <p>{inquiry.message}</p>

                  <div className="inquiry-meta">
                    {inquiry.phone && <span>☎ {inquiry.phone}</span>}
                    {inquiry.email && <span>✉ {inquiry.email}</span>}
                  </div>
                </div>

                <time>
                  {new Intl.DateTimeFormat("bg-BG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(inquiry.created_at))}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
