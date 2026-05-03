import { INavSection } from "@/types";

export const adminNavItems: INavSection[] = [
  // PLATFORM OVERVIEW
  {
    title: "Platform Overview",
    items: [
      {
        title: "Admin Dashboard",
        href: "/admin/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },

  // USER MANAGEMENT
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/all-users",
        icon: "Users",
      },
      {
        title: "Volunteers",
        href: "/admin/dashboard/all-volunteers",
        icon: "HeartHandshake",
      },
      {
        title: "Donors",
        href: "/admin/dashboard/all-donors",
        icon: "HandHeart",
      },
      {
        title: "Organizations",
        href: "/admin/dashboard/all-organizations",
        icon: "Building2",
      },
    ],
  },

  // HELP REQUEST OPERATIONS
  {
    title: "Help Requests",
    items: [
      {
        title: "All Requests",
        href: "/admin/dashboard/all-requests",
        icon: "ClipboardList",
      },
      {
        title: "All Responses",
        href: "/admin/dashboard/all-responses",
        icon: "MessageCircle",
      },
    ],
  },

  // DONATION MANAGEMENT
  {
    title: "Donation Management",
    items: [
      {
        title: "All Donations",
        href: "/admin/dashboard/all-donations",
        icon: "Heart",
      },
    ],
  },

  // REPORTING
  // {
  //   title: "Reports & Monitoring",
  //   items: [
  //     {
  //       title: "Reports",
  //       href: "/admin/reports",
  //       icon: "BarChart3",
  //     },
  //     {
  //       title: "Activity Logs",
  //       href: "/admin/logs",
  //       icon: "FileText",
  //     },
  //   ],
  // },

  // SYSTEM SETTINGS
  // {
  //   title: "System Settings",
  //   items: [
  //     {
  //       title: "Platform Settings",
  //       href: "/admin/settings",
  //       icon: "Settings",
  //     },
  //   ],
  // },
];
