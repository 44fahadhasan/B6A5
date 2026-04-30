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
    title: "Organization Activities",
    items: [
      {
        title: "My Campaigns",
        href: "/organization/my-campaigns",
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
    title: "Team Management",
    items: [
      {
        title: "Volunteers",
        href: "/organization/volunteers",
        icon: "Users",
      },
    ],
  },
];
