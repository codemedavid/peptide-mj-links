
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
        text: '⭐ Primary Actions (Top Section)',
        subtext: null,
        href: '#',
        icon: null,
        variant: 'header',
        order: 1
    },
    {
        text: 'Price List',
        subtext: null,
        href: 'https://drive.google.com/file/d/1Bc8Z3P4xNRGs3wC58aOjSNRqZppYKA4o/view?usp=drivesdk',
        icon: '💰',
        variant: 'primary',
        order: 2
    },
    {
        text: 'Order & Inquiries (WhatsApp)',
        subtext: '09068488131',
        href: 'https://wa.me/639068488131',
        icon: '💬',
        variant: 'primary',
        order: 3
    },
    {
        text: 'Message Us (Viber)',
        subtext: '09068488131',
        href: 'viber://contact?number=%2B639068488131',
        icon: '📞',
        variant: 'primary',
        order: 4
    },
    {
        text: '👥 Community',
        subtext: null,
        href: '#',
        icon: null,
        variant: 'header',
        order: 5
    },
    {
        text: 'Join Our Community Group',
        subtext: null,
        href: 'https://m.me/cm/AbbU9aNR-_LdXPbb/?send_source=cm%3Acopy_invite_link',
        icon: '👥',
        variant: 'secondary',
        order: 6
    },
    {
        text: '🌐 Follow & Connect',
        subtext: null,
        href: '#',
        icon: null,
        variant: 'header',
        order: 7
    },
    {
        text: 'Facebook — Peptide MJ',
        subtext: null,
        href: 'https://www.facebook.com/share/1D13cuk9vB/',
        icon: '📘',
        variant: 'secondary',
        order: 8
    },
    {
        text: 'TikTok — Peptide by MJ',
        subtext: null,
        href: 'https://www.tiktok.com/@peptidebymj?_r=1&_t=ZS-934EOKIDojl',
        icon: '🎵',
        variant: 'secondary',
        order: 9
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
