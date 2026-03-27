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
    title: "Activities",
    items: [
      {
        title: "My Tasks",
        href: "/volunteer/tasks",
        icon: "CheckCircle",
      },
      {
        title: "My Applications",
        href: "/volunteer/applications",
        icon: "ClipboardList",
      },
    ],
  },
];
