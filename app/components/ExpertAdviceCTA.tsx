import React from 'react';
import { MessageCircle, Scale } from 'lucide-react';
import { Container } from './ui/Container';

const ExpertAdviceCTA: React.FC = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center p-8">
            <Container>
                <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-12">
                    <div className="text-center">
                        <h2 className="text-white text-2xl font-semibold mb-4">
                            Not Sure Which Product Is Right for You?
                        </h2>

                        <p className="text-gray-300 text-base mb-8 max-w-2xl mx-auto">
                            Our product specialists are here to help you find the perfect coding solution for your specific needs and budget
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="inline-flex items-center gap-2 section-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg">
                                <MessageCircle className="w-5 h-5" />
                                <span>Get Expert Advice</span>
                            </button>

                            <button className="inline-flex items-center gap-2 bg-transparent hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg border-2 border-white transition-colors duration-200">
                                <Scale className="w-5 h-5" />
                                <span>Compare Products</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ExpertAdviceCTA;