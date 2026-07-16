create extension if not exists "pgcrypto";

create table if not exists public.clinics (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now(),
  unique(owner_id)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  patient_name text not null,
  phone text,
  email text,
  service text,
  preferred_time text,
  message text,
  status text not null default 'new'
    check (status in ('new','contacted','booked','closed')),
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.clinics enable row level security;
alter table public.leads enable row level security;

create policy "owners read own clinic"
on public.clinics for select using (auth.uid() = owner_id);

create policy "owners create own clinic"
on public.clinics for insert with check (auth.uid() = owner_id);

create policy "owners update own clinic"
on public.clinics for update using (auth.uid() = owner_id);

create policy "owners read own leads"
on public.leads for select using (
  exists (
    select 1 from public.clinics
    where clinics.id = leads.clinic_id
      and clinics.owner_id = auth.uid()
  )
);

create policy "owners manage own leads"
on public.leads for all
using (
  exists (
    select 1 from public.clinics
    where clinics.id = leads.clinic_id
      and clinics.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.clinics
    where clinics.id = leads.clinic_id
      and clinics.owner_id = auth.uid()
  )
);
