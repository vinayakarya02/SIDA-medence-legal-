export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-3 ml-12 sm:ml-20 lg:ml-32">
            <a href="https://www.linkedin.com/company/medence-legal" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[#6B7280] hover:text-[#6B7280] flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4V15.5c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24H8V8z"/></svg>
            </a>
            <a href="https://twitter.com/medencelegal" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-[#6B7280] hover:text-[#6B7280] hidden sm:inline-flex">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 4v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
          </div>
          <span className="text-[#6B7280] text-base">Designed & Developed by <a href="http://sidahq.com/" target="_blank" rel="noreferrer" className="text-[#3B82F6] hover:underline">SIDA Technologies</a></span>
        </div>
      </div>
    </footer>
  );
}
