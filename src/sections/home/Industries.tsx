import { HiOutlineChip, HiOutlineCurrencyDollar, HiOutlineHeart, HiOutlineLightBulb } from 'react-icons/hi'

const industries = [
  {
    icon: HiOutlineHeart,
    name: "Health",
    description: "Osmind, San Francisco. A web app for mental health providers and self-scheduling, built under HIPAA.",
    color: "text-rose-300",
    bgColor: "bg-rose-300/10",
    borderColor: "hover:border-rose-300/30",
    years: "2022 to 2023"
  },
  {
    icon: HiOutlineCurrencyDollar,
    name: "Fintech",
    description: "Clip and Finloop. Microservices for the Amazon Seller API and admin apps for finance.",
    color: "text-lime-300",
    bgColor: "bg-lime-300/10",
    borderColor: "hover:border-lime-300/30",
    years: "2020 to 2022"
  },
  {
    icon: HiOutlineChip,
    name: "Infrastructure",
    description: "Porter, New York. Product engineering for app infrastructure on any cloud.",
    color: "text-blue-300",
    bgColor: "bg-blue-300/10",
    borderColor: "hover:border-blue-300/30",
    years: "2026 to today"
  },
  {
    icon: HiOutlineLightBulb,
    name: "Education",
    description: "Sakura Kode Academy. Workshops and courses for new developers.",
    color: "text-amber-300",
    bgColor: "bg-amber-300/10",
    borderColor: "hover:border-amber-300/30",
    years: "2024"
  }
]

const Industries = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
            <p className="text-lime-300 font-medium">Where I've worked</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Software for <span className="text-lime-300">health, money</span> and{' '}
            <span className="text-lime-300">infrastructure</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Eight years across startups in Mexico and the United States.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className={`group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 ${industry.borderColor} transition-all hover:bg-zinc-800/70 flex flex-col h-full`}
            >
              <div className="flex items-center gap-4 mb-6">
                {/* Icon */}
                <div className={`p-4 rounded-xl ${industry.bgColor} ${industry.color} shrink-0`}>
                  <industry.icon className="w-8 h-8" aria-hidden="true" />
                </div>
                {/* Title */}
                <h3 className={`text-2xl font-semibold ${industry.color} leading-tight`}>
                  {industry.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed flex-grow">
                {industry.description}
              </p>

              {/* Years */}
              <p className={`mt-6 text-sm font-medium ${industry.color}`}>
                {industry.years}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Industries 