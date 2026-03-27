import { getSession } from "@/actions/auth-actions";
import { MobileNav } from "@/components/layout/header/mobile-nav";
import { Logo } from "@/components/layout/logo";
import { IApiResponse, ISessionResponse } from "@/types";
import { routeRulesUtil } from "@/utils/route-rules-util";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AnimatedHeader from "./animated-header";
import DesktopNav from "./desktop-nav";

export default async function Header() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const res = queryClient.getQueryData([
    "session",
  ]) as IApiResponse<ISessionResponse>;

  const user = res?.data?.user;

  const dashboardPath = user
    ? routeRulesUtil.getDefaultDashboardRoute(user)
    : "/sign-in";

  return (
    <AnimatedHeader>
      <Logo />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DesktopNav dashboardPath={dashboardPath} />
        <MobileNav dashboardPath={dashboardPath} />
      </HydrationBoundary>
    </AnimatedHeader>
  );
}
