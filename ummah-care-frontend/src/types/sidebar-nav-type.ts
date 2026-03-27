export interface INavItem {
  title: string;
  href: string;
  icon: string;
}

export interface INavSection {
  title?: string;
  items: INavItem[];
}
