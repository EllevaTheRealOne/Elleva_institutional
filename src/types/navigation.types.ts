export interface NavSubItem {
  label: string;
  href: string;
  key?: string;
  desc?: string;
}

export interface NavLinkItem {
  label: string;
  key?: string;
  href?: string;
  items?: NavSubItem[];
}

export type NavLinksMap = Record<string, NavLinkItem[]>;

