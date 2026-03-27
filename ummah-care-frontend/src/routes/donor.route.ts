import { INavSection } from "@/types";

export const donorNavItems: INavSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        href: "/donor/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "Activities",
    items: [
      {
        title: "My Donations",
        href: "/donor/donations",
        icon: "DollarSign",
      },
    ],
  },
];
