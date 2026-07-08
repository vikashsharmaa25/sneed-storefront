import React, { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, BookOpen, FileText, Award, Calendar, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from '~/components/common/Swiper';
import { Container } from '~/components/ui/Container';

interface ContentItem {
  id: number;
  file_url?: string;
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  read_time?: number;
  industry_name?: string;
}

interface ContentGroup {
  type: 'blogs' | 'seo_articles' | 'success_stories';
  title: string;
  items: ContentItem[];
}

interface ContentRecommendationsProps {
  recommendations?: ContentGroup[];
}

const RecommendationCard: React.FC<{ item: ContentItem; type: string }> = ({ item, type }) => {
  const getDetailPath = () => {
    switch (type) {
      case 'blogs':
        return `/blogs/${item.id}`;
      case 'seo_articles':
        return `/seo-articles/${item.id}`;
      case 'success_stories':
        return `/success-stories/${item.id}`;
      default:
        return `/blogs/${item.id}`;
    }
  };

  const getBadge = () => {
    switch (type) {
      case 'blogs':
        return (
          <span className="bg-red-50 text-red-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <BookOpen className="w-2.5 h-2.5" />
            Blog
          </span>
        );
      case 'seo_articles':
        return (
          <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <FileText className="w-2.5 h-2.5" />
            Article
          </span>
        );
      case 'success_stories':
        return (
          <span className="bg-green-50 text-green-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Award className="w-2.5 h-2.5" />
            Story
          </span>
        );
      default:
        return null;
    }
  };

  const readTime = item.read_time || 5;
  const displayDate = item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="group bg-white rounded-2xl border border-slate-100/90 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out flex flex-col h-full min-h-[360px]">
      {/* Thumbnail */}
      <Link to={getDetailPath()} className="aspect-16/10 bg-slate-50 overflow-hidden relative block">
        <img
          src={item.file_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=250&fit=crop'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10">
          {getBadge()}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        {/* Meta info */}
        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {displayDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-800 mb-2 line-clamp-2 h-10 group-hover:text-red-800 transition-colors duration-200 leading-snug">
          <Link to={getDetailPath()}>
            {item.title}
          </Link>
        </h4>

        {/* Excerpt */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {item.excerpt || 'No description available.'}
        </p>

        {/* Action Link */}
        <div className="mt-auto pt-2">
          <Link
            to={getDetailPath()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-950 transition-colors"
          >
            Read Content
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const GroupSwiper: React.FC<{ group: ContentGroup }> = ({ group }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (s: any) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const swiperBreakpoints = {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  };

  const swiperStyle = {
    '--swiper-navigation-size': '16px',
    '--swiper-navigation-color': 'currentColor',
    '--swiper-pagination-color': '#9A1A1C',
  } as React.CSSProperties;

  return (
    <div className="space-y-6">
      {/* Title & Nav Buttons */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          {group.title}
        </h3>

        {group.items.length > 3 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiper?.slidePrev()}
              disabled={isBeginning}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center transition-all duration-200 hover:bg-red-800 hover:text-white hover:border-red-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 shadow-xs cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              disabled={isEnd}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center transition-all duration-200 hover:bg-red-800 hover:text-white hover:border-red-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 shadow-xs cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        <Swiper
          id={group.type}
          style={swiperStyle}
          breakpoints={swiperBreakpoints}
          showNavigation={false}
          showPagination={group.items.length > 3}
          paginationClassName="mt-6"
          className="pb-2"
          onSwiper={(s: any) => {
            setSwiper(s);
            updateNavigationState(s);
          }}
          onSlideChange={updateNavigationState}
          onResize={updateNavigationState}
          onUpdate={updateNavigationState}
        >
          {group.items.map((item, itemIdx) => (
            <SwiperSlide key={item.id || itemIdx}>
              <RecommendationCard item={item} type={group.type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default function ContentRecommendations({ recommendations = [] }: ContentRecommendationsProps) {
  const activeGroups = recommendations.filter(g => g.items && g.items.length > 0);

  if (activeGroups.length === 0) return null;

  return (
    <section className="bg-slate-50 border-t border-slate-200/40 py-20">
      <Container className="space-y-12">
        <div className="text-left max-w-2xl space-y-3">
          <span className="text-[11px] font-bold text-red-800 uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full inline-block">
            Keep Reading
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Recommended For You
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Explore our latest blogs, industrial success stories, and technical articles from our engineering team.
          </p>
        </div>

        <div className="space-y-12">
          {activeGroups.map((group, idx) => (
            <GroupSwiper key={group.type || idx} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
}
