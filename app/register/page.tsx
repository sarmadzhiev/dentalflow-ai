import Link from "next/link";
import { signup } from "@/app/auth/actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="authpage">
      <section className="authbox">
        <Link href="/" className="brand"><span className="logo">D</span> DentalFlow AI</Link>
        <div>
          <div className="eyebrow">14-ДНЕВНО ДЕМО</div>
          <h1>Създайте профил на клиниката</h1>
          <p>След регистрация ще получите собствен защитен панел.</p>
        </div>
        {params.error && <div className="notice error">{params.error}</div>}
        <form action={signup} className="authform">
          <label>Име на клиниката<input name="clinicName" required /></label>
          <label>Служебен имейл<input name="email" type="email" required /></label>
          <label>Парола<input name="password" type="password" minLength={8} required /></label>
          <button type="submit">Създай акаунт</button>
        </form>
        <p className="authfoot">Вече имате акаунт? <Link href="/login">Вход</Link></p>
      </section>
    </main>
  );
}
