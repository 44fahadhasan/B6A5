"use client";

import { getSession, singOutUser } from "@/actions/auth-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDownIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function getInitials(name: string) {
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function SidebarFooterContent({
  ...props
}: React.ComponentProps<typeof SidebarFooter>) {
  const router = useRouter();
  const { isMobile } = useSidebar();

  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  if (!data?.data?.user) return;
  const user = data.data.user;

  const handleSingOut = async () => {
    try {
      const { message, success } = await singOutUser();

      if (!success) {
        toast.error(message ?? "Sing out failed. Please try again.");
        return;
      }

      toast.success(message ?? "Sing out successfully!");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  return (
    <SidebarFooter {...props}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar size="default" className="rounded-lg">
                  <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar size="default" className="rounded-lg">
                    <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSingOut}>
                <LogOutIcon />
                Sing Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
