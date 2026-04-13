"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections  = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute("id") || "home";
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["home", "about", "services", "portfolio", "contact"];

  return (
    <html lang="en">
      <body>
        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <div className="logo">
            Portofolio<span></span>
          </div>

          {/* Desktop + Mobile nav */}
          <nav className={menuOpen ? "open" : ""}>
            <ul>
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className={active === link ? "active" : ""}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </div>
        </header>

        {children}

        <footer>
          <p>© 2026 <span>Ahmad Sulthon Jauhari</span>. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}