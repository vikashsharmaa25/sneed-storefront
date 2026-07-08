import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Swiper, SwiperSlide } from '~/components/common/Swiper';
import { Container } from '~/components/ui/Container';
import { getRecommendations, type RecommendationGroup, type RecommendationItem } from '~/lib/api/recommendations.client';
import toast from 'react-hot-toast';

interface RecommendationCardProps {
  item: RecommendationItem;
  subtitle: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, subtitle }) => {
  console.log("item", item)
  const imageUrl = item.image_url || item.product_image_url || item.variant_image_url || 'https://placehold.co/600x600/e2e8f0/64748b?text=Product';
  const formattedPrice = `${item.currency_symbol || '$'}${parseFloat(item.selling_price || '0').toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Link
      to={`/products/${item.id}`}
      className="group relative bg-white rounded-2xl border border-gray-100/60 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col h-full shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col grow">
        {subtitle && (
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
            {subtitle}
          </span>
        )}
        <h4 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 h-10 group-hover:text-red-600 transition-colors duration-200">
          {item.title}
        </h4>
        <p className="text-base font-bold text-red-600 mb-4 mt-auto">{formattedPrice}</p>
        <button
          className="w-full primary-btn py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <span>View Details</span>
          <svg
            className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Link>
  );
};

const SwiperSectionSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-6 w-64 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100/60 overflow-hidden p-5 space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl w-full" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded-xl w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

interface RecommendationGroupSwiperProps {
  group: RecommendationGroup;
}

const RecommendationGroupSwiper: React.FC<RecommendationGroupSwiperProps> = ({ group }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (s: any) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const getSubtitle = (type: string) => {
    switch (type) {
      case 'recently_viewed':
        return 'Based on your activity';
      case 'left_in_cart':
        return 'Don\'t miss out';
      default:
        return 'Recommended for you';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'recently_viewed':
        return <Sparkles className="w-5 h-5 text-red-600 inline mr-2" />;
      case 'left_in_cart':
        return <ShoppingBag className="w-5 h-5 text-red-600 inline mr-2" />;
      default:
        return null;
    }
  };

  const swiperBreakpoints = {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 1.8,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  const swiperStyle = {
    '--swiper-navigation-size': '16px',
    '--swiper-navigation-color': 'currentColor',
    '--swiper-pagination-color': '#9A1A1C',
  } as React.CSSProperties;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
            {getSubtitle(group.type)}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center">
            {getIcon(group.type)}
            {group.title}
          </h3>
        </div>

        {group.items.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiper?.slidePrev()}
              disabled={isBeginning}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center transition-all duration-300 hover:text-white primary-btn disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-800 disabled:hover:border-slate-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              disabled={isEnd}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center transition-all duration-300 hover:text-white primary-btn disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-800 disabled:hover:border-slate-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative px-1">
        <Swiper
          id={group.type}
          style={swiperStyle}
          breakpoints={swiperBreakpoints}
          showNavigation={false}
          showPagination={group.items.length > 1}
          paginationClassName="mt-12"
          className="py-4"
          onSwiper={(s: any) => {
            setSwiper(s);
            updateNavigationState(s);
          }}
          onSlideChange={updateNavigationState}
          onResize={updateNavigationState}
          onUpdate={updateNavigationState}
        >
          {group.items.map((item, itemIdx) => (
            <SwiperSlide key={item.id || itemIdx} className='swiper-card'>
              <RecommendationCard
                item={item}
                subtitle={group.type === 'recently_viewed' ? 'Recent View' : 'Left in Cart'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export const RecommendationsSection: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await getRecommendations();
        const activeGroups = data.filter(group => group.items && group.items.length > 0);
        setRecommendations(activeGroups);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-50/50 py-16 border-t border-b border-gray-100/50">
        <Container>
          <SwiperSectionSkeleton />
        </Container>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50/50 py-16 border-t border-b border-gray-100/50">
      <Container className="space-y-16">
        {recommendations.map((group, idx) => (
          <RecommendationGroupSwiper key={group.type || idx} group={group} />
        ))}
      </Container>
    </div>
  );
};

export default RecommendationsSection;
