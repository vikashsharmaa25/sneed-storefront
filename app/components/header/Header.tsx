import React from 'react';
import type { HeaderProps } from './types';
import { TopBar } from './TopBar';
import { MainHeader } from './MainHeader';
import { Navigation } from './Navigation';
export function Header({
    phoneNumber = "1-833-9-CODING (1-833-926-3464)",
    guaranteeText = "100% SATISFACTION GUARANTEED",
    navigationItems = [
        { label: "Home", href: "/" },
        {
            label: "Industries",
            href: "/industries",
            children: [
                {
                    label: "Manufacturing",
                    href: "/industries/manufacturing",
                    description: "Industrial coding solutions for production lines",
                    icon: "Factory"
                },
                {
                    label: "Pharmaceutical",
                    href: "/industries/pharmaceutical",
                    description: "Compliant marking for medical products",
                    icon: "Pill"
                },
                {
                    label: "Packaging",
                    href: "/industries/packaging",
                    description: "High-speed coding for packaging operations",
                    icon: "Package"
                },
                {
                    label: "Food & Beverage",
                    href: "/industries/food-beverage",
                    description: "Date and batch coding for consumables",
                    icon: "Coffee"
                },
                {
                    label: "Cosmetics",
                    href: "/industries/cosmetics",
                    description: "Precision marking for beauty products",
                    icon: "Droplets"
                },
                {
                    label: "Meat & Poultry",
                    href: "/industries/meat-poultry",
                    description: "Traceability solutions for protein products",
                    icon: "Beef"
                }
            ]
        },
        { label: "Applications", href: "/applications" },
        { label: "Knowledge Base", href: "/knowledge-base" },
        {
            label: "Resources",
            href: "/resources",
            children: [
                { label: "Blog", href: "/blogs" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "Articles", href: "/seo-articles" },
                { label: "Product Articles", href: "/temp-seo-articles" }
            ]
        },
        { label: "Performance Guarantee", href: "/guarantee" },
        { label: "Help Desk", href: "/contact-us" },
    ],
    socialMedia = [
        { name: 'Facebook', icon: 'facebook', url: '#' },
        { name: 'Twitter', icon: 'twitter', url: '#' },
        { name: 'YouTube', icon: 'youtube', url: '#' },
        { name: 'Instagram', icon: 'instagram', url: '#' },
    ],
    categories = [],
    industries = [],
    featuredProducts = [],
}: HeaderProps) {
    console.log('Industries in Header:', industries);
    const finalNavigationItems = navigationItems.map(item => {
        if (item.label === "Industries" && industries && industries.length > 0) {
            return {
                ...item,
                children: industries.map((ind: any) => {
                    const cleanDescription = ind.description?.replace(/<[^>]*>?/gm, '') || "Industrial coding solutions for production lines";
                    return {
                        label: ind.name,
                        href: `/industries/${ind.slug}`,
                        description: cleanDescription.length > 75
                            ? `${cleanDescription.substring(0, 75)}...`
                            : cleanDescription,
                        icon: "Factory"
                    };
                })
            };
        }
        return item;
    });

    return (
        <header className="w-full">
            <TopBar
                phoneNumber={phoneNumber}
                guaranteeText={guaranteeText}
                socialMedia={socialMedia}
            />
            <MainHeader />
            <Navigation items={finalNavigationItems} categories={categories} featuredProducts={featuredProducts} />
        </header>
    );
}
