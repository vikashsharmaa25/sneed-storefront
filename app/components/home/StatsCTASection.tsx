import React from 'react';
import { MessageSquare, BookOpen } from 'lucide-react';
import { Container } from '../ui/Container';
import type { Stat } from '~/lib/api/stats.server';

interface StatsCTASectionProps {
    stats?: Stat[];
}

const defaultStats: { id?: number; count: number; stat_name: string }[] = [
    { count: 500, stat_name: 'Success Stories' },
    { count: 98, stat_name: 'Customer Satisfaction' },
    { count: 50, stat_name: 'Industries Served' },
    { count: 25, stat_name: 'Years Experience' }
];

const StatsCTASection: React.FC<StatsCTASectionProps> = ({ stats }) => {
    const displayStats = stats?.length ? stats : defaultStats;

    return (
        <div className="bg-gray-50 flex items-center justify-center p-8">
            <Container>
                {/* Stats Bar */}
                <div className="bg-linear-to-r from-red-800 to-red-900 rounded-2xl shadow-2xl p-12 mb-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayStats.map((stat, index) => (
                            <div key={stat.id || index} className="text-center">
                                <div className="text-white text-5xl font-bold mb-2">
                                    {stat.count}+
                                </div>
                                <div className="text-white text-sm font-medium opacity-90">
                                    {stat.stat_name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-gray-900 text-2xl font-semibold mb-4">
                        Ready to Write Your Success Story?
                    </h2>

                    <p className="text-gray-600 text-base mb-8 max-w-2xl mx-auto">
                        Join hundreds of satisfied customers who have transformed their operations with our coding solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="inline-flex items-center gap-2 section-red hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg">
                            <MessageSquare className="w-5 h-5" />
                            <span>Request a Consultation</span>
                        </button>

                        <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300 transition-colors duration-200">
                            <BookOpen className="w-5 h-5" />
                            <span>Browse All Stories</span>
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default StatsCTASection;