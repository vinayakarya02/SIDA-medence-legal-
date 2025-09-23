import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(window.location.pathname || "/");
  }, []);

  const linkClass = (href: string) => {
    const isActive = path === href || (href !== "/" && path.startsWith(href));
    return (
      "transition-colors " +
      (isActive
        ? "underline decoration-2 decoration-[#3B82F6] underline-offset-8 text-[#0A0B5C] pr-6"
        : "hover:text-[#0A0B5C]")
    );
  };

  return (
    <header className={cn("sticky top-0 z-40 w-full bg-white backdrop-blur-sm")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F8c467c20866d4b8689d9f1195180a93b?format=webp&width=256"
              alt="Medence Legal"
              className="h-20 w-auto"
              loading="lazy"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#0A0B5C]">
            <a href="/" className={linkClass("/")}>Home</a>
            <a href="/faqs" className={linkClass("/faqs")}>FAQs</a>
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/918901664959"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A0B5C]"
          >
            Book A Call
            <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F5ccd5e1f20e942c6a0cc64eeb65a665b?format=webp&width=96" alt="arrow" className="ml-3 h-6 w-6 inline-block" />
          </a>

          <button
            aria-label="Open menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border text-[#0A0B5C]"
            onClick={() => {
              const el = document.getElementById("mobile-nav");
              if (el) el.classList.toggle("hidden");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0B5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div id="mobile-nav" className="md:hidden hidden border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <a href="/" className={linkClass("/")}>Home</a>
          <a href="/faqs" className={linkClass("/faqs")}>FAQs</a>
          <a
            href="https://wa.me/918901664959"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-semibold text-[#0A0B5C] hover:bg-gray-100 w-fit"
          >
            Book a Call
            <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F5ccd5e1f20e942c6a0cc64eeb65a665b?format=webp&width=96" alt="arrow" className="ml-3 h-6 w-6 inline-block" />
          </a>
        </div>
      </div>
    </header>
  );
}
