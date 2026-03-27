"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { INavSection } from "@/types";
import { getIconCom } from "@/utils/icon-mapper";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMainContentProps extends React.ComponentProps<
  typeof SidebarContent
> {
  navSections: INavSection[];
}

export function SidebarMainContent({
  navSections,
  ...props
}: SidebarMainContentProps) {
  const pathname = usePathname();

  return (
    <SidebarContent {...props}>
      {navSections.map((section, idx) => (
        <SidebarGroup key={idx}>
          {section.title && (
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          )}

          <SidebarMenu>
            {section.items.map((item, itemIdx) => {
              const Icon = getIconCom(item.icon);

              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <SidebarMenuItem key={itemIdx}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.href ?? ""}
                      className={clsx(
                        "flex items-center gap-2 px-2 py-1 rounded-md transition-colors",
                        isActive &&
                          "bg-sidebar-accent text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
