import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  altText?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  altText = 'Product',
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-4/3">
        <img
          src={images[selectedImage]}
          alt={altText}
          className="w-full h-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-red-500' : 'border-gray-200'
                }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
