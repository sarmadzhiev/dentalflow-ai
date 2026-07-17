import Link from "next/link";
import { createInquiry } from "../actions";

export default async function NewInquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="content">
      <div className="dashhead">
        <div>
          <p className="eyebrow">ЗАПИТВАНИЯ</p>
          <h1>Ново запитване</h1>
          <p>Добавете пациентско запитване в системата.</p>
        </div>

        <Link href="/dashboard/inquiries" className="button secondary">
          Назад
        </Link>
      </div>

      <section className="panel inquiry-form-panel">
        {params.error && (
          <div className="notice error">{params.error}</div>
        )}

        <form action={createInquiry} className="inquiry-form">
          <label>
            Име на пациента
            <input
              name="patientName"
              placeholder="Например: Мария Иванова"
              required
            />
          </label>

          <div className="inquiry-form-grid">
            <label>
              Телефон
              <input
                name="phone"
                type="tel"
                placeholder="+359..."
              />
            </label>

            <label>
              Имейл
              <input
                name="email"
                type="email"
                placeholder="patient@example.com"
              />
            </label>
          </div>

          <label>
            Запитване
            <textarea
              name="message"
              rows={6}
              placeholder="Опишете от какво се интересува пациентът..."
              required
            />
          </label>

          <div className="form-actions">
            <Link href="/dashboard/inquiries" className="button secondary">
              Отказ
            </Link>
            <button type="submit">Запази запитването</button>
          </div>
        </form>
      </section>
    </main>
  );
}
