import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <a
        href="https://wa.me/918901664959"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20b858] lg:bottom-12 lg:right-8"
        aria-label="Chat on WhatsApp"
      >
        <div className="h-12 w-12 rounded-full bg-[#22c55e] flex items-center justify-center shadow-lg">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Ff9702dc385e54bbe927cc7a64ecdb27e?format=webp&width=200" alt="WhatsApp" className="h-6 w-6" />
        </div>
      </a>
    </div>
  );
}
