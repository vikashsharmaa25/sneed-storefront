import { fetchFromApi } from "./api-client.server";

export type HeroBanner = {
    id: number;
    file_url: string;
    cta_button_link: string;
    cta_button_text: string;
    title: string;
    subtitle: string;
};

export async function getHeroBanners(): Promise<HeroBanner[]> {
    return await fetchFromApi<HeroBanner[]>("home-page-management/hero-banner");
}