import NewsletterFooter from './Footer';
import { Header } from './header/Header';

interface PageLayoutProps {
  children?: React.ReactNode;
  categories?: any[];
  industries?: any[];
  featuredProducts?: any[];
}

export function PageLayout({
  children = null,
  categories = [],
  industries = [],
  featuredProducts = [],
}: PageLayoutProps) {
  return (
    <>
      <Header categories={categories} industries={industries} featuredProducts={featuredProducts} />
      <main>{children}</main>
      <NewsletterFooter />
    </>
  );
}