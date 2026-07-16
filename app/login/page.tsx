import Link from "next/link";
import { login } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="authpage">
      <section className="authbox">
        <Link href="/" className="brand"><span className="logo">D</span> DentalFlow AI</Link>
        <div>
          <div className="eyebrow">ВХОД ЗА КЛИНИКИ</div>
          <h1>Добре дошли отново</h1>
          <p>Влезте в контролния панел на Вашата клиника.</p>
        </div>
        {params.error && <div className="notice error">{params.error}</div>}
        {params.message && <div className="notice success">{params.message}</div>}
        <form action={login} className="authform">
          <label>Имейл<input name="email" type="email" required /></label>
          <label>Парола<input name="password" type="password" required /></label>
          <button type="submit">Вход</button>
        </form>
        <p className="authfoot">Нямате акаунт? <Link href="/register">Регистрация</Link></p>
      </section>
    </main>
  );
}
