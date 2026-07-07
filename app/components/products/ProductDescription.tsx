import React from 'react';
import { Play } from 'lucide-react';
import type { ProductDescriptionProps } from './types';

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
    description,
    videoUrl = 'https://www.youtube.com/watch?v=example',
    videoTitle = 'Watch Product Demo',
    videoSubtitle = 'See the product in action',
}) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Product Description</h3>
                <div
                    className="text-sm text-gray-600 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>

            <div className="bg-black rounded-lg p-8 flex items-center justify-center aspect-video">
                <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col items-center justify-center group"
                >
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors mb-3">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                    <div className="text-center">
                        <h4 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                            {videoTitle}
                        </h4>
                        <p className="text-sm text-gray-400">{videoSubtitle}</p>
                    </div>
                </a>
            </div>
        </div>
    );
};
