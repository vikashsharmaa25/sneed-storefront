import React from 'react';

import { Swiper as SwiperBase, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Swiper = ({
    children,
    showNavigation = true,
    showPagination = true,
    navPrevClassName = 'left-4',
    navNextClassName = 'right-4',
    paginationClassName = 'mt-8',
    className = '',
    id = 'default',
    ...props
}: any) => {
    const sanitizedId = id.replace(/[^a-zA-Z0-9-_]/g, '-');
    const prevElClass = `swiper-button-prev-${sanitizedId}`;
    const nextElClass = `swiper-button-next-${sanitizedId}`;
    const paginationElClass = `swiper-pagination-${sanitizedId}`;

    return (
        <div className={`relative w-full ${className}`}>
            <SwiperBase
                modules={[Navigation, Pagination, Autoplay, ...(props.modules || [])]}
                navigation={showNavigation ? {
                    nextEl: `.${nextElClass}`,
                    prevEl: `.${prevElClass}`,
                } : false}
                pagination={showPagination ? {
                    clickable: true,
                    el: `.${paginationElClass}`,
                } : false}
                {...props}
                className="w-full"
            >
                {children}

                {showNavigation && (
                    <>
                        <button
                            className={`swiper-button-prev ${prevElClass} absolute top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/20 hover:bg-white/30 transition-colors ${navPrevClassName}`}
                            aria-label="Previous slide"
                        />
                        <button
                            className={`swiper-button-next ${nextElClass} absolute top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/20 hover:bg-white/30 transition-colors ${navNextClassName}`}
                            aria-label="Next slide"
                        />
                    </>
                )}

                {showPagination && (
                    <div className={`swiper-pagination ${paginationElClass} relative flex justify-center gap-2 ${paginationClassName}`} />
                )}
            </SwiperBase>
        </div>
    );
};

export { Swiper, SwiperSlide };