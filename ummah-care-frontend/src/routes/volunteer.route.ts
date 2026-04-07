import { INavSection } from "@/types";

export const volunteerNavItems: INavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Volunteer Dashboard",
        href: "/volunteer/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "Activity",
    items: [
      {
        title: "My Tasks",
        href: "/volunteer/dashboard/my-tasks",
        icon: "CheckCircle",
      },
      {
        title: "My Responses",
        href: "/volunteer/dashboard/my-responses",
        icon: "MessageCircle",
      },
    ],
  },
];
