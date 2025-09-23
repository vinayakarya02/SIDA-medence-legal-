import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Index() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const whyContainerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(whyContainerRef, { amount: 0.6, once: false });
  const centerControls = useAnimation();
  const leftControls = useAnimation();
  const rightControls = useAnimation();

  // Typing effect for Compare header
  const [typedText, setTypedText] = useState("");
  const phrases = ["we stand out", "are we different?"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // typing
      if (charIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, charIndex));
        timeout = setTimeout(() => setCharIndex((i) => i + 1), 120);
      } else {
        // hold for 2s before starting delete
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // deleting
      if (charIndex > 0) {
        setTypedText(currentPhrase.slice(0, charIndex));
        timeout = setTimeout(() => setCharIndex((i) => i - 1), 60);
      } else {
        // small pause then move to next phrase
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % phrases.length);
          setCharIndex(0);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    // start with enter state then trigger active
    img.classList.add("enter");
    requestAnimationFrame(() => {
      setTimeout(() => img.classList.add("enter-active"), 50);
    });
    return () => {
      img.classList.remove("enter", "enter-active");
    };
  }, []);

  // IntersectionObserver for Why choose us reveal animations
  useEffect(() => {
    // sequence: show center card coming from left to center, then split into left/right
    const runSequence = async () => {
      // reset instantly
      centerControls.set({ x: -380, opacity: 1, scale: 1, zIndex: 20 });
      leftControls.set({ x: 0, opacity: 0, zIndex: 10 });
      rightControls.set({ x: 0, opacity: 0, zIndex: 10 });

      // hold on the left briefly so it's clearly visible
      await new Promise((r) => setTimeout(r, 1000));

      // bring center to middle
      await centerControls.start({ x: 0, opacity: 1, scale: 1, zIndex: 20, transition: { duration: 1.3, ease: [0.2, 0.9, 0.3, 1] } });

      // small hold before splitting
      await new Promise((r) => setTimeout(r, 220));

      // split to sides
      await Promise.all([
        leftControls.start({ opacity: 1, x: -380, zIndex: 10, transition: { duration: 1.1, ease: [0.2, 0.9, 0.3, 1] } }),
        rightControls.start({ opacity: 1, x: 380, zIndex: 10, transition: { duration: 1.1, ease: [0.2, 0.9, 0.3, 1] } })
      ]);
    };

    if (inView) {
      runSequence();
    } else {
      // reset when leaving view so it replays next time
      centerControls.set({ x: -380, opacity: 0, scale: 0.96, zIndex: 20 });
      leftControls.set({ x: 0, opacity: 0, zIndex: 10 });
      rightControls.set({ x: 0, opacity: 0, zIndex: 10 });
    }
  }, [inView, centerControls, leftControls, rightControls]);

  return (
    <div className="bg-white text-foreground">
      {/* Hero */}
      <section className="relative overflow-visible">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 sm:pb-24">
          <div className="grid items-center gap-24 lg:grid-cols-2 lg:gap-32">
            <div className="max-w-[520px] -mt-6 lg:-mt-12">
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-[56px] whitespace-nowrap leading-tight">
                Medence Legal
              </h1>
              <p className="mt-6 text-gray-700 text-lg sm:text-xl lg:text-2xl leading-tight">
                <span className="block">Your Personal Lawyer. On</span>
                <span className="block">Your Side, Always.</span>
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a href="#plans" className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary hover:bg-yellow-300 hover:scale-105 shadow transition-transform duration-200">
                  Check Plans
                </a>
                <a
                href="https://wa.me/918901664959"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
              >
                Book a Call
                <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F5ccd5e1f20e942c6a0cc64eeb65a665b?format=webp&width=96" alt="arrow" className="ml-3 h-6 w-6" />
              </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="hero-wedge" />
                            <img
                ref={imgRef}
                src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Ffb2583d8b8b34ad08633bd29e4d583c8?format=webp&width=1920"
                alt="Medence Legal Hero"
                className="hero-image relative z-10 ml-auto h-[560px] w-auto object-contain lg:mr-[32rem]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex -space-x-3 mb-4">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Fe3225a6f547a43f1817a1b9cbc8d3619?format=webp&width=200" alt="Profile 1" className="h-10 w-10 rounded-full border-2 border-white shadow" />
              <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Faef5991fd9f54f27a658593296a6cac7?format=webp&width=200" alt="Profile 2" className="h-10 w-10 rounded-full border-2 border-white shadow" />
              <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Fe88163afb9074e1ead52616ade38372e?format=webp&width=200" alt="Profile 3" className="h-10 w-10 rounded-full border-2 border-white shadow" />
            </div>

            <h2 className="text-3xl font-bold text-primary">Welcome to Medence Legal.</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Just like insurance, you pay a simple fee upfront — and when trouble comes, we handle the legal fight for you. No chasing lawyers. No high legal bills. Just peace of mind for tenants, consumers, and everyday legal needs. It's like having a personal lawyer in your corner to tackle the world for you.
            </p>
          </div>
          <div className="relative flex justify-end">
            <div className="hero-wedge-2" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F8689b595e06c4977b0b2fbef9b2861af?format=webp&width=1200"
              alt="Legal Assistance"
              className="w-full max-w-sm lg:max-w-md rounded-2xl border border-gray-200 object-cover shadow-sm relative z-10"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start text-center">
            {[
              { title: "1. Call Our Executive", desc: "Connect with our team to discuss your legal needs and clear all the questions you have right away.", icon: 'phone' },
              { title: "2. Discovery", desc: "Choose the right plan from our options — custom tailored to match your unique budget & legal needs.", icon: 'search' },
              { title: "3. Personal Lawyer", desc: "Congratulations! You now have a dedicated personal lawyer for all your legal matters and needs.", icon: 'user' },
              { title: "4. Legal Assistance", desc: "Call or meet your lawyer anytime for advice or complete legal defence — always by your side.", icon: 'briefcase' },
              { title: "5. Customer Support", desc: "Our robust support team is at your disposal, if you need to change lawyers or resolve grievances.", icon: 'wrench' },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-2 p-0">
                <div className="flex items-center justify-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1220] text-white">
                    {step.icon === 'phone' && (
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F15346f4089c740dfa8dc8ca51097b7ec?format=webp&width=96" alt="Call icon" className="h-6 w-6 object-contain" />
                    )}
                    {step.icon === 'search' && (
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Ff66cc3811a374d10bb1388f5a212f105?format=webp&width=96" alt="search icon" className="h-6 w-6 object-contain" />
                    )}
                    {step.icon === 'user' && (
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F88bf9f6955974ae581244a906b843c57?format=webp&width=96" alt="user icon" className="h-6 w-6 object-contain" />
                    )}
                    {step.icon === 'briefcase' && (
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F0a1f80fd6b2544c1998aa4ba9c636d26?format=webp&width=96" alt="briefcase icon" className="h-6 w-6 object-contain" />
                    )}
                    {step.icon === 'wrench' && (
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F2583ba1924354b80a047e1af1334f086?format=webp&width=96" alt="wrench icon" className="h-6 w-6 object-contain" />
                    )}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-black">{step.title}</h3>
                <p className="mt-1 text-sm text-[#9CA3AF] max-w-[14rem]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us? - dark band with colored cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 rounded-3xl bg-[#0b1220] p-16">
            <h2 className="text-3xl font-bold text-white text-center">Why choose us?</h2>
            <div ref={whyContainerRef} className="mt-10 relative mx-auto max-w-6xl h-[360px] overflow-hidden">
              {/* Center card (Expert) animates in from left to center */}
              <motion.div
                className="why-card bg-[#bfeaf3] flex flex-col gap-3 items-start shadow-inner absolute left-[36%] -translate-x-1/2 top-0"
                animate={centerControls}
                initial={{ x: -380, opacity: 1, scale: 1 }}
              >
                <h3 className="text-[22px] leading-[1.05] tracking-normal font-medium text-[#171717]">Expert and<br/>Personalized Support</h3>
                <p className="mt-1 text-xs text-[#062b37]">Unmatched service from seasoned legal professionals tailored to your needs.</p>
                <div className="my-2 h-[1px] w-full bg-[#062b37] opacity-20" />
                <ul className="mt-2 space-y-1 text-xs text-[#062b37] pl-4 list-disc">
                  <li>Diverse but expert lawyers.</li>
                  <li>Best lawyer-client fit combination.</li>
                  <li>Comprehensive solutions as per requirements.</li>
                </ul>
              </motion.div>

              {/* Left card emerges from center to left */}
              <motion.div
                className="why-card bg-[#bfeaf3] flex flex-col gap-3 items-start shadow-inner absolute left-[36%] -translate-x-1/2 top-0"
                animate={leftControls}
                initial={{ x: 0, opacity: 0 }}
              >
                <h3 className="text-[22px] leading-[1.05] tracking-normal font-medium text-[#171717]">Affordable Legal<br/>Solutions</h3>
                <p className="mt-1 text-xs text-[#062b37]">Access premium legal services without stretching your budget.</p>
                <div className="my-2 h-[1px] w-full bg-[#062b37] opacity-20" />
                <ul className="mt-2 space-y-1 text-xs text-[#062b37] pl-4 list-disc">
                  <li>Flexible plans to suit various financial needs.</li>
                  <li>Transparent pricing with no hidden charges.</li>
                  <li>Quality legal support at an unbeatable value.</li>
                </ul>
              </motion.div>

              {/* Right card emerges from center to right */}
              <motion.div
                className="why-card bg-[#e7f7f1] flex flex-col gap-3 items-start shadow-inner absolute left-[36%] -translate-x-1/2 top-0"
                animate={rightControls}
                initial={{ x: 0, opacity: 0 }}
              >
                <h3 className="text-[22px] leading-[1.05] tracking-normal font-medium text-[#171717]">Always Here for Your<br/>Problems</h3>
                <p className="mt-1 text-xs text-[#062b37]">Count on Medence for round-the-clock assistance and guidance.</p>
                <div className="my-2 h-[1px] w-full bg-[#062b37] opacity-20" />
                <ul className="mt-2 space-y-1 text-xs text-[#062b37] pl-4 list-disc">
                  <li>24/7 customer support for all your queries.</li>
                  <li>Timely updates and proactive communication.</li>
                  <li>Accessible from wherever and whenever.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-xl font-semibold text-primary mb-6">
            <span className="inline-block font-semibold">How</span>{' '}
            <span className="inline-block capitalize">{typedText}<span className="typing-cursor"></span></span>
          </h3>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-transparent">
                <tr>
                  <th className="w-1/3 p-4"></th>
                  <th className="w-1/3 p-4 bg-green-50 text-center"><span className="inline-flex items-center justify-center gap-3"><img src="https://medencelegal.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.712d4dcd.png&w=256&q=75" alt="Medence Legal" className="h-12 w-auto" /> <span className="font-semibold text-lg">Medence Legal</span></span></th>
                  <th className="w-1/3 p-4 bg-red-100 text-center">Other "Typical" Lawyers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Price Tag", "Starting at ₹199", "Expensive"],
                  ["Price Clarity", "Standard Pricing", "Uncertain & Hidden Pricing"],
                  ["Quality", "Avg. 19 Years of Experience", "Unsure of Quality"],
                  ["Ease", "Auto Case Updates", "Hassles & Runarounds"],
                  ["Flexibility", "Lawyer Replacement Option", "No Flexibility"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t">
                    <td className="p-4">{row[0]}</td>
                    <td className="p-4 text-center bg-green-50">{row[1]}</td>
                    <td className="p-4 text-center bg-red-50">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials carousel */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">HEAR IT FROM OUR USERS</h3>
          <div className="relative">
            <button aria-label="Prev" id="test-prev" style={{ top: '-60px' }} className="absolute right-20 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow md:flex">‹</button>
            <button aria-label="Next" id="test-next" style={{ top: '-60px' }} className="absolute right-4 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow md:flex">›</button>
            <div id="test-carousel" style={{ touchAction: 'pan-x' }} className="test-carousel flex overflow-x-auto gap-6 px-2 py-6 scrollbar-hide">
              {[
                { name: "Rahul Shrivastavan", title: "IT Professional", avatar: "https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Fddbe3c201eea4587b5a43b8fd2290e84?format=webp&width=96", text: "We have been planning to buy our first ever property. It was this time when my close friend told me to get the documents checked thoroughly. I used Medence's service— their lawyer found a legal issue that could have landed me in major trouble. Just that one review saved me from some financial disaster. Kudos to the team!" },
                { name: "Alok Mishra", title: "SDE Professional", avatar: "https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F9fdb6849c2f14bb1bd5eef1fd01761e7?format=webp&width=96", text: "My flatmate came across medence over his social media about their free rental agreement checker. We were already in trouble by then though. Our landlord without any warning or reason cut our deposit. And since we were young corporate guys we didn't want to further risk our careers by retaliating against landlord. But medence helped us recover our money from him legally without our involvement. Many other lawyers outside that we approached before meeting medence have inflated costs that were almost double of our 55k deposit. Medence gave us an easy way out here with their flexible plans." },
                { name: "Pradeep Kumar", title: "Textile Business Owner", avatar: "https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Fab461f712b234b7a9895c150db291e93?format=webp&width=96", text: "The customer team is highly responsive. While the lawyer himself was very professional from the start, what impressed me truly was their customer support. They responded to my concerns and made me calm whenever I felt anxious with my legal issue." },
                { name: "G.Sneha", title: "Government Service", avatar: "https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2Fb3f49228a0174aa1954fe6643ed5028d?format=webp&width=96", text: "I was so tired with other lawyers taking their money extracting business from me. Medence's simple pricing is such a relief. They handled my divorce case across multiple areas and got me results quicker than expected. Thank you!" },
                { name: "Anita Verma", title: "Teacher", avatar: "https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F453126c3221749d89bfdcadcb8eed7c8?format=webp&width=96", text: "Quick and dependable. They helped me with a rental dispute and made the process straightforward. Highly recommend Medence." },
                { name: "Rohit Singh", title: "Startup Founder", avatar: "https://cdn.builder.io/api/v1/image/assets%2F32d1f95fc1db4a6d9516e739d9dc7510%2F73301bd672cb4b35bf71b6a66bb275f1?format=webp&width=96", text: "Professional and prompt. The lawyer assigned to me was excellent and explained everything clearly. Saved me both time and money." },
              ].map((t) => (
                <div key={t.name} className="testimonial-card flex-shrink-0 w-[90vw] md:w-80 lg:w-96 max-w-3xl rounded-lg border border-gray-200 p-6 bg-white mx-2 min-h-[480px]">
                  <div className="flex items-center gap-2">
                    <img src={t.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-gray-600">{t.title}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">{t.text}</p>
                  <div className="mt-4 text-yellow-400">★★★★★</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by our users */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-full py-2">
            <h2 className="w-full text-[34px] font-semibold text-black tracking-normal text-center uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>TRUSTED BY OUR USERS</h2>
          </div>
          <p className="mt-0 text-[14px]" style={{ fontFamily: 'Arial, sans-serif', color: '#4B5563', marginTop: '0px' }}>Medence Legal is backed by results, not just words</p>

          <div className="mt-6">
            <div className="mx-auto max-w-6xl bg-white rounded-2xl border border-gray-200 p-12 shadow-md">
              <div className="flex flex-col md:flex-row items-stretch gap-20">
                <div className="flex-1 p-6 flex flex-col items-center justify-center">
                  <div className="text-[40px] md:text-[48px] sm:text-[32px] font-semibold text-[#1D4ED8] leading-tight">27.45+</div>
                  <div className="mt-4 text-[13px] text-gray-600">crore worth of assets under litigation handled</div>
                </div>
                <div className="flex-1 p-6 flex flex-col items-center justify-center">
                  <div className="text-[40px] md:text-[48px] sm:text-[32px] font-semibold text-[#1D4ED8] leading-tight">73,000</div>
                  <div className="mt-4 text-[13px] text-gray-600">Average Money Saved per User</div>
                </div>
                <div className="flex-1 p-6 flex flex-col items-center justify-center">
                  <div className="text-[40px] md:text-[48px] sm:text-[32px] font-semibold text-[#1D4ED8] leading-tight">4.83</div>
                  <div className="mt-4 text-[13px] text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Frequently Asked<br/>Questions</h2>
              <p className="mt-3 text-sm text-gray-700">Still have any questions? Contact our Team via<br/><a href="mailto:support@medencelegal.in" className="text-[#3B82F6] underline">support@medencelegal.in</a></p>
              <a href="/faqs" className="mt-6 inline-flex rounded-md bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">See All FAQ's</a>
            </div>
            <div className="grid gap-4">
              {[
                "Are you an insurance company?",
                "Why is the plan pricing so affordable while lawyers outside charge so high?",
                "Can I avail the lawyer service after the trouble arises and not before?",
                "Can I contact my personal lawyer in emergency situations?",
                "Is my information safe and confidential with Medence?",
                "Do you have in-house lawyers?",
              ].map((q) => (
                <div key={q} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-800">{q}</p>
                    <span className="ml-4 inline-flex h-7 w-7 items-center justify-center rounded-sm bg-[#0A58ED] text-white font-bold">+</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add carousel auto-scroll and controls behavior
const runCarouselScript = () => {
  const carousel = document.getElementById('test-carousel') as HTMLElement | null;
  const prev = document.getElementById('test-prev');
  const next = document.getElementById('test-next');
  if (!carousel) return;
  let rafId: number | null = null;
  let lastTime = 0;
  const speed = 80; // pixels per second

  const start = () => {
    stop();
    if (!carousel.dataset.cloned) {
      const children = Array.from(carousel.children) as HTMLElement[];
      const style = window.getComputedStyle(carousel as Element) as CSSStyleDeclaration & { gap?: string };
      const gap = parseInt(style.gap || style.columnGap || '16') || 16;
      let originalWidth = 0;
      children.forEach((c) => {
        originalWidth += c.offsetWidth + gap;
      });
      carousel.dataset.originalWidth = String(originalWidth);
      children.forEach((c) => {
        const clone = c.cloneNode(true) as HTMLElement;
        carousel.appendChild(clone);
      });
      carousel.dataset.cloned = 'true';
    }

    lastTime = performance.now();

    const stepFn = (time: number) => {
      const elapsed = time - lastTime;
      lastTime = time;
      const originalWidth = parseFloat(carousel.dataset.originalWidth || '0');
      const delta = (speed * elapsed) / 1000;
      carousel.scrollLeft = carousel.scrollLeft + delta;
      if (originalWidth && carousel.scrollLeft >= originalWidth) {
        carousel.scrollLeft = carousel.scrollLeft - originalWidth;
      }
      rafId = requestAnimationFrame(stepFn);
    };

    rafId = requestAnimationFrame(stepFn);
  };

  const stop = () => {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  };

  if (prev && next) {
    prev.addEventListener('click', () => {
      stop();
      const card = carousel.querySelector('.testimonial-card') as HTMLElement | null;
      const step = card ? card.offsetWidth + (parseInt(window.getComputedStyle(carousel as Element).gap || '16') || 16) : carousel.clientWidth;
      carousel.scrollBy({ left: -step, behavior: 'smooth' });
      setTimeout(() => start(), 700);
    });
    next.addEventListener('click', () => {
      stop();
      const card = carousel.querySelector('.testimonial-card') as HTMLElement | null;
      const step = card ? card.offsetWidth + (parseInt(window.getComputedStyle(carousel as Element).gap || '16') || 16) : carousel.clientWidth;
      carousel.scrollBy({ left: step, behavior: 'smooth' });
      setTimeout(() => start(), 700);
    });
  }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('pointerdown', stop);
  carousel.addEventListener('pointerup', () => setTimeout(() => start(), 600));

  start();
};

// Run after DOMContent loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', runCarouselScript);
}
