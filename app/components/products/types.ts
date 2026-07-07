export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  description?: string;
  features?: string[];
  originalPrice?: string;
  discount?: string;
  sku?: string;
  variants?: string[];
  images?: string[];
  category?: string;
  inStock?: boolean;
  rating?: number;
  numReviews?: number;
}

export interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

export interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  id: string;
  onClick?: () => void;
  badge?: string;
  subtitle?: string;
}

export interface ImageGalleryProps {
  images: string[];
  altText?: string;
}

export interface ProductInfoProps {
  product: Product;
  onAddToCart?: (quantity: number) => void;
}

export interface RelatedProductsProps {
  products?: Product[];
  recommendations?: any[];
  product?: any;
  setSelectedVariantId?: (id: number) => void;
  title?: string;
}

export interface HeaderProps {
  breadcrumbs: { label: string; path?: string }[];
}

export interface ProductDescriptionProps {
  description: string;
  videoUrl?: string;
  videoTitle?: string;
  videoSubtitle?: string;
}
