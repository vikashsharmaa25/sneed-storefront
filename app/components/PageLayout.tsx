import NewsletterFooter from './Footer';
import { Header } from './header/Header';

interface PageLayoutProps {
  children?: React.ReactNode;
  categories?: any[];
  industries?: any[];
}

export function PageLayout({
  children = null,
  categories = [],
  industries = [],
}: PageLayoutProps) {
  return (
    <>
      <Header categories={categories} industries={industries} />
      <main>{children}</main>
      <NewsletterFooter />
    </>
  );
}