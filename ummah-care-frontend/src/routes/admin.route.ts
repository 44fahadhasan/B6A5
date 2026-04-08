import { INavSection } from "@/types";

export const adminNavItems: INavSection[] = [
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
  {
    title: "Overview",
    items: [
      {
        title: "Admin Dashboard",
        href: "/admin/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/users",
        icon: "Users",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Organizations",
        href: "/admin/organizations",
        icon: "Building2",
      },
      {
        title: "Volunteers",
        href: "/admin/volunteers",
        icon: "HeartHandshake",
      },
    ],
  },
  {
    title: "Reports & Logs",
    items: [
      {
        title: "Reports",
        href: "/admin/reports",
        icon: "BarChart3",
      },
      {
        title: "System Logs",
        href: "/admin/logs",
        icon: "FileText",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Platform Settings",
        href: "/admin/settings",
        icon: "Settings",
      },
    ],
  },
];
