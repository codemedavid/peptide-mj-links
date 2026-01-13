-- 1. Reset Schema (Drop table to ensure clean state for new configuration)
drop table if exists links cascade;

-- 2. Create Table
create table links (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  text text not null,
  href text not null,
  icon text,
  variant text default 'primary', -- Added variant column
  "order" integer default 0
);

-- 3. Enable RLS
alter table links enable row level security;

-- 4. Policies
-- Allow public read access
create policy "Public links are viewable by everyone"
  on links for select
  to anon
  using (true);

-- Allow public write access (Since we are using hardcoded client-side auth for this simple app)
create policy "Public can manage links"
  on links for all
  to anon
  using (true);

-- 5. Seed Data
insert into links (text, href, icon, variant, "order") values
('Join Our WhatsApp Community', 'https://chat.whatsapp.com/Iy46aF2sL44FhFC5a2hqkv', '💬', 'primary', 1),
('Contact Us on WhatsApp', 'https://wa.me/639178520660', '📲', 'primary', 2),
('Instagram — Gellies Peppies', 'https://www.instagram.com/gellies.peppies08', '📸', 'social', 3),
('Facebook — Gellies Peppies', 'https://www.facebook.com/share/1EsjenZVrK/?mibextid=wwXIfr', '📘', 'social', 4),
('Telegram — Direct Chat', 'https://t.me/angie587', '📨', 'social', 5),
('TikTok — Gellies Peppies', 'https://www.tiktok.com/@gellies.peppiesforyou?_r=1&_t=ZS-931dUxI42t7', '🎶', 'social', 6);
