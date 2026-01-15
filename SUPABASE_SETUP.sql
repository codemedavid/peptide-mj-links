-- 1. Reset Schema (Drop table to ensure clean state for new configuration)
drop table if exists links cascade;

-- 2. Create Table
create table links (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  text text not null,
  subtext text, -- Added subtext column
  href text not null default '#', -- Default to # for headers
  icon text,
  variant text default 'primary',
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

-- Allow public write access
create policy "Public can manage links"
  on links for all
  to anon
  using (true);

-- 5. Seed Data
insert into links (text, subtext, href, icon, variant, "order") values
-- Header: Primary Actions
('⭐ Primary Actions (Top Section)', null, '#', null, 'header', 1),
('Price List', null, 'https://drive.google.com/file/d/1Bc8Z3P4xNRGs3wC58aOjSNRqZppYKA4o/view?usp=drivesdk', '�', 'primary', 2),
('Order & Inquiries (WhatsApp)', '09068488131', 'https://wa.me/639068488131', '💬', 'primary', 3),
('Message Us (Viber)', '09068488131', 'viber://contact?number=%2B639068488131', '�', 'primary', 4),

-- Header: Community
('👥 Community', null, '#', null, 'header', 5),
('Join Our Community Group', null, 'https://m.me/cm/AbbU9aNR-_LdXPbb/?send_source=cm%3Acopy_invite_link', '�', 'secondary', 6),

-- Header: Follow & Connect
('🌐 Follow & Connect', null, '#', null, 'header', 7),
('Facebook — Peptide MJ', null, 'https://www.facebook.com/share/1D13cuk9vB/', '�', 'secondary', 8),
('TikTok — Peptide by MJ', null, 'https://www.tiktok.com/@peptidebymj?_r=1&_t=ZS-934EOKIDojl', '�', 'secondary', 9);
