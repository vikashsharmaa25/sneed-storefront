import React from 'react';
import { Star } from 'lucide-react';
import Ellipse from "../../assets/images/right-ellipse.png"
import { Container } from '../ui/Container';
import type { HeroBanner as HeroBannerType } from '~/lib/api/hero-banner.server';

type HeroBannerProps = {
    banners?: HeroBannerType[];
};

export function HeroBanner({ banners }: HeroBannerProps) {
    const banner = banners?.[0];

    if (!banner) {
        return (
            <div className="relative bg-[#000000BA] overflow-hidden" style={{ height: '600px' }}>
                <div className="absolute right-0 -top-56">
                    <img src={Ellipse} alt="" />
                </div>

                <div className="relative h-full flex items-center px-16">
                    <div className="flex justify-between items-center w-full">
                        <Container className='flex justify-between items-center'>
                            <div className="z-10 mt-28">
                                <span className="text-gray-100 text-[20px] mb-3">
                                    Industry INKJET Printers, Fluids, Parts<br />and service
                                </span>
                                <h1 className="text-5xl font-bold mb-0 leading-tighter">
                                    <span className="title-heading md:text-[80px] text-[40px]">Coding</span>
                                    <span className="text-gray-300 text-3xl font-thin ml-5">&</span>
                                </h1>
                                <h1 className="md:text-[70px] text-[40px] text-white leading-tighter">
                                    Marketing Experts
                                </h1>
                            </div>

                            {/* <div className="z-10">
                                <div className="text-right mb-2">
                                    <p className="text-white text-sm mb-1">Google Review</p>
                                    <div className="flex items-center justify-end">
                                        <span className="text-white text-5xl font-bold">4.6</span>
                                        <span className="text-red-600 text-2xl ml-1">★</span>
                                    </div>
                                </div>
                            </div> */}
                        </Container>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden" style={{ height: '600px' }}>
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.file_url})` }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute right-0 -top-56">
                <img src={Ellipse} alt="" />
            </div>

            <div className="relative h-full flex items-center px-16">
                <div className="flex justify-between items-center w-full">
                    <Container className='flex justify-between items-center'>
                        <div className="z-10 mt-28">
                            <span className="text-gray-100 text-[20px] mb-3 block">
                                {banner.subtitle}
                            </span>
                            <h1 className="text-5xl font-bold mb-0 leading-tighter">
                                <span className="title-heading md:text-[80px] text-[40px]">{banner.title}</span>
                            </h1>
                            {banner.cta_button_text && (
                                <a
                                    href={banner.cta_button_link || '#'}
                                    className="inline-block mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
                                >
                                    {banner.cta_button_text}
                                </a>
                            )}
                        </div>

                        {/* <div className="z-10">
                            <div className="text-right mb-2">
                                <p className="text-white text-sm mb-1">Google Review</p>
                                <div className="flex items-center justify-end">
                                    <span className="text-white text-5xl font-bold">4.6</span>
                                    <span className="text-red-600 text-2xl ml-1">★</span>
                                </div>
                            </div>
                        </div> */}
                    </Container>
                </div>
            </div>
        </div>
    );
}
