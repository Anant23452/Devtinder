import { useState } from "react";

// Keep Silver & Gold plan definitions in one array so both cards render cleanly without duplicating JSX.
const PREMIUM_PLANS = [
  {
    id: "silver",
    name: "Silver",
    tagline: "Essential perks for daily networking",
    price: "₹299",
    duration: "3 months",
    badge: null,
    features: [
      "100 connection requests per day",
      "Blue Verified Developer badge",
      "Unlimited chat with matches",
      "3-month membership validity",
    ],
    buttonLabel: "Buy Silver",
    cardBorderClass: "border-slate-500/60",
    badgeClass: "badge-ghost border-slate-400/50 text-slate-200",
    checkColorClass: "text-slate-300",
    buttonClass:
      "bg-slate-200 text-slate-950 hover:bg-white focus-visible:outline-slate-200",
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Maximum visibility and unlimited reach",
    price: "₹699",
    duration: "6 months",
    badge: "Most Popular",
    features: [
      "Infinite connection requests per day",
      "Gold Verified Developer badge",
      "Unlimited chat with matches",
      "Priority profile boost in Feed",
      "6-month membership validity",
    ],
    buttonLabel: "Buy Gold",
    cardBorderClass: "border-amber-400/80 shadow-2xl shadow-amber-950/30",
    badgeClass: "bg-amber-400/20 border-amber-300/60 text-amber-200",
    checkColorClass: "text-amber-300",
    buttonClass:
      "bg-amber-400 text-slate-950 hover:bg-amber-300 focus-visible:outline-amber-300",
  },
];

function Premium() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    // Dedicated dark-luxury surface so Premium feels distinct from the rest of the cupcake-themed app
    <main
      data-theme="dark"
      className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 px-4 pt-12 pb-28 [color-scheme:only_dark]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom in oklab, #020617, #0f172a, #020617)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <header className="text-center max-w-xl mx-auto mb-10">
          <span className="badge border-amber-400/50 bg-amber-400/15 text-amber-200 font-semibold px-3 py-3 mb-4">
            DevTinder VIP
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
            Upgrade to Premium
          </h1>
          <p className="mt-3 text-base text-slate-300">
            Unlock verified status, more daily connection requests, and faster
            matches across the developer community.
          </p>
        </header>

        {/* Selection Feedback Banner */}
        <div aria-live="polite" className="max-w-xl mx-auto mb-8">
          {selectedPlan && (
            <div
              role="status"
              className="alert bg-slate-900 border border-amber-400/50 text-slate-100 shadow-md"
            >
              <span>
                Selected <strong>{selectedPlan.name} Plan</strong> (
                {selectedPlan.price} / {selectedPlan.duration}) — ready to
                connect payment checkout.
              </span>
            </div>
          )}
        </div>

        {/* Silver & Gold Pricing Grid (DaisyUI Card Structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PREMIUM_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`card bg-slate-900/95 border ${plan.cardBorderClass} rounded-2xl transition-transform duration-200 hover:-translate-y-1`}
            >
              <div className="card-body p-8 flex flex-col">
                {/* Plan Header + Optional Highlight Badge */}
                <div className="flex items-center justify-between gap-2">
                  <h2 className="card-title text-2xl font-bold text-slate-50">
                    {plan.name}
                  </h2>
                  {plan.badge && (
                    <span
                      className={`badge badge-sm font-semibold px-3 py-2.5 border ${plan.badgeClass}`}
                    >
                      <span aria-hidden="true">★</span>
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 mt-1">{plan.tagline}</p>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-50">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-300">
                    / {plan.duration}
                  </span>
                </div>

                <div className="divider my-4 before:bg-slate-700/70 after:bg-slate-700/70" />

                {/* Feature Checklist */}
                <ul className="flex flex-col gap-3 text-sm text-slate-200 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className={`size-5 shrink-0 mt-0.5 ${plan.checkColorClass}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="card-actions mt-auto">
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`btn w-full min-h-11 border-0 font-semibold text-base focus-visible:outline-2 focus-visible:outline-offset-2 ${plan.buttonClass}`}
                  >
                    {plan.buttonLabel}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Premium;
