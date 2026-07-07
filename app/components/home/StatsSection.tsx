const StatsSection = () => {
  const stats = [
    {
      number: "8",
      label: "Premium Brands",
    },
    {
      number: "1,330+",
      label: "Total Products",
    },
    {
      number: "25+",
      label: "Years Experience",
    },
    {
      number: "50+",
      label: "Industries Served",
    },
  ]

  return (
    <div className="py-20 grid grid-cols-2 md:grid-cols-4 gap-2 max-w-7xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center bg-[#FFFFFF0D] w-[295px] h-[122px] flex flex-col justify-center items-center rounded-xl border border-white/10">
          <h1 className="title-heading text-3xl md:text-4xl font-bold mb-2">{stat.number}</h1>
          <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsSection
