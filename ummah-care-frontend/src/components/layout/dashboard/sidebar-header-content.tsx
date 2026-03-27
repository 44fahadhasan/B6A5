import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { env } from "../../../../env";

interface SidebarHeaderContentProps extends React.ComponentProps<
  typeof SidebarHeader
> {
  dashboardPath: string;
}

export async function SidebarHeaderContent({
  dashboardPath,
  ...props
}: SidebarHeaderContentProps) {
  return (
    <SidebarHeader {...props}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href={dashboardPath}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LayoutDashboard />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {env.NEXT_PUBLIC_APP_NAME}
                </span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
