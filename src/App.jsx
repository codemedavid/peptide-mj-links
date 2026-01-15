import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Public Home Component
const Home = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      if (error) throw error;
      if (data && data.length > 0) {
        // Schema Check: Ensure 'subtext' column exists in fetched data (even if null)
        // If undefined, it means the DB table hasn't been updated with the new column.
        if (typeof data[0].subtext === 'undefined') {
          console.warn("Detected old database schema (missing 'subtext'). Falling back to hardcoded configuration.");
          throw new Error("Old Schema Detected");
        }
        setLinks(data);
      } else {
        // Fallback or Empty DB logic
        throw new Error("No links in DB");
      }
    } catch (error) {
      console.log('Using default links configuration');
      // Default Fallback Links based on Rebranding
      setLinks([
        { text: 'Primary Actions', variant: 'header' },
        { text: 'Price List', href: 'https://drive.google.com/file/d/1Bc8Z3P4xNRGs3wC58aOjSNRqZppYKA4o/view?usp=drivesdk', icon: '💰', variant: 'primary' },
        { text: 'Order & Inquiries (WhatsApp)', href: 'https://wa.me/639068488131', icon: '💬', variant: 'primary' },
        { text: 'Message Us (Viber)', href: 'viber://contact?number=%2B639068488131', icon: '📞', variant: 'primary' },

        { text: 'Community', variant: 'header' },
        { text: 'Join Our Community Group', href: 'https://m.me/cm/AbbU9aNR-_LdXPbb/?send_source=cm%3Acopy_invite_link', icon: '👥', variant: 'secondary' },

        { text: 'Follow & Connect', variant: 'header' },
        { text: 'Facebook — Peptide MJ', href: 'https://www.facebook.com/share/1D13cuk9vB/', icon: '📘', variant: 'secondary' },
        { text: 'TikTok — Peptide by MJ', href: 'https://www.tiktok.com/@peptidebymj?_r=1&_t=ZS-934EOKIDojl', icon: '🎵', variant: 'secondary' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Background Decor - Simplified */}
      {/* <div className="bg-decor bg-orb-1"></div> */}

      {/* Header Section */}
      <header className="header animate-fade-in">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Peptide by MJ Logo"
            className="logo-img"
          />
          <div className="logo-glow"></div>
        </div>

        <h1 className="brand-name">
          Peptide by MJ
        </h1>
        <p className="brand-tagline">
          Where quality meets affordability.
        </p>

        <div className="brand-separator-line"></div>

        <p className="brand-description" style={{ maxWidth: '600px', margin: '0.5rem auto 0', lineHeight: '1.6', fontSize: '0.95rem', opacity: 0.9 }}>
          Premium peptides made accessible — trusted quality without the premium price.
        </p>
      </header>

      {/* Links Section */}
      <main className="links-container">
        {links.map((link, index) => {
          if (link.variant === 'header') {
            return (
              <h2
                key={index}
                className="link-section-header animate-fade-in"
                style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}
              >
                {link.text}
              </h2>
            );
          }
          return (
            <LinkButton
              key={index}
              text={link.text}
              subtext={link.subtext}
              href={link.href}
              icon={link.icon}
              delay={0.1 + (index * 0.05)}
              variant={link.variant}
            />
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
