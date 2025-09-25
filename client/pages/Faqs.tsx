import { useState } from "react";

export default function Faqs() {
  const data = {
    General: [
      {
        q: "What are included and excluded in the plan?",
        a: "See the pricing page for what's included and excluded in each plan.",
      },
      {
        q: "What are the different type plans?",
        a: "We offer basic, premium, and enterprise plans for different needs.",
      },
      {
        q: "Can I take more than one plan?",
        a: "Yes, you can subscribe to multiple plans for different requirements.",
      },
      {
        q: "Does the plan also include my family members?",
        a: "Some plans include family cover. Check plan details for options.",
      },
    ],
    Plan: [
      {
        q: "Why is the plan pricing so affordable while lawyers outside charge so high?",
        a: "Medence provides affordable pricing by leveraging a scalable and aggregation model that enables us to offer legal services at a lower cost while maintaining high-quality expertise. Our focus is on providing value to customers without the high overhead costs associated with traditional law firms.",
      },
      {
        q: "Can I upgrade and downgrade my plan later?",
        a: "Yes, you can upgrade or downgrade your plan anytime.",
      },
    ],
    Lawyer: [
      {
        q: "Can I contact my personal lawyer in emergency situations?",
        a: "Yes, emergency escalation is available depending on your plan.",
      },
      {
        q: "Do you have in-house lawyers?",
        a: "We have in-house lawyers and a network of partners for special cases.",
      },
    ],
    Billing: [
      {
        q: "What payment methods do you accept?",
        a: "We accept cards, UPI, and for enterprise, bank transfers and invoices.",
      },
      {
        q: "How does billing and refunds work?",
        a: "Billing is monthly or yearly. Refunds follow our cancellation policy.",
      },
    ],
    Others: [
      {
        q: "Is my information safe and confidential with Medence?",
        a: "We follow strict confidentiality and data protection standards.",
      },
      {
        q: "How can I contact support for other queries?",
        a: "Email support@medencelegal.in or use the contact form on our website.",
      },
      {
        q: "Can I avail the lawyer service after the trouble arises and not before?",
        a: "Yes, you can avail our lawyer service even after an issue arises.",
      },
    ],
  } as const;

  const categories = Object.keys(data);
  const [active, setActive] = useState<string>(categories[0]);

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center">Frequently asked questions</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <aside className="md:col-span-3">
            <div className="space-y-4">
              {categories.map((cat) => {
                const isActive = cat === active;
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={
                      `w-full text-left px-4 py-3 rounded-md transition-colors focus:outline-none ` +
                      (isActive
                        ? "bg-[#3B82F6] text-white shadow-md"
                        : "bg-[#EAF2FF] text-[#1F2937] hover:bg-[#d6eaff]")
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="md:col-span-9">
            <div className="space-y-4">
              {data[active as keyof typeof data].map((item) => (
                <details key={item.q} className="group rounded-md border border-gray-200 bg-white p-4" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                    {item.q}
                    <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-3 text-gray-600 text-sm">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Have more questions? Contact us at {" "}
          <a href="mailto:support@medencelegal.in" className="text-[#3B82F6] underline">support@medencelegal.in</a>
        </p>
      </section>
    </div>
  );
}
