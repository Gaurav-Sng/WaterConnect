import { Menu, X, Search, Users, Truck, CheckCircle, ChevronRight, Droplet } from 'lucide-react';

const HeroIllustration = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Gradient Circles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-sky-200 rounded-full opacity-30 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-200 rounded-full opacity-40 blur-3xl animate-float-delayed"></div>
      </div>

      {/* Main SVG Illustration */}
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        {/* Central Water Droplet */}
        <g className="animate-pulse-slow">
          <path
            d="M200 80 C180 100, 160 130, 160 160 C160 190, 180 210, 200 210 C220 210, 240 190, 240 160 C240 130, 220 100, 200 80 Z"
            fill="url(#dropletGradient)"
            opacity="0.9"
          />
          <ellipse cx="190" cy="140" rx="8" ry="15" fill="white" opacity="0.4" />
        </g>

        {/* Connected Nodes - Supply Chain Network */}
        {/* Top Left Node */}
        <g className="animate-float">
          <circle cx="100" cy="120" r="25" fill="url(#nodeGradient)" opacity="0.8" />
          <circle cx="100" cy="120" r="15" fill="white" opacity="0.6" />
          <path d="M100 110 L105 120 L100 125 L95 120 Z" fill="#38bdf8" />
        </g>

        {/* Top Right Node */}
        <g className="animate-float-delayed">
          <circle cx="300" cy="120" r="25" fill="url(#nodeGradient)" opacity="0.8" />
          <circle cx="300" cy="120" r="15" fill="white" opacity="0.6" />
          <Truck className="w-4 h-4" style={{ transform: 'translate(292px, 112px)' }} />
        </g>

        {/* Bottom Left Node */}
        <g className="animate-float-delayed-2">
          <circle cx="120" cy="280" r="25" fill="url(#nodeGradient)" opacity="0.8" />
          <circle cx="120" cy="280" r="15" fill="white" opacity="0.6" />
        </g>

        {/* Bottom Right Node */}
        <g className="animate-float">
          <circle cx="280" cy="280" r="25" fill="url(#nodeGradient)" opacity="0.8" />
          <circle cx="280" cy="280" r="15" fill="white" opacity="0.6" />
        </g>

        {/* Connecting Lines */}
        <g opacity="0.3">
          <line x1="115" y1="135" x2="185" y2="170" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="215" y1="170" x2="285" y2="135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="185" y1="195" x2="135" y2="265" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="215" y1="195" x2="265" y2="265" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Flowing Particles */}
        <circle cx="150" cy="150" r="3" fill="#38bdf8" opacity="0.6">
          <animateMotion path="M0,0 L50,20 L100,0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="150" r="3" fill="#38bdf8" opacity="0.6">
          <animateMotion path="M0,0 L-50,20 L-100,0" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#38bdf8" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Water Droplets */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-sky-300 rounded-full opacity-40 animate-float-slow"></div>
      <div className="absolute bottom-32 right-24 w-4 h-4 bg-blue-300 rounded-full opacity-50 animate-float-delayed"></div>
      <div className="absolute top-40 right-32 w-5 h-5 bg-sky-200 rounded-full opacity-30 animate-float"></div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slideInLeft">
            <div className="inline-flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-sky-600">Connecting Communities with Clean Water</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
              Pure Water,{' '}
              <span className="text-sky-400 block mt-2">Seamlessly Connected.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
              WaterConnect bridges the gap between trusted water suppliers and communities, ensuring safe, hygienic water delivery for all.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Find Water Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-sky-400 hover:text-sky-400 transition-all duration-200">
                Become a Supplier
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-200 to-blue-300 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700"
                  >
                    {i === 4 ? '+' : ''}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-800">Trusted by 500+ Suppliers</p>
                <p className="text-slate-600">& 50,000+ Consumers</p>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative animate-slideInRight">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;