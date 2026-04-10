export const dynamic = "force-dynamic";

import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import { SiteHeader } from "@/components/layout/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1 p-4">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
