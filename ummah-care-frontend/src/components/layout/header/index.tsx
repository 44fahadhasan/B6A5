import { getSession } from "@/actions/auth-actions";
import { MobileNav } from "@/components/layout/header/mobile-nav";
import { Logo } from "@/components/layout/logo";
import { routeRulesUtil } from "@/utils/route-rules-util";
import AnimatedHeader from "./animated-header";
import DesktopNav from "./desktop-nav";

export default async function Header() {
  const { data } = await getSession();

  const user = data?.user;

  const dashboardPath = user
    ? routeRulesUtil.getDefaultDashboardRoute(user)
    : "/sign-in";

  return (
    <AnimatedHeader>
      <Logo />
      <DesktopNav dashboardPath={dashboardPath} />
      <MobileNav dashboardPath={dashboardPath} />
    </AnimatedHeader>
  );
}
