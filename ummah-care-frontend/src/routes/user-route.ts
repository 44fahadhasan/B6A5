import { INavSection } from "@/types";

export const userNavItems: INavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "Activity",
    items: [
      {
        title: "My Requests",
        href: "/dashboard/my-requests",
        icon: "ClipboardList",
      },
      {
        title: "Received Donations",
        href: "/dashboard/received-donations",
        icon: "HandHeart",
      },
    ],
  },
];
