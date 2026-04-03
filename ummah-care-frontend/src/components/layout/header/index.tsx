import { getSession } from "@/actions/auth-actions";
import { MobileNav } from "@/components/layout/header/mobile-nav";
import { Logo } from "@/components/layout/logo";
import { QUERY_KEY } from "@/constants/query.const";
import { IApiResponse, ISessionResponse } from "@/types";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AnimatedHeader from "./animated-header";
import DesktopNav from "./desktop-nav";

export default async function Header() {
  const { queryClient, dehydratedState } = await prefetchQuery(
    [QUERY_KEY.SESSION],
    getSession,
  );

  const sessionData = queryClient.getQueryData<IApiResponse<ISessionResponse>>([
    QUERY_KEY.SESSION,
  ]);

  const user = sessionData?.data?.user;

  const dashboardPath = user
    ? routeRulesUtil.getDefaultDashboardRoute(user)
    : "/sign-in";

  return (
    <AnimatedHeader>
      <Logo />
      <HydrationBoundary state={dehydratedState}>
        <DesktopNav dashboardPath={dashboardPath} />
        <MobileNav dashboardPath={dashboardPath} />
      </HydrationBoundary>
    </AnimatedHeader>
  );
}
