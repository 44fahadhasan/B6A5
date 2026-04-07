import { INavSection } from "@/types";

export const userNavItems: INavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Root Dashboard",
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
    ],
  },
];
