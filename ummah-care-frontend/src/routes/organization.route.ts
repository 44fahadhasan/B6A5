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
        title: "Campaigns",
        href: "/organization/dashboard/campaigns",
        icon: "Megaphone",
      },
      {
        title: "Responses",
        href: "/organization/dashboard/responses",
        icon: "MessageCircle",
      },
      {
        title: "Donations",
        href: "/organization/dashboard/donations",
        icon: "HandCoins",
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
