"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const field = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function login(formData: FormData) {
  const email = field(formData, "email");
  const password = field(formData, "password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect(`/login?error=${encodeURIComponent("Невалиден имейл или парола")}`);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const clinicName = field(formData, "clinicName");
  const email = field(formData, "email");
  const password = field(formData, "password");

  if (!clinicName || !email || password.length < 8) {
    redirect(`/register?error=${encodeURIComponent("Попълнете всички полета. Паролата трябва да е поне 8 символа.")}`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { clinic_name: clinicName } },
  });

  if (error) redirect(`/register?error=${encodeURIComponent(error.message)}`);

  if (data.user) {
    await supabase.from("clinics").insert({
      owner_id: data.user.id,
      name: clinicName,
      email,
    });
  }

  redirect("/login?message=Проверете имейла си и потвърдете регистрацията");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
