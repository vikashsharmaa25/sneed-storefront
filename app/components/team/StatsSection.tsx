import React from 'react';
import { Users, Target, Award } from 'lucide-react';
import StatsCard from './StatsCard';
import { Container } from '../ui/Container';

const stats = [
  { icon: Users, value: '150+', label: 'Team Members' },
  { icon: Target, value: '50+', label: 'Active Projects' },
  { icon: Award, value: '98%', label: 'Success Rate' }
];

const StatsSection: React.FC = () => {
  return (
    <Container className="md:p-20 sm:p-10 p-4 bg-gray-100 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Since 1995, Sneed Coding Solutions has been at the forefront of industrial coding and marking technology. Our team of dedicated professionals brings together decades of experience, innovative thinking, and unwavering commitment to customer success.
          <br />
          We're not just a company that sells coding equipment – we're your partners in operational excellence. Every member of our team is dedicated to understanding your unique challenges and delivering solutions that drive real results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </Container>
  );
};

export default StatsSection;
