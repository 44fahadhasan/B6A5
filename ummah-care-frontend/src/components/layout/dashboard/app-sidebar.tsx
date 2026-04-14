import { getSession } from "@/actions/auth-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/ui/sidebar";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { getNavSectionsByRole } from "@/utils/sidebar-nav.util";
import { SidebarFooterContent } from "./sidebar-footer-content";
import { SidebarHeaderContent } from "./sidebar-header-content";
import { SidebarMainContent } from "./sidebar-main-content";

export async function AppSidebar() {
  const { success, data, message } = await getSession();

  if (!success || !data) {
    throw new Error(message);
  }

  const user = data.user;
  const navSections = getNavSectionsByRole(user);
  const dashboardPath = routeRulesUtil.getDefaultDashboardRoute(user);

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <SidebarHeaderContent dashboardPath={dashboardPath} />
      <ScrollArea className="flex-1 min-h-0">
        <SidebarMainContent navSections={navSections} />
      </ScrollArea>
      <SidebarFooterContent />
    </Sidebar>
  );
}
