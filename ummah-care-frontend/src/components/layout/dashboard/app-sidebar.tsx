import { getSession } from "@/actions/auth-actions";
import { TypographySmall } from "@/components/shared/typography";
import { Sidebar } from "@/components/ui/sidebar";
import { QUERY_KEY } from "@/constants/query.const";
import { IApiResponse, ISessionResponse } from "@/types";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { prefetchQuery } from "@/utils/server-query";
import { getNavSectionsByRole } from "@/utils/sidebar-nav.util";
import { HydrationBoundary } from "@tanstack/react-query";
import { SidebarFooterContent } from "./sidebar-footer-content";
import { SidebarHeaderContent } from "./sidebar-header-content";
import { SidebarMainContent } from "./sidebar-main-content";

export async function AppSidebar() {
  const { queryClient, dehydratedState } = await prefetchQuery(
    [QUERY_KEY.SESSION],
    getSession,
  );

  const sessionData = queryClient.getQueryData([QUERY_KEY.SESSION]) as
    | IApiResponse<ISessionResponse>
    | undefined;

  if (!sessionData?.success) {
    return (
      <div className="flex flex-col items-center w-(--sidebar-width) justify-center bg-sidebar">
        <TypographySmall className="text-destructive">
          {sessionData?.message ?? "Unable to load user session. Reload page"}
        </TypographySmall>
      </div>
    );
  }

  const { user } = sessionData.data;
  const navSections = getNavSectionsByRole(user);
  const dashboardPath = routeRulesUtil.getDefaultDashboardRoute(user);

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <HydrationBoundary state={dehydratedState}>
        <SidebarHeaderContent dashboardPath={dashboardPath} />
        <SidebarMainContent navSections={navSections} />
        <SidebarFooterContent />
      </HydrationBoundary>
    </Sidebar>
  );
}
