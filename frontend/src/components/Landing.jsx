import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const features = [
  {
    icon: "fa-chart-pie",
    title: "Visual Insights",
    description:
      "See where your money goes with clean charts and real-time balance updates.",
    color: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-400",
  },
  {
    icon: "fa-wallet",
    title: "Track Income & Expenses",
    description:
      "Log every transaction in seconds and keep your cash flow organized.",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: "fa-shield-halved",
    title: "Secure & Private",
    description:
      "Your data stays yours — protected login and encrypted sessions.",
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
  },
];

const stats = [
  { value: "100%", label: "Free to use" },
  { value: "24/7", label: "Access anywhere" },
  { value: "3s", label: "Avg. log time" },
];

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <nav
        className={`relative z-20 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <i className="fa-solid fa-coins text-white text-sm" />
          </div>
          <span className="text-xl font-bold theme-heading tracking-tight group-hover:text-indigo-400 transition-colors duration-300">
            FinTrack
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="landing-btn-ghost px-5 py-2.5 rounded-xl text-sm font-medium theme-subtext hover:theme-heading transition-all duration-300 cursor-pointer"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="landing-btn-primary group px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
          >
            Get Started
            <i className="fa-solid fa-arrow-right text-xs ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-12 pt-12 md:pt-20 pb-24 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Personal finance, simplified
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-white">Take control of</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">
              your money
            </span>
          </h1>

          <p
            className={`mt-6 text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Track income, manage expenses, and visualize your financial health —
            all in one beautiful dashboard.
          </p>

          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to="/signup"
              className="landing-btn-primary group px-8 py-4 rounded-2xl text-base font-bold text-white w-full sm:w-auto cursor-pointer"
            >
              Start for free
              <i className="fa-solid fa-rocket text-sm ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/login"
              className="landing-btn-outline group px-8 py-4 rounded-2xl text-base font-semibold text-gray-200 w-full sm:w-auto cursor-pointer"
            >
              I have an account
              <i className="fa-solid fa-arrow-right-long text-sm ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Dashboard preview mockup */}
        <div
          className={`mt-16 md:mt-24 relative transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 landing-card-hover cursor-default">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Total Balance", value: "$12,450", color: "text-emerald-400", icon: "fa-wallet" },
                { label: "Income", value: "$8,200", color: "text-indigo-400", icon: "fa-arrow-trend-up" },
                { label: "Expenses", value: "$3,750", color: "text-pink-400", icon: "fa-arrow-trend-down" },
              ].map((card, i) => (
                <div
                  key={card.label}
                  className="bg-white/5 rounded-2xl p-5 border border-white/5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</span>
                    <i className={`fa-solid ${card.icon} ${card.color} text-sm opacity-70`} />
                  </div>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 h-32 rounded-2xl bg-gradient-to-t from-indigo-500/10 to-transparent border border-white/5 flex items-end px-4 pb-2 gap-1">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-60 transition-all duration-500 hover:opacity-100 hover:scale-y-110 origin-bottom"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${800 + i * 100}ms` }}
            >
              <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Everything you need
          </h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto">
            Powerful tools wrapped in a simple, intuitive experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`glass-panel rounded-2xl p-7 landing-feature-card cursor-default transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${hoveredFeature === i ? "landing-feature-active" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 transition-transform duration-300 ${
                  hoveredFeature === i ? "scale-110 -rotate-3" : ""
                }`}
              >
                <i className={`fa-solid ${feature.icon} ${feature.iconColor} text-lg`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 pb-24 max-w-3xl mx-auto text-center">
        <div className="glass-panel rounded-3xl p-10 md:p-14 border border-indigo-500/10 landing-card-hover">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Ready to master your finances?
          </h2>
          <p className="text-gray-400 mt-3 mb-8">
            Join FinTrack today — no credit card required.
          </p>
          <Link
            to="/signup"
            className="landing-btn-primary group inline-flex items-center px-10 py-4 rounded-2xl text-base font-bold text-white cursor-pointer"
          >
            Create your account
            <i className="fa-solid fa-sparkles text-sm ml-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} FinTrack. Built with care.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
