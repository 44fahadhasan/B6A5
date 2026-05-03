import { USER_ROLE, USER_TYPE } from "@/constants/user.const";
import { adminNavItems } from "@/routes/admin.route";
import { commonNavItems } from "@/routes/common.route";
import { donorNavItems } from "@/routes/donor.route";
import { organizationNavItems } from "@/routes/organization.route";
import { userNavItems } from "@/routes/user-route";
import { volunteerNavItems } from "@/routes/volunteer.route";
import { INavSection, TokenPayload } from "@/types";
import { routeRulesUtil } from "./route-rules-util";

const {
  canAccessProtectedRoute,
  hasActiveUserType,
  isActiveUser,
  normalizeRole,
} = routeRulesUtil;

/**
 *  Filter nav items by access control
 */
const filterNavItems = (
  sections: INavSection[],
  user: TokenPayload,
): INavSection[] => {
  return sections
    .map((section) => {
      const filteredItems = section.items.filter((item) =>
        canAccessProtectedRoute(item.href, user),
      );

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter((section) => section.items.length > 0);
};

/**
 *  Dashboard (default route)
 */
const getDashboardNavSections = (): INavSection[] => {
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
      ],
    },
  ];
};

/**
 *  UserType sections
 */
const getUserTypeSections = (user: TokenPayload): INavSection[] => {
  const sections: INavSection[] = [];

  if (hasActiveUserType(user, USER_TYPE.VOLUNTEER)) {
    sections.push(...volunteerNavItems);
  }

  if (hasActiveUserType(user, USER_TYPE.DONOR)) {
    sections.push(...donorNavItems);
  }

  if (hasActiveUserType(user, USER_TYPE.ORGANIZATION)) {
    sections.push(...organizationNavItems);
  }

  return sections;
};

export const getNavSectionsByRole = (user: TokenPayload): INavSection[] => {
  const sections: INavSection[] = [];

  // 1. Dashboard (always visible)
  sections.push(...getDashboardNavSections());

  // 2. If user is NOT active → stop early (minimal UI)
  if (!isActiveUser(user)) {
    return filterNavItems(sections, user);
  }

  // 3. SUPER ADMIN → full access
  if (user.role === USER_ROLE.SUPER_ADMIN) {
    sections.push(...adminNavItems);
    sections.push(...userNavItems);
    sections.push(...getUserTypeSections(user));
    sections.push(...commonNavItems);

    return filterNavItems(sections, user);
  }

  // 4. ADMIN (normalized)
  if (normalizeRole(user.role) === USER_ROLE.ADMIN) {
    sections.push(...adminNavItems);
    sections.push(...userNavItems);
    sections.push(...getUserTypeSections(user));
  }

  // 5. USER
  if (user.role === USER_ROLE.USER) {
    sections.push(...userNavItems);
  }

  // 6. USER TYPES (VOLUNTEER, DONOR, ORGANIZATION)
  sections.push(...getUserTypeSections(user));

  // 7. COMMON (always last)
  sections.push(...commonNavItems);

  return filterNavItems(sections, user);
};
