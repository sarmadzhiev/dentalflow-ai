"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const getField = (formData: FormData, name: string) =>
  String(formData.get(name) ?? "").trim();

export async function createInquiry(formData: FormData) {
  const patientName = getField(formData, "patientName");
  const phone = getField(formData, "phone");
  const email = getField(formData, "email");
  const message = getField(formData, "message");

  if (!patientName || !message) {
    redirect(
      `/dashboard/inquiries/new?error=${encodeURIComponent(
        "Името на пациента и запитването са задължителни."
      )}`
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: clinic, error: clinicError } = await supabase
    .from("clinics")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (clinicError || !clinic) {
    redirect(
      `/dashboard/inquiries/new?error=${encodeURIComponent(
        "Не беше намерена клиника за този профил."
      )}`
    );
  }

  const { error } = await supabase.from("inquiries").insert({
    clinic_id: clinic.id,
    patient_name: patientName,
    phone: phone || null,
    email: email || null,
    message,
  });

  if (error) {
    redirect(
      `/dashboard/inquiries/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/inquiries");

  redirect(
    `/dashboard/inquiries?message=${encodeURIComponent(
      "Запитването е добавено успешно."
    )}`
  );
}
