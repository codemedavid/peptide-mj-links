
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const newLinks = [
    {
        text: 'Join Our WhatsApp Community',
        href: 'https://chat.whatsapp.com/Iy46aF2sL44FhFC5a2hqkv',
        icon: '💬',
        variant: 'primary',
        order: 1
    },
    {
        text: 'Contact Us on WhatsApp',
        href: 'https://wa.me/639178520660',
        icon: '📲',
        variant: 'primary',
        order: 2
    },
    {
        text: 'Instagram — Gellies Peppies',
        href: 'https://www.instagram.com/gellies.peppies08',
        icon: '📸',
        variant: 'social',
        order: 3
    },
    {
        text: 'Facebook — Gellies Peppies',
        href: 'https://www.facebook.com/share/1EsjenZVrK/?mibextid=wwXIfr',
        icon: '📘',
        variant: 'social',
        order: 4
    },
    {
        text: 'Telegram — Direct Chat',
        href: 'https://t.me/angie587',
        icon: '📨',
        variant: 'social',
        order: 5
    },
    {
        text: 'TikTok — Gellies Peppies',
        href: 'https://www.tiktok.com/@gellies.peppiesforyou?_r=1&_t=ZS-931dUxI42t7',
        icon: '🎶',
        variant: 'social',
        order: 6
    }
];

const seed = async () => {
    console.log('Starting seed process...');

    // 1. Fetch all existing IDs first
    const { data: existingLinks, error: fetchError } = await supabase
        .from('links')
        .select('id');

    if (fetchError) {
        console.error('Error fetching old links:', fetchError);
        return;
    }

    // 2. Delete if there are links
    if (existingLinks && existingLinks.length > 0) {
        const ids = existingLinks.map(link => link.id);
        const { error: deleteError } = await supabase
            .from('links')
            .delete()
            .in('id', ids);

        if (deleteError) {
            console.error('Error deleting old links:', deleteError);
            return;
        }
        console.log('Old links deleted.');
    } else {
        console.log('No old links to delete.');
    }

    // 3. Insert new links
    const { data, error: insertError } = await supabase
        .from('links')
        .insert(newLinks)
        .select();

    if (insertError) {
        console.error('Error inserting new links:', insertError);
    } else {
        console.log('Successfully inserted new links:', data.length);
    }
};

seed();
