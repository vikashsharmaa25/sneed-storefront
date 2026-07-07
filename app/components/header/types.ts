export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  icon?: any;
  children?: NavigationItem[];
}

export interface SocialMedia {
  name: string;
  icon: string;
  url: string;
}

export interface HeaderProps {
  phoneNumber?: string;
  guaranteeText?: string;
  navigationItems?: NavigationItem[];
  socialMedia?: SocialMedia[];
  categories?: any[];
  industries?: any[];
}
