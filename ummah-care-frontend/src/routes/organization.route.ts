import { INavSection } from "@/types";

export const organizationNavItems: INavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Organization Dashboard",
        href: "/organization/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "My Campaigns",
        href: "/organization/campaigns",
        icon: "Megaphone",
      },
      {
        title: "Donations",
        href: "/organization/donations",
        icon: "Wallet",
      },
    ],
  },
  {
    title: "Team",
    items: [
      {
        title: "Volunteers",
        href: "/organization/volunteers",
        icon: "Users",
      },
    ],
  },
];
