import { getSession } from "@/actions/auth-actions";
import { TypographySmall } from "@/components/shared/typography";
import { Sidebar } from "@/components/ui/sidebar";
import { IApiResponse, ISessionResponse } from "@/types";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { getNavSectionsByRole } from "@/utils/sidebar-nav.util";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SidebarFooterContent } from "./sidebar-footer-content";
import { SidebarHeaderContent } from "./sidebar-header-content";
import { SidebarMainContent } from "./sidebar-main-content";

export async function AppSidebar() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const { success, message, data } = queryClient.getQueryData([
    "session",
  ]) as IApiResponse<ISessionResponse>;

  if (!success) {
    return (
      <div className="flex flex-col items-center w-(--sidebar-width) justify-center bg-sidebar">
        <TypographySmall className="text-destructive">
          {message ?? "Unable to load user session."}
        </TypographySmall>
      </div>
    );
  }

  const navSections = getNavSectionsByRole(data.user);
  const dashboardPath = routeRulesUtil.getDefaultDashboardRoute(data.user);

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarHeaderContent dashboardPath={dashboardPath} />
        <SidebarMainContent navSections={navSections} />
        <SidebarFooterContent />
      </HydrationBoundary>
    </Sidebar>
  );
}
