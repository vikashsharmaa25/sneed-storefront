"use client"
import ProductCarousel from "./ShowcaseCarousel"
import StatsSection from "./StatsSection"

export const ShowcaseProduct = ({ brands }: { brands?: any[] }) => {
    return (
        <div className="w-full py-16">
            <div className="max-w-8xl mx-auto text-center">
                <p className="text-gray-400 text-sm mb-2 tracking-wide">We've Traveled The World To Bring You</p>
                <h1 className="text-[32px] font-bold title-heading mb-3">THE BEST PRINTING SYSTEMS AND QUALITY INKS</h1>
                <p className="text-gray-400 text-base mb-12">for your industrial coding needs</p>

                <div className="bg-[#1C2433] pb-10">
                    <ProductCarousel brands={brands} />
                    {/* <StatsSection /> */}
                </div>
            </div>
        </div>
    )
}
