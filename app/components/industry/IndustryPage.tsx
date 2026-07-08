import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Tag, Package2 } from 'lucide-react';

interface IndustryProduct {
  product_id: number;
  name: string;
  price: number;
  cat_id: number;
  brand_id: number;
  img: string;
}

interface Industry {
  id: number;
  slug: string;
  status: string;
  name: string;
  description: string;
  products: IndustryProduct[];
}

interface IndustryPageProps {
  industry: Industry;
}

function formatPrice(price: number): string {
  if (!price || price === 0) return 'Contact for Price';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function stripHtml(html: string): string {
  return html?.replace(/<[^>]*>?/gm, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim() || '';
}

const FALLBACK_IMG = "https://placehold.co/400x400/f4f4f5/94a3b8?text=No+Image";

export default function IndustryPage({ industry }: IndustryPageProps) {
  const navigate = useNavigate();
  const descriptionText = stripHtml(industry.description);
  const shortDesc = descriptionText.length > 180
    ? descriptionText.substring(0, 180) + '...'
    : descriptionText;

  return (
    <div className="min-h-screen bg-[#f8f8f9]">
      {/* Hero Banner */}
      <div
        className="relative bg-[#1a1a1f] overflow-hidden"
        style={{ minHeight: '260px' }}
      >
        {/* Abstract BG pattern */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(200,30,30,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 10% 80%, rgba(200,30,30,0.10) 0%, transparent 80%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 flex flex-col gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-fit mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Industry
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white capitalize tracking-tight leading-tight">
            {industry.name.replace(/-/g, ' ')}
          </h1>
          {shortDesc && (
            <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
              {shortDesc}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Package2 className="w-4 h-4 text-red-400" />
            <span className="text-gray-400 text-sm">
              {industry.products?.length || 0} product{industry.products?.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {!industry.products || industry.products.length === 0 ? (
          <EmptyState industryName={industry.name} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Products for{' '}
                <span className="text-red-600 capitalize">
                  {industry.name.replace(/-/g, ' ')}
                </span>
              </h2>
              <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                {industry.products.length} result{industry.products.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {industry.products.map((product) => (
                <IndustryProductCard
                  key={product.product_id}
                  product={product}
                  onViewDetails={() => navigate(`/products/${product.product_id}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product Card                                                          */
/* ------------------------------------------------------------------ */
function IndustryProductCard({
  product,
  onViewDetails,
}: {
  product: IndustryProduct;
  onViewDetails: () => void;
}) {
  const [imgError, setImgError] = React.useState(false);
  const imgSrc = (!product.img || imgError) ? FALLBACK_IMG : product.img;
  const priceStr = formatPrice(product.price);
  const isFree = !product.price || product.price === 0;

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={onViewDetails}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImgError(true)}
        />
        {isFree && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm">
            Contact
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 flex-1 group-hover:text-red-600 transition-colors duration-200 leading-snug">
          {product.name}
        </h4>

        {isFree ? (
          <p className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Contact for Price
          </p>
        ) : (
          <p className="text-base font-bold text-red-600 mb-4">{priceStr}</p>
        )}

        <button
          className="w-full bg-[#1a1a1f] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-[0.98]"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          <span>View Details</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty State                                                           */
/* ------------------------------------------------------------------ */
function EmptyState({ industryName }: { industryName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Package2 className="w-9 h-9 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Yet</h3>
      <p className="text-gray-500 text-sm max-w-sm">
        We're currently building our product catalog for the{' '}
        <span className="font-semibold capitalize text-gray-700">
          {industryName.replace(/-/g, ' ')}
        </span>{' '}
        industry. Check back soon!
      </p>
    </div>
  );
}
