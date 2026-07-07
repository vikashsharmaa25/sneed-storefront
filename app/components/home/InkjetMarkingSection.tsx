import React from 'react';

interface MessageSection {
    id: number;
    display_order: number;
    section_title: string;
    content: string;
}

interface InkjetMarkingSectionProps {
    messageSections?: MessageSection[];
}

const InkjetMarkingSection = ({ messageSections }: InkjetMarkingSectionProps) => {
    if (!messageSections || messageSections.length === 0) return null;

    // Sort by display_order
    const sortedSections = [...messageSections].sort((a, b) => a.display_order - b.display_order);

    // console.log("sortedSections =====> ", sortedSections);

    return (
        <>
            {sortedSections.map((section) => (
                <section key={section.id} className="bg-gray-100 py-12 px-4">
                    <div className="container mx-auto max-w-5xl text-center">
                        {section.section_title && (
                            <h2 className="text-3xl font-bold mb-6">
                                {section.section_title}
                            </h2>
                        )}
                        <div
                            className="space-y-4 text-gray-700 inkjet-marking-content"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    </div>
                </section>
            ))}
        </>
    );
};

export default InkjetMarkingSection;
