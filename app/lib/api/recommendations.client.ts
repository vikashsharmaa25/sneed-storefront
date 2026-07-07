import { fetchFromApi } from "./api-client";

export type RecommendationItem = {
  id: string;
  category_id: string;
  brand_id: string;
  title: string;
  image_url: string | null;
  product_image_url?: string | null;
  variant_image_url?: string | null;
  selling_price: string;
  currency_symbol: string;
  currency_code: string;
};

export type RecommendationGroup = {
  type: string;
  title: string;
  items: RecommendationItem[];
};

export type RecommendationsResponse = {
  success: boolean;
  data: RecommendationGroup[];
};

export async function getRecommendations(): Promise<RecommendationGroup[]> {
  try {
    const response = await fetchFromApi<RecommendationsResponse>("home/recommendations");
    if (response.success && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return [];
  }
}
