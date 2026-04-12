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
    title: "Volunteer Activities",
    items: [
      {
        title: "Help Responses",
        href: "/volunteer/dashboard/my-responses",
        icon: "HelpingHand",
      },
      // {
      //   title: "Assigned Tasks",
      //   href: "/volunteer/dashboard/tasks",
      //   icon: "CheckCircle",
      // },
    ],
  },
];
