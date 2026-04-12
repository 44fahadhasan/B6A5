import { INavSection } from "@/types";

export const donorNavItems: INavSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Donor Dashboard",
        href: "/donor/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "Donor Activities",
    items: [
      {
        title: "Donation Responses",
        href: "/donor/dashboard/my-responses",
        icon: "Wallet",
      },
      {
        title: "My Donations",
        href: "/donor/dashboard/my-donations",
        icon: "HandHeart",
      },
    ],
  },
];
