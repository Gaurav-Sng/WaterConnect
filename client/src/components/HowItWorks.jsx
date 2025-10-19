import { Search, Users, Truck, CheckCircle, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Find & Order',
      description: 'Search for certified suppliers in your area and place an order with just a few clicks.',
      color: 'from-sky-400 to-blue-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Smart Matching',
      description: 'Our intelligent system instantly connects your order with the nearest available supplier.',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Quick Delivery',
      description: 'Receive safe, hygienic water delivered directly to your doorstep within hours.',
      color: 'from-indigo-400 to-purple-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800">
            How It <span className="text-sky-400">Works</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Three simple steps to connect you with clean, safe water
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>

              {/* Decorative Element */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                  <ChevronRight className="w-6 h-6 text-sky-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            Get Started Today
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;