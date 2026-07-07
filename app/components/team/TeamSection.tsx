import type React from "react"
import { LeadershipCard } from "./LeadershipCard"
import { SalesCard } from "./SalesCard"
import { TechnicalCard } from "./TechnicalCard"
import { Container } from "../ui/Container"
import type { TeamMember, TeamSectionProps } from "./types/team"

const TeamSection = ({ title, description, members, type, index = 0 }: any) => {
  const renderCard = (member: TeamMember) => {
    switch (type) {
      case "leadership":
        return <LeadershipCard key={member.id} {...member} />
      case "sales":
        return <SalesCard key={member.id} {...member} />
      case "technical":
        return <TechnicalCard key={member.id} {...member} />
      default:
        return <LeadershipCard key={member.id} {...member} />
    }
  }

  return (
    <>
      <Container className={`py-16 md:py-24 px-4 md:px-8 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} mt-10`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member: any) => renderCard(member))}
        </div>
      </Container>
    </>
  )
}

export default TeamSection
