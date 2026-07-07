export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface TeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  index?: number;
}

export interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

export interface TeamHeroProps {
  image: string;
  title?: string;
  subtitle?: string;
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
  email?: string
  phone?: string
  location?: string
}

export interface TeamSectionProps {
  title: string
  description: string
  members: TeamMember[]
  type: "leadership" | "sales" | "technical"
}