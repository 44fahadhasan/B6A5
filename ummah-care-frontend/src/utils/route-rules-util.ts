import {
  USER_ROLE,
  USER_STATUS,
  USER_TYPE,
  USER_TYPE_STATUS,
} from "@/constants/user.const";
import { TUserRole, TUserStatus, TUserType, TUserTypeStatus } from "@/types";

type RouteOwner = TUserRole | TUserType | "COMMON" | null;

interface IAuthUserLike {
  role: TUserRole;
  status?: TUserStatus;
  userTypes?: Array<{
    type: TUserType;
    status: TUserTypeStatus;
  }>;
}

interface IRouteConfig {
  exact: string[];
  patterns: RegExp[];
}

const authRoutes = ["/sign-up", "/sign-in", "/forgot-password"] as const;

const commonProtectedRoutes: IRouteConfig = {
  exact: ["/my-profile"],
  patterns: [],
};

const userProtectedRoutes: IRouteConfig = {
  exact: ["/dashboard"],
  patterns: [/^\/dashboard(?:\/|$)/],
};

const volunteerProtectedRoutes: IRouteConfig = {
  exact: [],
  patterns: [/^\/volunteer(?:\/|$)/],
};

const donorProtectedRoutes: IRouteConfig = {
  exact: [],
  patterns: [/^\/donor(?:\/|$)/],
};

const organizationProtectedRoutes: IRouteConfig = {
  exact: [],
  patterns: [/^\/organization(?:\/|$)/],
};

const adminProtectedRoutes: IRouteConfig = {
  exact: ["/admin/dashboard"],
  patterns: [/^\/admin\/dashboard(?:\/|$)/],
};

const normalizePathname = (pathname: string) => {
  const cleaned = pathname.trim().replace(/\/+$/, "");
  return cleaned || "/";
};

const normalizeRole = (userRole: TUserRole): TUserRole => {
  return userRole === USER_ROLE.SUPER_ADMIN ? USER_ROLE.ADMIN : userRole;
};

const isAuthRoute = (pathname: string) => {
  const path = normalizePathname(pathname);
  return authRoutes.includes(path as (typeof authRoutes)[number]);
};

const isRouteMatch = (pathname: string, routes: IRouteConfig): boolean => {
  const path = normalizePathname(pathname);

  if (routes.exact.includes(path)) return true;
  return routes.patterns.some((regex) => regex.test(path));
};

const getRouteOwner = (pathname: string): RouteOwner => {
  const path = normalizePathname(pathname);

  if (isRouteMatch(path, commonProtectedRoutes)) return "COMMON";
  if (isRouteMatch(path, adminProtectedRoutes)) return USER_ROLE.ADMIN;
  if (isRouteMatch(path, userProtectedRoutes)) return USER_ROLE.USER;
  if (isRouteMatch(path, volunteerProtectedRoutes)) return USER_TYPE.VOLUNTEER;
  if (isRouteMatch(path, donorProtectedRoutes)) return USER_TYPE.DONOR;
  if (isRouteMatch(path, organizationProtectedRoutes))
    return USER_TYPE.ORGANIZATION;

  return null;
};

const isActiveUser = (user: IAuthUserLike) => {
  return user.status === USER_STATUS.ACTIVE;
};

const hasActiveUserType = (user: IAuthUserLike, type: TUserType) => {
  return (
    user.userTypes?.some(
      (item) => item.type === type && item.status === USER_TYPE_STATUS.ACTIVE,
    ) ?? false
  );
};

const isValidRedirectForUser = (redirectPath: string, user: IAuthUserLike) => {
  const path = normalizePathname(redirectPath);

  if (isAuthRoute(path)) return false;
  if (!isActiveUser(user)) return false;

  if (user.role === USER_ROLE.SUPER_ADMIN) return true;

  const routeOwner = getRouteOwner(path);

  if (!routeOwner || routeOwner === "COMMON") return true;

  const effectiveRole = normalizeRole(user.role);

  if (routeOwner === USER_ROLE.USER) {
    return effectiveRole === USER_ROLE.USER;
  }

  if (routeOwner === USER_ROLE.ADMIN) {
    return effectiveRole === USER_ROLE.ADMIN;
  }

  if (routeOwner === USER_TYPE.VOLUNTEER) {
    return hasActiveUserType(user, USER_TYPE.VOLUNTEER);
  }

  if (routeOwner === USER_TYPE.DONOR) {
    return hasActiveUserType(user, USER_TYPE.DONOR);
  }

  if (routeOwner === USER_TYPE.ORGANIZATION) {
    return hasActiveUserType(user, USER_TYPE.ORGANIZATION);
  }

  return false;
};

const getDefaultDashboardRoute = (user: IAuthUserLike) => {
  if (user.role === USER_ROLE.SUPER_ADMIN) return "/admin/dashboard";
  if (normalizeRole(user.role) === USER_ROLE.ADMIN) return "/admin/dashboard";

  if (hasActiveUserType(user, USER_TYPE.ORGANIZATION)) {
    return "/organization/dashboard";
  }

  if (hasActiveUserType(user, USER_TYPE.DONOR)) {
    return "/donor/dashboard";
  }

  if (hasActiveUserType(user, USER_TYPE.VOLUNTEER)) {
    return "/volunteer/dashboard";
  }

  return "/dashboard";
};

const canAccessProtectedRoute = (pathname: string, user: IAuthUserLike) => {
  return isValidRedirectForUser(pathname, user);
};

export const routeRulesUtil = {
  normalizePathname,
  normalizeRole,
  isAuthRoute,
  getRouteOwner,
  isActiveUser,
  hasActiveUserType,
  isValidRedirectForUser,
  canAccessProtectedRoute,
  getDefaultDashboardRoute,
};
