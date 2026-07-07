import StatsSection from "./StatsSection"
import TeamHero from "./TeamHero"
import TeamSection from "./TeamSection"

interface TeamMember {
    id: string
    name: string
    role: string
    image: string
    bio?: string
    email?: string
    phone?: string
    location?: string
}

const leadershipTeam: TeamMember[] = [
    {
        id: "1",
        name: "John Mitchell",
        role: "Chief Executive Officer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        bio: "John leads our company with strategic vision and 20+ years of industry expertise to drive innovation and growth.",
    },
    {
        id: "2",
        name: "Sarah Chen",
        role: "Chief Technology Officer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
        bio: "Sarah drives our innovation strategy, ensuring we stay ahead of the technology curve in a rapidly evolving landscape.",
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        role: "Chief Operating Officer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
        bio: "Michael oversees global operations, managing complex workflows and ensuring seamless delivery of services.",
    },
    {
        id: "4",
        name: "Emily Thompson",
        role: "Chief Financial Officer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
        bio: "Emily manages our financial strategy and investments, driving sustainable growth and shareholder value.",
    },
]

const salesTeam: TeamMember[] = [
    {
        id: "5",
        name: "David Park",
        role: "Sales Director",
        location: "North America",
        email: "david.park@company.com",
        phone: "1-855-555-3444",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    },
    {
        id: "6",
        name: "Lisa Anderson",
        role: "Marketing Manager",
        location: "Global",
        email: "l.anderson@company.com",
        phone: "1-800-555-3444",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    },
    {
        id: "7",
        name: "James Wilson",
        role: "Regional Sales Manager",
        location: "East Coast",
        email: "james.w@company.com",
        phone: "1-833-555-0666",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
    },
    {
        id: "8",
        name: "Maria Garcia",
        role: "Account Executive",
        location: "West Coast",
        email: "m.garcia@company.com",
        phone: "1-833-555-3443",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
    },
]

const technicalTeam: TeamMember[] = [
    {
        id: "9",
        name: "Robert Chang",
        role: "Technical Services Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        bio: "Contact",
    },
    {
        id: "10",
        name: "Amanda Foster",
        role: "Senior Technical Engineer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
        bio: "Contact",
    },
    {
        id: "11",
        name: "Kevin Martinez",
        role: "Field Service Manager",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
        bio: "Contact",
    },
    {
        id: "12",
        name: "Rachel Kim",
        role: "Training Specialist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
        bio: "Contact",
    },
]

export default function Teams() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <TeamHero image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" />

            <StatsSection />

            {/* Leadership Team */}
            <TeamSection
                title="Leadership Team"
                description="Our executive leadership brings strategic vision and industry expertise to drive innovation and growth."
                members={leadershipTeam}
                type="leadership"
                index={1}
            />

            {/* Sales & Marketing Team */}
            <TeamSection
                title="Sales & Marketing Team"
                description="Our sales professionals are here to help you find the perfect solution for your business needs."
                members={salesTeam}
                type="sales"
                index={0}
            />

            {/* Technical Services Team */}
            <TeamSection
                title="Technical Services Team"
                description="Expert technical support and training to ensure your success with our solutions."
                members={technicalTeam}
                type="technical"
                index={3}
            />
        </div>
    )
}
