interface SocialMediaLinks {
    id: number;
    facebook: string;
    instagram: string;
    linkedIn: string;
}

interface NavItem {
    id: number;
    name: string;
    slug: string;
    isBadge: boolean;
}

interface Footer {
    id: number;
    title: string;
    reservedRight: string;
    description: string | null;
    phone: string;
    whatsAppNumber: string;
    address: string;
    email: string;
    subTitle: string;
    availableTime: string;
    availableDays: string;
    buttons: ButtonType[];
    contactUs: string;
    pageLinks: ButtonType[];
}

interface LogoAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
}

interface LogoData {
    id: number;
    attributes: LogoAttributes;
}

interface ButtonType {
    id: number;
    label: string | null;
    buttonText: string;
    slug: string;
}

interface WebsiteConfigurationAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    socialMediaLinks: SocialMediaLinks;
    nav: NavItem[];
    navButton: ButtonType;
    footer: Footer;
    logo: {
        data: LogoData;
    };
    language:string;
}

interface ServiceNames {
    id: number;
    name: string;
    slug: string;
}

interface WebsiteConfiguration {
    id: number;
    attributes: WebsiteConfigurationAttributes;
    serviceCount: number;
    serviceNames: ServiceNames[];
}

interface ConfigResponse {
    data: WebsiteConfiguration;
    meta: any;
}

// navbar types
interface ExpandableItemProps {
    item: NavItem;
    serviceCount: number;
    serviceNames: ServiceNames[];
    handleClose: (route: string) => void;
  }
  
  interface DesktopServicesDropdownProps {
    serviceNames: ServiceNames[];
    setIsServicesHovered: (value: boolean) => void;
    setIsDropdownHovered: (value: boolean) => void;
  }
  
  interface LanguageDropdownProps {
    languageOptions: { label: string; value: string }[];
    setIsServicesHovered: (value: boolean) => void;
    setIsDropdownHovered: (value: boolean) => void;
  }
  
  interface LanguageExpandableItemProps {
    LanguageOptions: { label: string; value: string }[];
    language: string;
    handleClose: (route: string) => void;
  }
  

export type { ConfigResponse, NavItem, ServiceNames, ExpandableItemProps,DesktopServicesDropdownProps ,LanguageDropdownProps,LanguageExpandableItemProps};
