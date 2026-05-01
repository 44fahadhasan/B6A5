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
        href: "/organization/dashboard/my-campaigns",
        icon: "Megaphone",
      },
      {
        title: "Donations",
        href: "/organization/dashboard/donations",
        icon: "Wallet",
      },
    ],
  },
  {
    title: "Team Management",
    items: [
      {
        title: "Assignments",
        href: "/organization/dashboard/assignments",
        icon: "Users",
      },
    ],
  },
];
