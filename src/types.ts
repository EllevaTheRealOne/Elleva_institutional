export type ThemeMode = 'light' | 'dark';

export type NavSubItem = {
  label: string;
  href: string;
  id?: string;
};

export type NavCategory = {
  label: string;
  id?: string;
  items: NavSubItem[];
  icon?: string;
};

export type NavItem = NavSubItem;

export type LanguageCode = 'EN' | 'PT';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export type NavbarProps = {
  categories?: NavCategory[];
  items?: NavSubItem[]; // Backward compatibility
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  activeItem?: string;
  activeCategory?: string;
  theme?: 'light' | 'dark' | ThemeMode;
  onThemeToggle?: () => void;
  currentLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
};

export type CyclePhaseId = 'pesquisar' | 'decidir' | 'executar' | 'monitorar';

export interface CyclePhase {
  id: CyclePhaseId;
  order: number;
  label: string;
  tagline: string;
  description: string;
  capabilities: string[];
  metrics: { label: string; value: string; detail: string }[];
  telemetryStream: { time: string; event: string; status: 'nominal' | 'active' | 'verified' }[];
}

export interface InstitutionalArchetype {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  operationalRatio: string;
}

export interface GlobalHub {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
  role: string;
  latency: string;
  active: boolean;
}
