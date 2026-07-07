import React, { useState, useEffect } from 'react';
import { HeroBanner } from './home/HeroBanner';
import InkjetMarkingSection from './home/InkjetMarkingSection';
import { ShowcaseProduct } from './home/Showcase';
import ProductListing from './home/products-list/ProductListing';
import FlashSale from './home/FlashSale';
import HandpickedProducts from './home/HandpickedProducts';
import RecommendationsSection from './home/RecommendationsSection';
import ExpertAdviceCTA from './ExpertAdviceCTA';
import SuccessStoriesSection from './home/SuccessStoriesSection';
import StatsCTASection from './home/StatsCTASection';
import type { HeroBanner as HeroBannerType } from '~/lib/api/hero-banner.server';
import type { Stat } from '~/lib/api/stats.server';

type HomeProps = {
    products: any[];
    categories?: any[];
    brands?: any[];
    successStories?: any[];
    blogs?: any[];
    seoArticles?: any[];
    flashSales?: any[];
    heroBanners?: HeroBannerType[];
    stats?: Stat[];
    messageSections?: any[];
};

function Home({ products, categories, brands, successStories, blogs, seoArticles, flashSales, heroBanners, stats, messageSections }: HomeProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products && categories && successStories && blogs && seoArticles && flashSales) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [products, categories, successStories, blogs, seoArticles, flashSales]);

    console.log("products", products)

    return (
        <>
            <HeroBanner banners={heroBanners} />
            <InkjetMarkingSection messageSections={messageSections} />
            <ShowcaseProduct brands={brands} />
            <ProductListing products={products} categories={categories} brands={brands} />
            <FlashSale flashSales={flashSales} />
            <RecommendationsSection />
            {/* <HandpickedProducts /> */}
            <ExpertAdviceCTA />
            <SuccessStoriesSection
                successStories={successStories}
                blogs={blogs}
                seoArticles={seoArticles}
                loading={loading}
            />
            <StatsCTASection stats={stats} />
        </>
    );
}

export default Home;