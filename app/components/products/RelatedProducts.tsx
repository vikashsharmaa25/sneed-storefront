import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from '~/components/common/Swiper';
import { ProductCard } from './ProductCard';
import type { RelatedProductsProps } from './types';

interface ProductSwiperSectionProps {
  title: string;
  subtitle: string;
  items: any[];
  groupType?: string;
  getCardProps: (item: any, type?: string) => any;
  handleItemClick: (item: any, type?: string) => void;
  swiperBreakpoints: any;
  swiperStyle: any;
}

const ProductSwiperSection: React.FC<ProductSwiperSectionProps> = ({
  title,
  subtitle,
  items,
  groupType,
  getCardProps,
  handleItemClick,
  swiperBreakpoints,
  swiperStyle,
}) => {
  const [swiper, setSwiper] = React.useState<any>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  const updateNavigationState = (s: any) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
            {subtitle}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>

        {items.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiper?.slidePrev()}
              disabled={isBeginning}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-800 disabled:hover:border-slate-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              disabled={isEnd}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-800 flex items-center justify-center transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-800 disabled:hover:border-slate-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative px-1">
        <Swiper
          id={groupType || title}
          style={swiperStyle}
          breakpoints={swiperBreakpoints}
          showNavigation={false}
          showPagination={items.length > 1}
          paginationClassName="mt-6"
          className="py-4"
          onSwiper={(s: any) => {
            setSwiper(s);
            updateNavigationState(s);
          }}
          onSlideChange={updateNavigationState}
          onResize={updateNavigationState}
          onUpdate={updateNavigationState}
        >
          {items.map((item: any, itemIdx: number) => {
            const cardProps = getCardProps(item, groupType);
            return (
              <SwiperSlide key={cardProps.id || itemIdx}>
                <ProductCard
                  id={cardProps.id}
                  title={cardProps.title}
                  price={cardProps.price}
                  image={cardProps.image}
                  badge={cardProps.badge}
                  subtitle={cardProps.subtitle}
                  onClick={() => handleItemClick(item, groupType)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  recommendations,
  product,
  setSelectedVariantId,
  title = 'You May Also Like',
}) => {
  const navigate = useNavigate();

  const hasRecommendations = recommendations && recommendations.length > 0;
  const hasLegacyProducts = products && products.length > 0;

  if (!hasRecommendations && !hasLegacyProducts) return null;

  const activeRecommendations = recommendations?.filter(
    (group) => group.items && group.items.length > 0
  ) || [];

  if (hasRecommendations && activeRecommendations.length === 0) return null;

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

  const getCardProps = (item: any, type?: string) => {
    if (!type) {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        badge: undefined,
        subtitle: 'Related Product',
      };
    }

    if (type === 'variants') {
      const parentTitle = product?.title || '';
      const itemTitle = item.title || `${parentTitle}${item.sku ? ` (${item.sku})` : ''}`;
      const priceObj = item.prices?.[0];
      const symbol = priceObj?.currency?.symbol || '$';
      const priceVal = priceObj?.selling_price ?? '0';
      return {
        id: String(item.variant_id),
        title: itemTitle,
        price: `${symbol}${priceVal}`,
        image: item.images?.[0]?.image_url || product?.images?.[0]?.image_url || 'https://placehold.co/600x600/e2e8f0/64748b?text=Product',
        badge: item.inventory?.[0]?.quantity === 0 ? 'Out of Stock' : undefined,
        subtitle: item.sku || 'Variant Style',
      };
    }

    const itemTitle = item.product_descriptions?.[0]?.title || 'Unknown Product';
    const priceObj = item.variants?.[0]?.prices?.[0];
    const symbol = priceObj?.currency?.symbol || priceObj?.currency?.currency_code || '$';
    const priceVal = priceObj?.selling_price ?? '0';
    return {
      id: String(item.id),
      title: itemTitle,
      price: `${symbol}${priceVal}`,
      image: item.image_url || item.variant_image_url || item.product_images?.[0]?.image_url || 'https://placehold.co/600x600/e2e8f0/64748b?text=Product',
      badge: item.variants?.[0]?.inventory?.[0]?.quantity === 0 ? 'Out of Stock' : undefined,
      subtitle: item.brand_name || 'Similar Item',
    };
  };

  const handleItemClick = (item: any, type?: string) => {
    if (!type) {
      navigate(`/products/${item.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (type === 'variants') {
      if (setSelectedVariantId) {
        setSelectedVariantId(item.variant_id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(`/products/${item.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const swiperStyle = {
    '--swiper-navigation-size': '16px',
    '--swiper-navigation-color': 'currentColor',
    '--swiper-pagination-color': '#dc2626',
  } as React.CSSProperties;

  return (
    <div className="space-y-16 mt-16 border-t border-gray-100 pt-12">
      {hasRecommendations ? (
        activeRecommendations.map((group, idx) => (
          <ProductSwiperSection
            key={group.type || idx}
            title={group.title}
            subtitle={group.type === 'variants' ? 'Styles & Variants' : 'Recommended For You'}
            items={group.items}
            groupType={group.type}
            getCardProps={getCardProps}
            handleItemClick={handleItemClick}
            swiperBreakpoints={swiperBreakpoints}
            swiperStyle={swiperStyle}
          />
        ))
      ) : (
        // Fallback to legacy single list of products
        <ProductSwiperSection
          title={title}
          subtitle="Recommendations"
          items={products!}
          getCardProps={getCardProps}
          handleItemClick={handleItemClick}
          swiperBreakpoints={swiperBreakpoints}
          swiperStyle={swiperStyle}
        />
      )}
    </div>
  );
};
