import { INavSection } from "@/types";

export const userNavItems: INavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "User Dashboard",
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
        href: "/requests",
        icon: "ClipboardList",
      },
    ],
  },
];
